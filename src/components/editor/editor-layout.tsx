"use client";

import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { PanelRightOpen } from "lucide-react";
import ActionBar from "./action-bar";
import CanvasArea from "./canvas-area";
import InspectorPanel from "./inspector-panel";
import type { AppStatus, Box } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

type EditorLayoutProps = {
  status: AppStatus;
  originalImage: string | null;
  processedImage: string | null;
  boxes: Box[];
  setBoxes: React.Dispatch<React.SetStateAction<Box[]>>;
  selectedBoxIds: string[];
  setSelectedBoxIds: React.Dispatch<React.SetStateAction<string[]>>;
  onProcess: () => void;
  onReset: () => void;
};

export default function EditorLayout({
  status,
  originalImage,
  processedImage,
  boxes,
  setBoxes,
  selectedBoxIds,
  setSelectedBoxIds,
  onProcess,
  onReset,
}: EditorLayoutProps) {
  const [comparisonMode, setComparisonMode] = useState<"side-by-side" | "slider" | null>(null);
  const { toast } = useToast();

  const handleDownload = () => {
    const imageToDownload = processedImage || originalImage;
    if (imageToDownload) {
        const link = document.createElement('a');
        link.href = imageToDownload;
        link.download = 'remove-pro-result.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast({
          title: "Download Started",
          description: "Your image is being downloaded.",
        });
    } else {
       toast({
          variant: "destructive",
          title: "Download Failed",
          description: "There is no image to download.",
        });
    }
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] w-full flex-col">
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_350px] gap-4 p-4 md:p-6 lg:p-8 overflow-hidden">
        <div className="relative flex flex-col gap-4 h-full min-h-0">
          <div className="relative flex-1 rounded-xl border-2 border-dashed border-border bg-card/50 overflow-hidden">
            <CanvasArea
              status={status}
              originalImage={originalImage}
              processedImage={processedImage}
              boxes={boxes}
              selectedBoxIds={selectedBoxIds}
              setSelectedBoxIds={setSelectedBoxIds}
              comparisonMode={comparisonMode}
            />
          </div>
        </div>

        <div className="hidden lg:flex flex-col h-full">
          <InspectorPanel
            boxes={boxes}
            setBoxes={setBoxes}
            selectedBoxIds={selectedBoxIds}
            setSelectedBoxIds={setSelectedBoxIds}
          />
        </div>
      </div>

      <div className="border-t px-4 md:px-6 lg:px-8 py-2">
         <ActionBar
          status={status}
          onProcess={onProcess}
          onReset={onReset}
          onDownload={handleDownload}
          comparisonMode={comparisonMode}
          setComparisonMode={setComparisonMode}
          canProcess={boxes.length > 0 && status === 'editing'}
        />
      </div>
      
      <div className="absolute top-20 right-4 lg:hidden">
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                    <PanelRightOpen />
                    <span className="sr-only">Open Inspector</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[350px] bg-card p-0">
                <SheetHeader className="p-4 border-b">
                  <SheetTitle>Inspector</SheetTitle>
                </SheetHeader>
                <InspectorPanel
                  boxes={boxes}
                  setBoxes={setBoxes}
                  selectedBoxIds={selectedBoxIds}
                  setSelectedBoxIds={setSelectedBoxIds}
                />
            </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
