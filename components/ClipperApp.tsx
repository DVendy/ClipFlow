"use client";

import { useState, useCallback, useEffect } from "react";
import { fetchFile } from "@ffmpeg/util";
import { loadFFmpeg } from "@/lib/ffmpeg";
import VideoUploader from "@/components/VideoUploader";
import TimelineEditor, { Segment } from "@/components/TimelineEditor";
import ClipList, { Clip } from "@/components/ClipList";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { HugeiconsIcon } from "@hugeicons/react";
import { Scissor01Icon, Loading03Icon, Alert01Icon, InformationCircleIcon, YoutubeIcon } from "@hugeicons/core-free-icons";

export default function ClipperApp() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [segments, setSegments] = useState<Segment[]>([]);
  const [clips, setClips] = useState<Clip[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    };
    checkMobile();
  }, []);

  const handleAddSegment = () => {
    const id = Math.random().toString(36).substr(2, 9);
    setSegments([...segments, { id, start: "00:00:00", end: "00:00:10" }]);
  };

  const handleRemoveSegment = (id: string) => {
    setSegments(segments.filter((s) => s.id !== id));
  };

  const handleUpdateSegment = (
    id: string,
    field: keyof Segment,
    value: string
  ) => {
    setSegments(
      segments.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  };

  const generateClips = async () => {
    if (!videoFile || segments.length === 0) return;

    setIsProcessing(true);
    setProgress(0);
    setClips([]);
    setStatus("Loading FFmpeg...");

    try {
      const ffmpeg = await loadFFmpeg();
      setStatus("Uploading video to memory...");
      
      const fileName = videoFile.name;
      await ffmpeg.writeFile(fileName, await fetchFile(videoFile));

      const generatedClips: Clip[] = [];

      for (let i = 0; i < segments.length; i++) {
        const segment = segments[i];
        const outputName = segment.filename 
          ? (segment.filename.endsWith('.mp4') ? segment.filename : `${segment.filename}.mp4`)
          : `clip-${i + 1}.mp4`;
        
        setStatus(`Processing ${outputName}...`);
        
        await ffmpeg.exec([
          "-ss", segment.start,
          "-to", segment.end,
          "-i", fileName,
          "-c", "copy",
          outputName
        ]);

        const data = await ffmpeg.readFile(outputName);
        const uint8Data = typeof data === 'string' ? new TextEncoder().encode(data) : data;
        const blob = new Blob([new Uint8Array(uint8Data)], { type: "video/mp4" });
        const url = URL.createObjectURL(blob);

        generatedClips.push({
          url,
          name: outputName,
        });

        setProgress(((i + 1) / segments.length) * 100);
      }

      setClips(generatedClips);
      setStatus("Success! Your clips are ready.");
    } catch (error) {
      console.error("FFmpeg error:", error);
      setStatus("Error processing video. Check console.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full flex flex-col gap-10">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-black tracking-tighter text-zinc-900 dark:text-white flex items-center gap-3">
            <span className="bg-primary px-3 py-1 rounded-2xl text-white">Clip</span>
            <span>Trim</span>
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-lg font-medium">
            High-speed browser-based video clipper.
          </p>
        </div>
        {isMobile && (
          <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 p-4 rounded-2xl flex items-start gap-3 max-w-md">
            <HugeiconsIcon icon={Alert01Icon} className="size-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="flex flex-col gap-1">
              <p className="text-xs font-bold text-amber-800 dark:text-amber-400 uppercase tracking-wider">Mobile Warning</p>
              <p className="text-sm text-amber-700 dark:text-amber-500 leading-relaxed">
                FFmpeg WASM works best on Desktop. Mobile browsers may experience crashes or very slow processing.
              </p>
            </div>
          </div>
        )}
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-12 xl:col-span-7 flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400 flex items-center gap-2">
                <span className="bg-zinc-100 dark:bg-zinc-800 size-6 rounded-full flex items-center justify-center text-[10px] text-zinc-500">1</span>
                Select Video
              </h3>
              <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-400">
                <HugeiconsIcon icon={InformationCircleIcon} className="size-3" />
                MP4, WEBM, MOV, AVI (Local files only)
              </div>
            </div>
            <VideoUploader
              selectedFile={videoFile}
              onFileSelect={(file) => setVideoFile(file)}
            />
            <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-white/5 border border-zinc-100 dark:border-white/5 flex flex-col gap-3">
              <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                <HugeiconsIcon icon={YoutubeIcon} className="size-5 text-[#FF0000]" />
                <span className="text-sm font-bold">YouTube Content Policy</span>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-500 leading-relaxed">
                Due to copyright and Terms of Service, we do not support direct YouTube downloads. 
                However, you can download your clips locally first and then use MomentClipper.
              </p>
              <a 
                href="https://www.google.com/search?q=download+youtube+video" 
                target="_blank" 
                className="text-primary text-[10px] font-black uppercase tracking-wider hover:underline flex items-center gap-1"
              >
                Search for YouTube Downloaders
                <HugeiconsIcon icon={InformationCircleIcon} className="size-3" />
              </a>
            </div>
          </div>

          {videoFile && (
            <div className="flex flex-col gap-4">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400 flex items-center gap-2">
                <span className="bg-zinc-100 dark:bg-zinc-800 size-6 rounded-full flex items-center justify-center text-[10px] text-zinc-500">2</span>
                Define Segments
              </h3>
              <TimelineEditor
                segments={segments}
                onAddSegment={handleAddSegment}
                onRemoveSegment={handleRemoveSegment}
                onUpdateSegment={handleUpdateSegment}
              />
            </div>
          )}
        </div>

        <div className="lg:col-span-12 xl:col-span-5 flex flex-col gap-8 sticky top-24">
          {segments.length > 0 && (
            <div className="flex flex-col gap-4">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400 flex items-center gap-2">
                <span className="bg-zinc-100 dark:bg-zinc-800 size-6 rounded-full flex items-center justify-center text-[10px] text-zinc-500">3</span>
                Process & Download
              </h3>
              <Button
                size="lg"
                onClick={generateClips}
                disabled={isProcessing || !videoFile}
                className="w-full h-20 text-xl font-black gap-4 shadow-2xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98] rounded-3xl"
              >
                {isProcessing ? (
                  <HugeiconsIcon icon={Loading03Icon} className="w-2 h-8 animate-spin" />
                ) : (
                  <HugeiconsIcon icon={Scissor01Icon} className="w-8 h-8" />
                )}
                {isProcessing ? "TRIMMING..." : "GENERATE CLIPS"}
              </Button>

              {isProcessing && (
                <div className="flex flex-col gap-3 p-6 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-100 dark:border-zinc-800 shadow-xl">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-black uppercase tracking-widest text-primary">{status}</span>
                    <span className="text-sm font-black">{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-3 rounded-full" />
                </div>
              )}

              <ClipList clips={clips} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
