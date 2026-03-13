"use client";

import React, { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { Upload01Icon } from "@hugeicons/core-free-icons";

interface VideoUploaderProps {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
}

export default function VideoUploader({
  onFileSelect,
  selectedFile,
}: VideoUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  const videoPreviewUrl = selectedFile ? URL.createObjectURL(selectedFile) : null;

  return (
    <Card className="w-full">
      <CardContent className="pt-6 flex flex-col items-center gap-4">
        {!selectedFile ? (
          <div
            className="w-full h-48 border-2 border-dashed border-zinc-200 rounded-lg flex flex-col items-center justify-center gap-2 hover:border-zinc-300 transition-colors cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <HugeiconsIcon icon={Upload01Icon} className="w-10 h-10 text-zinc-400" />
            <p className="text-sm text-zinc-500 font-medium">
              Click to upload or drag and drop
            </p>
            <p className="text-xs text-zinc-400">MP4, WebM up to 500MB</p>
          </div>
        ) : (
          <div className="w-full flex flex-col gap-4">
            <div className="relative aspect-video bg-black rounded-lg overflow-hidden border border-zinc-200">
              <video
                src={videoPreviewUrl!}
                className="w-full h-full object-contain"
                controls
              />
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="flex flex-col">
                <p className="text-sm font-medium truncate max-w-[240px]">
                  {selectedFile.name}
                </p>
                <p className="text-xs text-zinc-500">
                  {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
              >
                Change Video
              </Button>
            </div>
          </div>
        )}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="video/*"
          className="hidden"
        />
      </CardContent>
    </Card>
  );
}
