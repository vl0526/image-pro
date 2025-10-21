# **App Name**: Manga Text Eraser

## Core Features:

- Image Upload: Allows users to upload images from their device using drag & drop or file selection.
- AI-Powered Text Detection: Automatically detects text regions within the uploaded image and highlights them with selection boxes.
- Manual Box Editor: Provides tools for users to manually adjust text selection boxes, including adding, deleting, moving, resizing, and multi-selecting boxes.
- Text Removal via API: Sends the image and selected text regions to the NanoBanana API to remove the text from the image. During text removal, the system provides textual progress to the user.
- Automatic Anime Enhancement: After removing text, the image is automatically enhanced and transformed into an optimized anime style.
- Before/After Comparison: Displays a side-by-side and slider comparison of the original and modified images.
- Edit History: Saves and displays a professional edit history for each image, showing previous versions and modifications. Relies on Firestore for storing image edits.

## Style Guidelines:

- Primary color: Emerald (#50C878), providing a sense of digital sophistication and complementing the anime transformation process.
- Background color: Dark charcoal (#333333), creating a modern and luxurious feel.
- Accent color: Gold (#FFD700) for highlights and action buttons, emphasizing premium features.
- Headline font: 'Literata', serif, for headers, conveying elegance and readability. Body font: 'Inter', sans-serif, for body text and UI elements.
- Clean, minimalist icons that support primary actions. The iconography should follow a consistent style, with thin strokes and rounded edges, complementing the app's modern aesthetic. Use clear, intuitive symbols for actions like upload, remove, enhance, compare, and download.
- Modern layout with a focus on negative space, card-based design with subtle shadows, and rounded corners for UI elements. A primary canvas area for image editing, with panels for controls and history.
- Subtle animations (120-200ms, cubic-out easing) for UI transitions, loading states, and interactive feedback to enhance the user experience. This includes smooth transitions for panel reveal/hide, hover effects on interactive elements, and progress indicators.