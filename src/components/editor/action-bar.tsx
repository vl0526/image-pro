"use client";

import {
  Undo2,
  Redo2,
  RotateCcw,
  Trash2,
  Download,
  GitCompareArrows,
  SlidersHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { AppStatus } from "@/lib/types";

type ActionBarProps = {
  status: AppStatus;
  onProcess: () => void;
  onReset: () => void;
  onDownload: () => void;
  comparisonMode: "side-by-side" | "slider" | null;
  setComparisonMode: (mode: "side-by-side" | "slider" | null) => void;
};

export default function ActionBar({
  status,
  onProcess,
  onReset,
  onDownload,
  comparisonMode,
  setComparisonMode,
}: ActionBarProps) {
  const isProcessing = status === "detecting" || status === "processing";
  const isComparing = status === "comparing";

  return (
    <div className="flex h-16 items-center justify-between gap-4 rounded-lg border bg-card p-2 shadow-md">
      <TooltipProvider>
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" disabled={isProcessing}>
                <Undo2 className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Undo</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" disabled={isProcessing}>
                <Redo2 className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Redo</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={onReset} disabled={isProcessing}>
                <RotateCcw className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Reset</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="flex-grow flex justify-center">
          <Button
            size="lg"
            className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold"
            onClick={onProcess}
            disabled={isProcessing || isComparing}
          >
            <Trash2 className="mr-2 h-5 w-5" />
            Xóa Văn Bản
          </Button>
        </div>

        <div className="flex items-center gap-2">
          {isComparing && (
            <>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={comparisonMode === 'side-by-side' ? 'secondary' : 'ghost'}
                    size="icon"
                    onClick={() => setComparisonMode(comparisonMode === 'side-by-side' ? null : 'side-by-side')}
                  >
                    <GitCompareArrows className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>So sánh Side-by-Side</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={comparisonMode === 'slider' ? 'secondary' : 'ghost'}
                    size="icon"
                    onClick={() => setComparisonMode(comparisonMode === 'slider' ? null : 'slider')}
                  >
                    <SlidersHorizontal className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>So sánh bằng Slider</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={onDownload}>
                    <Download className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Tải xuống</p>
                </TooltipContent>
              </Tooltip>
            </>
          )}
        </div>
      </TooltipProvider>
    </div>
  );
}
