"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { PlayIcon, ArrowRight01Icon } from "@hugeicons/core-free-icons";

export default function Hero() {
  return (
    <section id="hero" className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto gap-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-black uppercase tracking-widest animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            New: Version 2.0 is out
          </div>
          
          <div className="flex flex-col gap-4">
            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-zinc-900 dark:text-white leading-[1.1]">
              MomentClipper
            </h1>
            <p className="text-xl md:text-2xl font-bold text-primary italic">
              Cut video moments instantly in your browser.
            </p>
          </div>

          <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
            Upload a video, define timeline segments, and download clips instantly.
            All processing happens locally in your browser using FFmpeg WASM. No uploads to server needed.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
            <Link href="#app">
              <Button size="lg" className="h-14 px-8 text-lg font-black gap-3 rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 transition-all">
                Try the App
                <HugeiconsIcon icon={PlayIcon} className="size-5" />
              </Button>
            </Link>
            <Link href="#how-it-works">
              <Button variant="outline" size="lg" className="h-14 px-8 text-lg font-bold gap-3 rounded-2xl border-2">
                See How It Works
                <HugeiconsIcon icon={ArrowRight01Icon} className="size-5" />
              </Button>
            </Link>
          </div>

          {/* Placeholder for Product Screenshot/Card */}
          <div className="mt-16 w-full max-w-5xl aspect-video rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 shadow-2xl overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-primary/5 opacity-50 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute top-4 left-4 flex gap-1.5">
              <div className="size-3 rounded-full bg-red-400"></div>
              <div className="size-3 rounded-full bg-amber-400"></div>
              <div className="size-3 rounded-full bg-emerald-400"></div>
            </div>
            <div className="flex items-center justify-center h-full">
              <div className="flex flex-col items-center gap-4 text-zinc-300 dark:text-zinc-700">
                <HugeiconsIcon icon={PlayIcon} className="size-20" />
                <span className="font-black text-xl tracking-tighter uppercase opacity-50">Local Browser Processing</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 w-full max-w-6xl aspect-square bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>
    </section>
  );
}
