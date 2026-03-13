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
};

interface TimelineEditorProps {
  segments: Segment[];
  onAddSegment: () => void;
  onRemoveSegment: (id: string) => void;
  onUpdateSegment: (id: string, field: "start" | "end", value: string) => void;
}

export default function TimelineEditor({
  segments,
  onAddSegment,
  onRemoveSegment,
  onUpdateSegment,
}: TimelineEditorProps) {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <HugeiconsIcon icon={Time01Icon} className="size-6" />
          Timeline Segments
        </CardTitle>
        <Button onClick={onAddSegment} size="sm" className="gap-2">
          <HugeiconsIcon icon={Add01Icon} className="size-4" />
          Add Segment
        </Button>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        {segments.length === 0 ? (
          <div className="text-center py-8 text-zinc-500 bg-zinc-50 rounded-lg border border-dashed border-zinc-200">
            No segments added. Click "Add Segment" to start.
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {segments.map((segment, index) => (
              <div
                key={segment.id}
                className="flex items-end gap-4 p-4 rounded-lg bg-zinc-50 border border-zinc-100 relative group"
              >
                <div className="flex-1 grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor={`start-${segment.id}`} className="text-xs uppercase tracking-wider text-zinc-500">
                      Start Time
                    </Label>
                    <Input
                      id={`start-${segment.id}`}
                      placeholder="00:00:00"
                      value={segment.start}
                      onChange={(e) =>
                        onUpdateSegment(segment.id, "start", e.target.value)
                      }
                      className="bg-white"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor={`end-${segment.id}`} className="text-xs uppercase tracking-wider text-zinc-500">
                      End Time
                    </Label>
                    <Input
                      id={`end-${segment.id}`}
                      placeholder="00:00:10"
                      value={segment.end}
                      onChange={(e) =>
                        onUpdateSegment(segment.id, "end", e.target.value)
                      }
                      className="bg-white"
                    />
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-zinc-400 hover:text-red-500 transition-colors"
                  onClick={() => onRemoveSegment(segment.id)}
                >
                  <HugeiconsIcon icon={Delete02Icon} className="size-5" />
                </Button>
                <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-zinc-300 rounded-full group-hover:bg-zinc-400 transition-colors" />
                <span className="absolute -left-8 top-1/2 -translate-y-1/2 text-[10px] font-bold text-zinc-300">
                  #{index + 1}
                </span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
