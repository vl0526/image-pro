"use client";

import Image from "next/image";
import type { AppStatus, Box } from "@/lib/types";
import ComparisonView from "./comparison-view";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type CanvasAreaProps = {
  status: AppStatus;
  originalImage: string | null;
  processedImage: string | null;
  boxes: Box[];
  selectedBoxIds: string[];
  setSelectedBoxIds: (ids: string[]) => void;
  comparisonMode: "side-by-side" | "slider" | null;
};

export default function CanvasArea({
  status,
  originalImage,
  processedImage,
  boxes,
  selectedBoxIds,
  setSelectedBoxIds,
  comparisonMode,
}: CanvasAreaProps) {
  
  if (comparisonMode && originalImage && processedImage) {
    return (
      <ComparisonView
        originalSrc={originalImage}
        processedSrc={processedImage}
        mode={comparisonMode}
      />
    );
  }

  const handleBoxClick = (e: React.MouseEvent, boxId: string) => {
    e.stopPropagation(); // prevent image click
    const isSelected = selectedBoxIds.includes(boxId);
    if (e.shiftKey) {
      setSelectedBoxIds(
        isSelected
          ? selectedBoxIds.filter((id) => id !== boxId)
          : [...selectedBoxIds, boxId]
      );
    } else {
      setSelectedBoxIds(isSelected && selectedBoxIds.length === 1 ? [] : [boxId]);
    }
  };

  const handleCanvasClick = () => {
    setSelectedBoxIds([]);
  }

  const imageToRender = status === 'comparing' && processedImage && !comparisonMode 
    ? processedImage 
    : originalImage;

  return (
    <div 
      className="w-full h-full flex items-center justify-center relative cursor-crosshair"
      onClick={handleCanvasClick}
    >
      {imageToRender && (
        <Image
          src={imageToRender}
          alt={status === 'comparing' ? "Processed content" : "Original content"}
          fill
          className="object-contain pointer-events-none"
        />
      )}

      {status === 'editing' && boxes.map((box) => (
        <div
          key={box.id}
          className={cn(
            "absolute border-2 cursor-pointer hover:bg-primary/30",
            selectedBoxIds.includes(box.id)
              ? "border-primary bg-primary/20"
              : "border-primary/50"
          )}
          style={{
            left: `${box.x}px`,
            top: `${box.y}px`,
            width: `${box.width}px`,
            height: `${box.height}px`,
          }}
          onClick={(e) => handleBoxClick(e, box.id)}
        >
          {selectedBoxIds.includes(box.id) && (
            <>
              <div className="absolute -top-1 -left-1 w-2 h-2 rounded-full bg-white border-2 border-primary cursor-nwse-resize" />
              <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-white border-2 border-primary cursor-nesw-resize" />
              <div className="absolute -bottom-1 -left-1 w-2 h-2 rounded-full bg-white border-2 border-primary cursor-nesw-resize" />
              <div className="absolute -bottom-1 -right-1 w-2 h-2 rounded-full bg-white border-2 border-primary cursor-nwse-resize" />
            </>
          )}
        </div>
      ))}
      
      {status === "processing" && (
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-4 transition-opacity duration-300">
           <Loader2 className="w-12 h-12 animate-spin text-primary" />
           <p className="text-lg font-medium text-white">Processing image...</p>
        </div>
      )}
    </div>
  );
}
