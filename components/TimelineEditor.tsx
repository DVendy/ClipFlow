"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { HugeiconsIcon } from "@hugeicons/react";
import { Add01Icon, Delete02Icon, Time01Icon } from "@hugeicons/core-free-icons";

export type Segment = {
  id: string;
  start: string;
  end: string;
  filename?: string;
};

interface TimelineEditorProps {
  segments: Segment[];
  onAddSegment: () => void;
  onRemoveSegment: (id: string) => void;
  onUpdateSegment: (id: string, field: keyof Segment, value: string) => void;
}

export default function TimelineEditor({
  segments,
  onAddSegment,
  onRemoveSegment,
  onUpdateSegment,
}: TimelineEditorProps) {
  const timeRegex = /^[0-9]{2}:[0-9]{2}:[0-9]{2}$/;

  return (
    <Card className="w-full border-zinc-200/50 shadow-lg shadow-black/5 overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 bg-zinc-50/50 dark:bg-zinc-900/50 border-b border-zinc-100 dark:border-zinc-800">
        <CardTitle className="text-xl font-black flex items-center gap-2 text-zinc-900 dark:text-white">
          <HugeiconsIcon icon={Time01Icon} className="size-6 text-primary" />
          Timeline Segments
        </CardTitle>
        <Button 
          onClick={onAddSegment} 
          size="sm" 
          className="gap-2 font-bold rounded-full px-4"
        >
          <HugeiconsIcon icon={Add01Icon} className="size-4" />
          Add Segment
        </Button>
      </CardHeader>
      <CardContent className="flex flex-col gap-6 p-6">
        {segments.length === 0 ? (
          <div className="text-center py-12 text-zinc-500 bg-zinc-50/50 dark:bg-zinc-900/50 rounded-2xl border-2 border-dashed border-zinc-200 dark:border-zinc-800">
            <HugeiconsIcon icon={Time01Icon} className="size-12 mx-auto mb-3 opacity-20" />
            <p className="font-medium">No segments added yet</p>
            <p className="text-sm opacity-60">Click "Add Segment" to start clipping</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {segments.map((segment, index) => {
              const isStartValid = timeRegex.test(segment.start);
              const isEndValid = timeRegex.test(segment.end);

              return (
                <div
                  key={segment.id}
                  className="flex flex-col gap-4 p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 relative group shadow-sm hover:shadow-md transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-black uppercase tracking-[0.2em] text-primary/40">
                      Segment #{index + 1}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8 text-zinc-400 hover:text-red-500 transition-colors rounded-full"
                      onClick={() => onRemoveSegment(segment.id)}
                    >
                      <HugeiconsIcon icon={Delete02Icon} className="size-4" />
                    </Button>
                  </div>
                  
                  <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <Label htmlFor={`start-${segment.id}`} className="text-sm font-bold uppercase tracking-wider text-zinc-400">
                          Start Time
                        </Label>
                        <div className="relative">
                          <Input
                            id={`start-${segment.id}`}
                            placeholder="00:00:00"
                            value={segment.start}
                            onChange={(e) =>
                              onUpdateSegment(segment.id, "start", e.target.value)
                            }
                            className={`bg-zinc-50 dark:bg-zinc-950 border-none h-11 font-mono text-center text-lg rounded-xl focus-visible:ring-primary/20 ${!isStartValid && segment.start !== '' ? 'ring-2 ring-red-500/20 text-red-500' : ''}`}
                          />
                          {!isStartValid && segment.start !== '' && (
                            <span className="absolute -bottom-5 left-0 text-sm text-red-500 font-medium">Use HH:MM:SS</span>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <Label htmlFor={`end-${segment.id}`} className="text-sm font-bold uppercase tracking-wider text-zinc-400">
                          End Time
                        </Label>
                        <div className="relative">
                          <Input
                            id={`end-${segment.id}`}
                            placeholder="00:00:10"
                            value={segment.end}
                            onChange={(e) =>
                              onUpdateSegment(segment.id, "end", e.target.value)
                            }
                            className={`bg-zinc-50 dark:bg-zinc-950 border-none h-11 font-mono text-center text-lg rounded-xl focus-visible:ring-primary/20 ${!isEndValid && segment.end !== '' ? 'ring-2 ring-red-500/20 text-red-500' : ''}`}
                          />
                          {!isEndValid && segment.end !== '' && (
                            <span className="absolute -bottom-5 left-0 text-sm text-red-500 font-medium">Use HH:MM:SS</span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor={`filename-${segment.id}`} className="text-sm font-bold uppercase tracking-wider text-zinc-400">
                        Custom Filename (Optional)
                      </Label>
                      <Input
                        id={`filename-${segment.id}`}
                        placeholder={`clip-${index + 1}`}
                        value={segment.filename || ""}
                        onChange={(e) =>
                          onUpdateSegment(segment.id, "filename", e.target.value)
                        }
                        className="bg-zinc-50 dark:bg-zinc-950 border-none h-11 rounded-xl focus-visible:ring-primary/20"
                      />
                    </div>
                  </div>
                  <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary/20 rounded-full group-hover:h-12 transition-all" />
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
