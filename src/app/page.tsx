"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { History, UserCircle, User, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
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
      setProcessedImage(null); // Clear previous processed image
      setBoxes([]); // Clear previous boxes
      setSelectedBoxIds([]);
      setHistory([]);
      setStatus("editing");
    };
    reader.readAsDataURL(file);
  };

  const handleProcess = async () => {
    if (!originalImage) return;

    setStatus("processing");

    // Simulate a non-AI in-painting process
    // This is a placeholder for a client-side canvas operation
    const processPromise = new Promise<string>((resolve) => {
      setTimeout(() => {
        // In a real app, you'd use a canvas to draw the original image,
        // then draw filled rectangles over the box areas.
        // For this demo, we'll just use the original image URL as a stand-in.
        const newImage = originalImage;
        resolve(newImage);
      }, 2500); // Simulate processing time
    });

    toast({
      title: "Processing Image",
      description: "Removing text areas...",
    });

    const newProcessedImage = await processPromise;

    setProcessedImage(newProcessedImage);

    // Add to history
    const newHistoryItem: HistoryItem = {
      id: `hist-${Date.now()}`,
      timestamp: new Date().toISOString(),
      action: `Processed ${boxes.length} boxes`,
      thumbnail: originalImage, // In a real app, you'd generate a smaller thumbnail
    };
    setHistory((prev) => [newHistoryItem, ...prev]);

    setStatus("comparing");

    toast({
      title: "Processing Complete!",
      description: "The selected text areas have been removed.",
    });
  };

  const handleReset = () => {
    setOriginalImage(null);
    setProcessedImage(null);
    setBoxes([]);
    setSelectedBoxIds([]);
    setHistory([]);
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
               <SheetHeader className="sr-only">
                  <SheetTitle>Lịch sử chỉnh sửa</SheetTitle>
              </SheetHeader>
              <HistoryPanel history={history} />
            </SheetContent>
          </Sheet>

          <DropdownMenu>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <UserCircle className="h-5 w-5" />
                    <span className="sr-only">Tài khoản</span>
                  </Button>
                </DropdownMenuTrigger>
              </TooltipTrigger>
              <TooltipContent>
                <p>Tài khoản</p>
              </TooltipContent>
            </Tooltip>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure you want to log out?</AlertDialogTitle>
                    <AlertDialogDescription>
                      You will be returned to the login screen.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => console.log("Logged out")}>Log Out</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuContent>
          </DropdownMenu>
        </TooltipProvider>
      </div>
    </header>
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
    </div>
  );
}
