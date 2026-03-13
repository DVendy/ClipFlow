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

  const videoPreviewUrl = React.useMemo(() => {
    return selectedFile ? URL.createObjectURL(selectedFile) : null;
  }, [selectedFile]);

  React.useEffect(() => {
    return () => {
      if (videoPreviewUrl) {
        URL.revokeObjectURL(videoPreviewUrl);
      }
    };
  }, [videoPreviewUrl]);

  return (
    <Card className="w-full border-zinc-200/50 shadow-lg shadow-black/5">
      <CardContent className="pt-6 flex flex-col items-center gap-4">
        {!selectedFile ? (
          <div
            className="w-full h-48 border-2 border-dashed border-zinc-200 rounded-2xl flex flex-col items-center justify-center gap-2 hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer group"
            onClick={() => fileInputRef.current?.click()}
          >
            <HugeiconsIcon 
              icon={Upload01Icon} 
              className="w-10 h-10 text-zinc-400 group-hover:text-primary transition-colors" 
            />
            <p className="text-sm text-zinc-500 font-medium group-hover:text-zinc-700 transition-colors">
              Click to upload or drag and drop
            </p>
            <p className="text-sm text-zinc-400">MP4, WebM, MOV, AVI</p>
          </div>
        ) : (
          <div className="w-full flex flex-col gap-4">
            <div className="relative aspect-video bg-black rounded-xl overflow-hidden border border-zinc-200/50 shadow-inner">
              <video
                src={videoPreviewUrl!}
                className="w-full h-full object-contain"
                controls
              />
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="flex flex-col">
                <p className="text-sm font-bold truncate max-w-[240px] text-zinc-900 dark:text-white">
                  {selectedFile.name}
                </p>
                <p className="text-sm font-medium text-zinc-500">
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
