"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { Download01Icon, FileBoxIcon } from "@hugeicons/core-free-icons";

export type Clip = {
  url: string;
  name: string;
};

interface ClipListProps {
  clips: Clip[];
}

export default function ClipList({ clips }: ClipListProps) {
  if (clips.length === 0) return null;

  return (
    <Card className="w-full border-zinc-200/50 shadow-lg shadow-black/5 overflow-hidden">
      <CardHeader className="bg-zinc-50/50 dark:bg-zinc-900/50 border-b border-zinc-100 dark:border-zinc-800">
        <CardTitle className="text-xl font-black flex items-center gap-2 text-zinc-900 dark:text-white">
          <HugeiconsIcon icon={FileBoxIcon} className="size-6 text-primary" />
          Generated Clips
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-6 p-6">
        {clips.map((clip, index) => (
          <div
            key={clip.url}
            className="flex flex-col gap-4 p-4 rounded-3xl bg-zinc-50 dark:bg-white/5 border border-zinc-100 dark:border-white/5 shadow-sm group hover:shadow-md transition-all"
          >
            <div className="w-full aspect-video bg-black rounded-2xl overflow-hidden border border-zinc-200/50 dark:border-white/10 shadow-inner">
              <video
                src={clip.url}
                className="w-full h-full object-contain"
                controls
              />
            </div>
            <div className="flex items-center justify-between gap-4 px-1">
              <div className="flex-1 flex flex-col gap-0.5 min-w-0">
                <p className="text-sm font-black truncate text-zinc-900 dark:text-white">
                  {clip.name}
                </p>
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                  Clip #{index + 1}
                </span>
              </div>
              <Button asChild variant="default" size="sm" className="gap-2 shrink-0 font-bold rounded-full px-5 h-10 shadow-lg shadow-primary/20">
                <a href={clip.url} download={clip.name}>
                  <HugeiconsIcon icon={Download01Icon} className="size-4" />
                  Download
                </a>
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
