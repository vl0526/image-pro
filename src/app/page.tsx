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

export default function Home() {
  const [status, setStatus] = useState<AppStatus>("idle");
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [boxes, setBoxes] = useState<Box[]>([]);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [selectedBoxIds, setSelectedBoxIds] = useState<string[]>([]);

  const uploadExample = useMemo(
    () => PlaceHolderImages.find((img) => img.id === "upload-example"),
    []
  );
  const processedExample = useMemo(
    () => PlaceHolderImages.find((img) => img.id === "processed-example"),
    []
  );

  const handleUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setOriginalImage(result);
      setStatus("detecting");

      setTimeout(() => {
        // Simulate AI detection
        setBoxes([
          { id: "box-1", x: 100, y: 150, width: 200, height: 50, type: "auto" },
          { id: "box-2", x: 320, y: 250, width: 150, height: 80, type: "auto" },
          { id: "box-3", x: 50, y: 400, width: 400, height: 60, type: "auto" },
        ]);
        setStatus("editing");
      }, 2000);
    };
    reader.readAsDataURL(file);
  };

  const handleProcess = () => {
    setStatus("processing");
    // Simulate API call and enhancement
    setTimeout(() => {
      if (processedExample) {
        setProcessedImage(processedExample.imageUrl);
      }
      const newHistoryItem: HistoryItem = {
        id: `hist-${history.length + 1}`,
        timestamp: new Date().toISOString(),
        action: "Text Removed & Anime Enhanced",
        thumbnail:
          PlaceHolderImages.find((img) => img.id === "history-thumb-1")
            ?.imageUrl || "",
      };
      setHistory((prev) => [...prev, newHistoryItem]);
      setStatus("comparing");
    }, 4000);
  };

  const handleReset = () => {
    setOriginalImage(null);
    setProcessedImage(null);
    setBoxes([]);
    setHistory([]);
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
        CHÚ Ý: Giao diện này là mô phỏng thiết kế. Không triển khai backend hoặc
        tích hợp thực tế trong file thiết kế.
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
                Instantly clean up your manga pages and illustrations with AI.
                Upload an image to get started.
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
