'use server';
/**
 * @fileoverview A Genkit flow for detecting and removing text from images.
 * This file exports `detectText` and `eraseText` functions.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import {Box} from '@/lib/types';

// Schema for text detection
const DetectTextRequestSchema = z.object({
  imageDataUri: z.string().describe("A photo of a manga page, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."),
});
const DetectTextResponseSchema = z.array(
    z.object({
        x: z.number().describe('The x-coordinate of the top-left corner of the box (from 0 to 1).'),
        y: z.number().describe('The y-coordinate of the top-left corner of the box (from 0 to 1).'),
        width: z.number().describe('The width of the box (from 0 to 1).'),
        height: z.number().describe('The height of the box (from 0 to 1).'),
    })
);

export async function detectText(input: z.infer<typeof DetectTextRequestSchema>): Promise<z.infer<typeof DetectTextResponseSchema>> {
    return await detectTextFlow(input);
}

const detectTextPrompt = ai.definePrompt({
    name: 'detectTextPrompt',
    input: { schema: DetectTextRequestSchema },
    output: { schema: DetectTextResponseSchema },
    prompt: `You are a text detection expert for manga. Your task is to identify all text boxes in the provided image.
Return an array of bounding boxes for each piece of text you find. The coordinates must be relative to the image dimensions (0 to 1).

Image:
{{media url=imageDataUri}}
`,
});

const detectTextFlow = ai.defineFlow(
    {
        name: 'detectTextFlow',
        inputSchema: DetectTextRequestSchema,
        outputSchema: DetectTextResponseSchema,
    },
    async (input) => {
        const { output } = await detectTextPrompt(input);
        return output ?? [];
    }
);


// Schema for text erasing
const EraseTextRequestSchema = z.object({
  imageDataUri: z.string().describe("The source image as a data URI."),
  boxes: z.array(
    z.object({
      id: z.string(),
      x: z.number(),
      y: z.number(),
      width: z.number(),
      height: z.number(),
      type: z.enum(['auto', 'manual']),
    })
  ).describe('An array of bounding boxes where text should be removed.'),
});

const EraseTextResponseSchema = z.object({
  processedImageUri: z.string().describe('The processed image with text removed, as a data URI.'),
});

export async function eraseText(input: z.infer<typeof EraseTextRequestSchema>): Promise<z.infer<typeof EraseTextResponseSchema>> {
  return await eraseTextFlow(input);
}


const eraseTextFlow = ai.defineFlow(
  {
    name: 'eraseTextFlow',
    inputSchema: EraseTextRequestSchema,
    outputSchema: EraseTextResponseSchema,
  },
  async ({ imageDataUri, boxes }) => {
    
    // Create a text representation of the boxes to include in the prompt
    const boxesString = boxes.map(b => `  - x: ${Math.round(b.x)}, y: ${Math.round(b.y)}, width: ${Math.round(b.width)}, height: ${Math.round(b.height)}`).join('\n');

    const result = await ai.generate({
      model: 'googleai/gemini-2.5-flash-image-preview',
      prompt: [
        {
          text: `You are an expert image editor specializing in manga.
Your task is to remove the text from the specified bounding boxes in the provided image.
Inpaint the areas to seamlessly match the surrounding artwork and style.
The final image should look natural as if there was never any text there.
Do not add any new elements, watermarks, or text. Just remove the existing text.

Bounding boxes to erase (in pixels):
${boxesString}
`,
        },
        { media: { url: imageDataUri } },
      ],
      config: {
        responseModalities: ['IMAGE'],
      },
    });

    const outputImage = result.output?.media;
    if (!outputImage) {
      throw new Error('Image generation failed to produce an output.');
    }

    return { processedImageUri: outputImage.url };
  }
);
