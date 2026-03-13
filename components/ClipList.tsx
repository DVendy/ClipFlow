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
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <HugeiconsIcon icon={FileBoxIcon} className="size-6" />
          Generated Clips
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {clips.map((clip, index) => (
          <div
            key={clip.url}
            className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 rounded-lg bg-zinc-50 border border-zinc-100"
          >
            <div className="w-full md:w-48 aspect-video bg-black rounded-md overflow-hidden border border-zinc-200">
              <video
                src={clip.url}
                className="w-full h-full object-contain"
                controls
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p className="text-sm font-semibold">{clip.name}</p>
              <p className="text-xs text-zinc-500">Clip #{index + 1}</p>
            </div>
            <Button asChild variant="secondary" size="sm" className="gap-2">
              <a href={clip.url} download={clip.name}>
                <HugeiconsIcon icon={Download01Icon} className="size-4" />
                Download
              </a>
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
