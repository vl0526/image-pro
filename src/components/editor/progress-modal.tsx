"use client";

import { useEffect, useState } from "react";
import { Loader2, CheckCircle, CircleDashed } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import type { AppStatus } from "@/lib/types";

type ProgressModalProps = {
  status: AppStatus;
};

const steps = [
  "Detection",
  "Inpainting",
  "Upscale",
  "Anime Transform",
];

export default function ProgressModal({ status }: ProgressModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const isOpen = status === "processing";

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0);
      const timers = steps.map((_, index) =>
        setTimeout(() => {
          setCurrentStep(index + 1);
        }, (index + 1) * 1000)
      );
      return () => timers.forEach(clearTimeout);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-[425px]" hideCloseButton>
        <DialogHeader>
          <DialogTitle className="text-center font-headline text-2xl">
            Enhancing Your Image
          </DialogTitle>
          <DialogDescription className="text-center">
            Please wait while our AI works its magic. This may take a moment.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex justify-center">
            <Loader2 className="h-16 w-16 animate-spin text-primary" />
          </div>
          <div className="space-y-2">
            {steps.map((step, index) => (
              <div key={step} className="flex items-center gap-3">
                {index < currentStep ? (
                  <CheckCircle className="h-5 w-5 text-primary" />
                ) : index === currentStep ? (
                  <Loader2 className="h-5 w-5 animate-spin text-accent" />
                ) : (
                  <CircleDashed className="h-5 w-5 text-muted-foreground" />
                )}
                <span
                  className={
                    index < currentStep
                      ? "text-primary"
                      : index === currentStep
                      ? "text-accent"
                      : "text-muted-foreground"
                  }
                >
                  {step}
                </span>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
