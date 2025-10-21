"use client";

import { useState, useRef, useCallback } from "react";
import { UploadCloud } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

type UploadAreaProps = {
  onUpload: (file: File) => void;
};

const SUPPORTED_FORMATS = ["image/jpeg", "image/png", "image/webp"];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export function UploadArea({ onUpload }: UploadAreaProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileValidation = useCallback((file: File) => {
    if (!SUPPORTED_FORMATS.includes(file.type)) {
      toast({
        variant: "destructive",
        title: "Unsupported File Format",
        description: "Please upload a JPEG, PNG, or WebP image.",
      });
      return false;
    }
    if (file.size > MAX_FILE_SIZE) {
      toast({
        variant: "destructive",
        title: "File Too Large",
        description: "Please upload an image smaller than 10MB.",
      });
      return false;
    }
    return true;
  }, [toast]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && handleFileValidation(file)) {
      onUpload(file);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && handleFileValidation(file)) {
      onUpload(file);
    }
  }, [onUpload, handleFileValidation]);

  const handleDragEvents = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  };

  return (
    <div
      className={cn(
        "relative flex w-full flex-col items-center justify-center rounded-xl border-2 border-dashed p-12 text-center transition-all duration-300",
        isDragging
          ? "border-primary bg-primary/10"
          : "border-border hover:border-primary/50"
      )}
      onDrop={handleDrop}
      onDragEnter={handleDragEvents}
      onDragOver={handleDragEvents}
      onDragLeave={handleDragEvents}
      onClick={() => fileInputRef.current?.click()}
    >
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept={SUPPORTED_FORMATS.join(",")}
        onChange={handleFileChange}
      />
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary mb-4">
        <UploadCloud className="h-8 w-8 text-primary" />
      </div>
      <h3 className="text-xl font-semibold">Kéo ảnh vào đây hoặc chọn tệp</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        Hỗ trợ định dạng: PNG, JPG, WebP. Tối đa 10MB.
      </p>
    </div>
  );
}
