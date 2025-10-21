"use client";

import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDistanceToNow } from "date-fns";
import type { HistoryItem } from "@/lib/types";
import { FileClock } from "lucide-react";

type HistoryPanelProps = {
  history: HistoryItem[];
};

export default function HistoryPanel({ history }: HistoryPanelProps) {
  return (
    <ScrollArea className="h-full">
        {history.length > 0 ? (
          <div className="p-4">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-5 top-0 h-full w-0.5 bg-border -z-10"></div>
              {history.map((item) => (
                <div key={item.id} className="relative flex items-start gap-4 mb-6">
                  {/* Timeline dot */}
                  <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-secondary ring-8 ring-card">
                    <div className="h-3 w-3 rounded-full bg-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{item.action}</p>
                    <time className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(item.timestamp), {
                        addSuffix: true,
                      })}
                    </time>
                    <div className="mt-2 relative w-full aspect-video rounded-md overflow-hidden border">
                       <Image
                          src={item.thumbnail}
                          alt={`History thumbnail for ${item.action}`}
                          fill
                          className="object-cover"
                        />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex h-[calc(100vh-5rem)] flex-col items-center justify-center text-center p-8">
            <div className="p-4 rounded-full bg-secondary mb-4">
                <FileClock className="w-12 h-12 text-muted-foreground" />
            </div>
            <p className="font-semibold">Chưa có lịch sử</p>
            <p className="text-sm text-muted-foreground">
              Các chỉnh sửa của bạn sẽ xuất hiện ở đây.
            </p>
          </div>
        )}
      </ScrollArea>
  );
}
