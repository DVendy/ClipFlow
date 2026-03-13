"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-16 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-black">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <span className="text-2xl font-black tracking-tighter text-zinc-900 dark:text-white">
                MomentClipper
              </span>
              <p className="text-zinc-600 dark:text-zinc-400 font-medium max-w-sm">
                Cut video moments instantly in your browser. Fast, secure, and private.
              </p>
            </div>
            <div className="flex gap-4">
              {/* social icons placeholder if needed */}
            </div>
          </div>
          
          <div className="flex flex-col gap-6">
            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-zinc-400">
              Product
            </h4>
            <ul className="flex flex-col gap-4 text-sm font-bold text-zinc-600 dark:text-zinc-400">
              <li><Link href="#hero" className="hover:text-primary transition-colors">Features</Link></li>
              <li><Link href="#pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
              <li><Link href="#app" className="hover:text-primary transition-colors">Launch App</Link></li>
            </ul>
          </div>

          <div className="flex flex-col gap-6">
            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-zinc-400">
              Company
            </h4>
            <ul className="flex flex-col gap-4 text-sm font-bold text-zinc-600 dark:text-zinc-400">
              <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs font-bold text-zinc-500 dark:text-zinc-600 uppercase tracking-widest">
            © 2026 MomentClipper. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <div className="size-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
