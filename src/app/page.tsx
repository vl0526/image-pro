"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { HelpCircle, History, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Logo } from "@/components/icons/logo";
import { UploadArea } from "@/components/upload-area";
import EditorLayout from "@/components/editor/editor-layout";
import HistoryPanel from "@/components/history/history-panel";
import type { Box, HistoryItem, AppStatus } from "@/lib/types";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { detectText, eraseText } from "@/ai/flows/image-utils-flow";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [status, setStatus] = useState<AppStatus>("idle");
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [boxes, setBoxes] = useState<Box[]>([]);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [selectedBoxIds, setSelectedBoxIds] = useState<string[]>([]);
  const { toast } = useToast();


  const uploadExample = useMemo(
    () => PlaceHolderImages.find((img) => img.id === "upload-example"),
    []
  );
  
  const handleUpload = async (file: File) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const result = e.target?.result as string;
      setOriginalImage(result);
      setStatus("detecting");

      try {
        const detectedBoxes = await detectText({
          imageDataUri: result,
        });

        // Get image dimensions to convert relative coords to absolute
        const img = document.createElement('img');
        img.src = result;
        await new Promise(resolve => { img.onload = resolve; });

        setBoxes(
          detectedBoxes.map((box, i) => ({
            id: `box-${i}`,
            x: box.x * img.width,
            y: box.y * img.height,
            width: box.width * img.width,
            height: box.height * img.height,
            type: "auto",
          }))
        );
        setStatus("editing");
      } catch (error) {
        console.error("Text detection failed:", error);
        toast({
          variant: "destructive",
          title: "Text Detection Failed",
          description: "Could not detect text in the image. Please try another one.",
        });
        setStatus("idle");
      }
    };
    reader.readAsDataURL(file);
  };

  const handleProcess = async () => {
    if (!originalImage) return;

    setStatus("processing");
    try {
      const result = await eraseText({
        imageDataUri: originalImage,
        boxes,
      });
      setProcessedImage(result.processedImageUri);

      const newHistoryItem: HistoryItem = {
        id: `hist-${history.length + 1}`,
        timestamp: new Date().toISOString(),
        action: "Text Removed & Anime Enhanced",
        thumbnail: result.processedImageUri,
      };
      setHistory((prev) => [newHistoryItem, ...prev]);
      setStatus("comparing");

    } catch (error) {
      console.error("Image processing failed:", error);
      toast({
        variant: "destructive",
        title: "Processing Failed",
        description: "Could not remove text from the image. Please try again.",
      });
      setStatus("editing");
    }
  };


  const handleReset = () => {
    setOriginalImage(null);
    setProcessedImage(null);
    setBoxes([]);
    // Keep history for now, but you could clear it.
    // setHistory([]);
    setSelectedBoxIds([]);
    setStatus("idle");
  };

  const Header = () => (
    <header className="flex h-16 items-center justify-between border-b border-white/10 bg-background/80 px-4 backdrop-blur-sm sm:px-6 lg:px-8">
      <div className="flex items-center gap-4">
        <Logo className="h-8 w-8 text-primary" />
        <h1 className="font-headline text-xl font-bold text-white">
          Manga Text Eraser
        </h1>
      </div>
      <div className="flex items-center gap-2">
        <TooltipProvider>
          <Sheet>
            <Tooltip>
              <TooltipTrigger asChild>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <History className="h-5 w-5" />
                    <span className="sr-only">Lịch sử chỉnh sửa</span>
                  </Button>
                </SheetTrigger>
              </TooltipTrigger>
              <TooltipContent>
                <p>Lịch sử chỉnh sửa</p>
              </TooltipContent>
            </Tooltip>
            <SheetContent side="left" className="w-[350px] bg-card p-0">
              <HistoryPanel history={history} />
            </SheetContent>
          </Sheet>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <HelpCircle className="h-5 w-5" />
                <span className="sr-only">Help</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Help</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <UserCircle className="h-5 w-5" />
                <span className="sr-only">Tài khoản</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Tài khoản</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </header>
  );

  const Footer = () => (
    <footer className="flex h-10 items-center justify-center border-t border-white/10 px-4 text-center">
      <p className="text-xs text-muted-foreground">
        AI-powered manga text removal.
      </p>
    </footer>
  );

  return (
    <div className="flex min-h-screen flex-col bg-background font-body text-foreground">
      <Header />
      <main className="flex-1">
        {status === "idle" ? (
          <div className="container mx-auto max-w-4xl py-12">
            <div className="text-center mb-12">
              <h2 className="font-headline text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white to-neutral-400">
                Remove Text from Images
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                xóa nó
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
              <div className="md:col-span-3">
                <UploadArea onUpload={handleUpload} />
              </div>
              <div className="md:col-span-2 relative h-full w-full min-h-[300px] rounded-lg overflow-hidden border border-dashed border-border">
                {uploadExample && (
                   <Image
                      src={uploadExample.imageUrl}
                      alt={uploadExample.description}
                      fill
                      data-ai-hint={uploadExample.imageHint}
                      className="object-cover"
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                 <div className="absolute bottom-4 left-4">
                    <p className="text-sm font-semibold text-white">Example Image</p>
                    <p className="text-xs text-white/70">Manga page with text</p>
                 </div>
              </div>
            </div>
          </div>
        ) : (
          <EditorLayout
            status={status}
            originalImage={originalImage}
            processedImage={processedImage}
            boxes={boxes}
            setBoxes={setBoxes}
            selectedBoxIds={selectedBoxIds}
            setSelectedBoxIds={setSelectedBoxIds}
            onProcess={handleProcess}
            onReset={handleReset}
          />
        )}
      </main>
      <Footer />
    </div>
  );
}
