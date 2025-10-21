"use client";

import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDistanceToNow } from "date-fns";
import type { HistoryItem } from "@/lib/types";

type HistoryPanelProps = {
  history: HistoryItem[];
};

export default function HistoryPanel({ history }: HistoryPanelProps) {
  return (
    <div className="flex h-full flex-col">
      <div className="p-4 border-b">
        <h3 className="font-headline text-lg font-semibold">Lịch sử chỉnh sửa</h3>
        <p className="text-sm text-muted-foreground">Recent project versions</p>
      </div>
      <ScrollArea className="flex-1">
        {history.length > 0 ? (
          <div className="p-4">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-5 top-0 h-full w-0.5 bg-border -z-10"></div>
              {history.slice().reverse().map((item, index) => (
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
          <div className="flex h-full flex-col items-center justify-center text-center p-8">
            <div className="p-4 rounded-full bg-secondary mb-4">
                <Image src="/history-placeholder.svg" width={48} height={48} alt="No history" />
            </div>
            <p className="font-semibold">No History Yet</p>
            <p className="text-sm text-muted-foreground">
              Your edits will appear here.
            </p>
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
