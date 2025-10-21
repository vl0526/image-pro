"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ChevronsLeftRight } from "lucide-react";

type ComparisonViewProps = {
  originalSrc: string;
  processedSrc: string;
  mode: "side-by-side" | "slider";
};

export default function ComparisonView({
  originalSrc,
  processedSrc,
  mode,
}: ComparisonViewProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPosition(percent);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    e.preventDefault();
  };

  useEffect(() => {
    const handleMouseUp = () => {
      isDragging.current = false;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging.current) {
        handleMove(e.clientX);
      }
    };
    
    const handleTouchMove = (e: TouchEvent) => {
        if (isDragging.current) {
            handleMove(e.touches[0].clientX);
        }
    };
    
    const handleTouchStart = (e: TouchEvent) => {
        if (e.target === containerRef.current || containerRef.current?.contains(e.target as Node)) {
            isDragging.current = true;
        }
    }

    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchend", handleMouseUp);
    window.addEventListener("touchmove", handleTouchMove);
    containerRef.current?.addEventListener("touchstart", handleTouchStart as EventListener);

    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchend", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      containerRef.current?.removeEventListener("touchstart", handleTouchStart as EventListener);
    };
  }, [handleMove]);

  if (mode === "side-by-side") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full h-full p-2">
        <div className="relative rounded-lg overflow-hidden border">
          <Image src={originalSrc} alt="Original" fill className="object-contain" />
           <div className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">Before</div>
        </div>
        <div className="relative rounded-lg overflow-hidden border">
          <Image src={processedSrc} alt="Processed" fill className="object-contain" />
          <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">After</div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden select-none"
      onMouseDown={handleMouseDown}
      onTouchStart={(e) => isDragging.current = true}
    >
      <Image src={originalSrc} alt="Original" fill className="object-contain pointer-events-none" />
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <Image src={processedSrc} alt="Processed" fill className="object-contain pointer-events-none" />
      </div>
      <div
        className="absolute inset-y-0 w-1 bg-accent cursor-ew-resize pointer-events-none"
        style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-accent flex items-center justify-center text-accent-foreground shadow-2xl">
          <ChevronsLeftRight />
        </div>
      </div>
    </div>
  );
}
