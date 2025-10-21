"use client";

import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { PanelRightOpen } from "lucide-react";
import ActionBar from "./action-bar";
import CanvasArea from "./canvas-area";
import InspectorPanel from "./inspector-panel";
import ProgressModal from "./progress-modal";
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
    toast({
      title: "Download Started",
      description: "Your enhanced image is being downloaded.",
    });
    // In a real app, this would trigger a file download.
    if (processedImage) {
        const link = document.createElement('a');
        link.href = processedImage;
        link.download = 'manga-text-eraser-result.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
  };

  return (
    <div className="relative flex h-[calc(100vh-8.5rem)] w-full gap-4 p-4 md:p-6 lg:p-8">
      <div className="flex flex-1 flex-col gap-4">
        <div className="relative flex-1 rounded-xl border-2 border-dashed border-border bg-card/50">
          <CanvasArea
            status={status}
            originalImage={originalImage}
            processedImage={processedImage}
            boxes={boxes}
            comparisonMode={comparisonMode}
          />
        </div>
        <ActionBar
          status={status}
          onProcess={onProcess}
          onReset={onReset}
          onDownload={handleDownload}
          comparisonMode={comparisonMode}
          setComparisonMode={setComparisonMode}
        />
      </div>

      <div className="hidden lg:block w-[320px] xl:w-[350px]">
        <InspectorPanel
          boxes={boxes}
          setBoxes={setBoxes}
          selectedBoxIds={selectedBoxIds}
          setSelectedBoxIds={setSelectedBoxIds}
        />
      </div>
      
      <div className="absolute top-6 right-6 lg:hidden">
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                    <PanelRightOpen />
                </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[350px] bg-card p-0">
                <InspectorPanel
                  boxes={boxes}
                  setBoxes={setBoxes}
                  selectedBoxIds={selectedBoxIds}
                  setSelectedBoxIds={setSelectedBoxIds}
                />
            </SheetContent>
        </Sheet>
      </div>

      <ProgressModal status={status} />
    </div>
  );
}
