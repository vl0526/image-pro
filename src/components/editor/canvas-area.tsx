"use client";

import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import type { AppStatus, Box } from "@/lib/types";
import ComparisonView from "./comparison-view";
import { Loader2 } from "lucide-react";

type CanvasAreaProps = {
  status: AppStatus;
  originalImage: string | null;
  processedImage: string | null;
  boxes: Box[];
  comparisonMode: "side-by-side" | "slider" | null;
};

export default function CanvasArea({
  status,
  originalImage,
  processedImage,
  boxes,
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

  return (
    <div className="w-full h-full flex items-center justify-center relative">
      {originalImage && (
        <Image
          src={originalImage}
          alt="Uploaded content"
          fill
          className="object-contain"
        />
      )}

      {status === "detecting" && (
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-4 transition-opacity duration-300">
           <Loader2 className="w-12 h-12 animate-spin text-primary" />
           <p className="text-lg font-medium text-white">Detecting text...</p>
        </div>
      )}

      {status === 'editing' && boxes.map((box) => (
        <div
          key={box.id}
          className="absolute border-2 border-primary bg-primary/20 cursor-move"
          style={{
            left: `${box.x}px`,
            top: `${box.y}px`,
            width: `${box.width}px`,
            height: `${box.height}px`,
          }}
        >
          <div className="absolute -top-1 -left-1 w-2 h-2 rounded-full bg-white border-2 border-primary cursor-nwse-resize" />
          <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-white border-2 border-primary cursor-nesw-resize" />
          <div className="absolute -bottom-1 -left-1 w-2 h-2 rounded-full bg-white border-2 border-primary cursor-nesw-resize" />
          <div className="absolute -bottom-1 -right-1 w-2 h-2 rounded-full bg-white border-2 border-primary cursor-nwse-resize" />
        </div>
      ))}

      {status === 'comparing' && processedImage && !comparisonMode && (
         <Image
          src={processedImage}
          alt="Processed content"
          fill
          className="object-contain"
        />
      )}
    </div>
  );
}
