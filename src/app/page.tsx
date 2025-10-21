"use client";

import { useState } from "react";
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
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [status, setStatus] = useState<AppStatus>("idle");
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [boxes, setBoxes] = useState<Box[]>([]);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [selectedBoxIds, setSelectedBoxIds] = useState<string[]>([]);
  const { toast } = useToast();

  const handleUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setOriginalImage(result);
      setProcessedImage(result); // Show the same image
      setStatus("editing"); // Go directly to editing/viewing
    };
    reader.readAsDataURL(file);
  };

  const handleProcess = async () => {
    // No AI processing, so this button is effectively disabled or does nothing.
    toast({
      title: "No AI Connected",
      description: "The AI processing functionality has been removed.",
    });
  };

  const handleReset = () => {
    setOriginalImage(null);
    setProcessedImage(null);
    setBoxes([]);
    setSelectedBoxIds([]);
    setStatus("idle");
  };

  const Header = () => (
    <header className="flex h-16 items-center justify-between border-b border-white/10 bg-background/80 px-4 backdrop-blur-sm sm:px-6 lg:px-8">
      <div className="flex items-center gap-4">
        <Logo className="h-8 w-8 text-primary" />
        <h1 className="font-headline text-xl font-bold text-white">
          remove pro
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
            </div>
            <div className="flex justify-center">
              <div className="w-full max-w-2xl">
                <UploadArea onUpload={handleUpload} />
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
