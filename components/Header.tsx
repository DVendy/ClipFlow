"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-black/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex flex-col">
          <Link href="#hero" className="text-xl font-black tracking-tighter text-zinc-900 dark:text-white leading-none">
            MomentClipper
          </Link>
          <span className="text-[10px] font-bold text-zinc-500 dark:text-zinc-500 uppercase tracking-tight">
            Cut video moments instantly in your browser
          </span>
        </div>
        
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-400">
          <Link href="#hero" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
            Home
          </Link>
          <Link href="#how-it-works" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
            How It Works
          </Link>
          <Link href="#pricing" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
            Pricing
          </Link>
          <Link href="#app" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
            App
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
            Sign In
          </Button>
          <Button size="sm" className="bg-primary hover:bg-primary/90 text-white font-bold rounded-xl px-5">
            Sign Up
          </Button>
        </div>
      </div>
    </header>
  );
}
