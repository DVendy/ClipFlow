"use client";

import { useState, useCallback } from "react";
import { fetchFile } from "@ffmpeg/util";
import { loadFFmpeg } from "@/lib/ffmpeg";
import VideoUploader from "@/components/VideoUploader";
import TimelineEditor, { Segment } from "@/components/TimelineEditor";
import ClipList, { Clip } from "@/components/ClipList";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { HugeiconsIcon } from "@hugeicons/react";
import { Scissor01Icon, Loading03Icon } from "@hugeicons/core-free-icons";

export default function Home() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [segments, setSegments] = useState<Segment[]>([]);
  const [clips, setClips] = useState<Clip[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("");

  const handleAddSegment = () => {
    const id = Math.random().toString(36).substr(2, 9);
    setSegments([...segments, { id, start: "00:00:00", end: "00:00:10" }]);
  };

  const handleRemoveSegment = (id: string) => {
    setSegments(segments.filter((s) => s.id !== id));
  };

  const handleUpdateSegment = (
    id: string,
    field: "start" | "end",
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
        const outputName = `clip-${i + 1}.mp4`;
        
        setStatus(`Processing clip ${i + 1} of ${segments.length}...`);
        
        // Command: ffmpeg -ss START -to END -i input.mp4 -c copy output.mp4
        // Note: -c copy is fast but might not be precise on some keyframes in browser WASM.
        // For better precision we might need to re-encode, but copy is requested.
        await ffmpeg.exec([
          "-ss", segment.start,
          "-to", segment.end,
          "-i", fileName,
          "-c", "copy",
          outputName
        ]);

        const data = await ffmpeg.readFile(outputName);
        // data can be Uint8Array or string, we need Uint8Array to create a Blob
        // Also handle SharedArrayBuffer issue by ensuring we have a plain ArrayBuffer or Uint8Array
        const uint8Data = typeof data === 'string' ? new TextEncoder().encode(data) : data;
        const blob = new Blob([uint8Data], { type: "video/mp4" });
        const url = URL.createObjectURL(blob);

        generatedClips.push({
          url,
          name: outputName,
        });

        setProgress(((i + 1) / segments.length) * 100);
      }

      setClips(generatedClips);
      setStatus("Processing complete!");
    } catch (error) {
      console.error("FFmpeg error:", error);
      setStatus("Error processing video. Check console.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#050505] p-6 md:p-12 font-sans">
      <main className="max-w-4xl mx-auto flex flex-col gap-10">
        <header className="flex flex-col gap-2">
          <h1 className="text-4xl font-black tracking-tight text-zinc-900 dark:text-white">
            Video Timeline Cutter
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-lg">
            Clip your videos directly in the browser. Fast, private, and secure.
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                Step 1: Upload Video
              </h2>
              <VideoUploader
                selectedFile={videoFile}
                onFileSelect={(file) => setVideoFile(file)}
              />
            </div>

            {videoFile && (
              <div className="flex flex-col gap-3">
                <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                  Step 2: Define Segments
                </h2>
                <TimelineEditor
                  segments={segments}
                  onAddSegment={handleAddSegment}
                  onRemoveSegment={handleRemoveSegment}
                  onUpdateSegment={handleUpdateSegment}
                />
              </div>
            )}
          </div>

          <div className="flex flex-col gap-8">
            {segments.length > 0 && (
              <div className="flex flex-col gap-4">
                <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-400">
                  Step 3: Process & Download
                </h2>
                <Button
                  size="lg"
                  onClick={generateClips}
                  disabled={isProcessing || !videoFile}
                  className="w-full h-16 text-lg font-bold gap-3 shadow-xl shadow-zinc-200 dark:shadow-none transition-all active:scale-[0.98] rounded-2xl"
                >
                  {isProcessing ? (
                    <HugeiconsIcon icon={Loading03Icon} className="w-6 h-6 animate-spin" />
                  ) : (
                    <HugeiconsIcon icon={Scissor01Icon} className="w-6 h-6" />
                  )}
                  {isProcessing ? "Processing..." : "Generate Clips"}
                </Button>

                {isProcessing && (
                  <div className="flex flex-col gap-2 p-4 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-100 dark:border-zinc-800 shadow-sm">
                    <div className="flex justify-between items-center text-sm font-medium">
                      <span>{status}</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                )}

                <ClipList clips={clips} />
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
