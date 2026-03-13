"use client";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Pricing from "@/components/Pricing";
import ClipperApp from "@/components/ClipperApp";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-black selection:bg-primary/20 scroll-smooth">
      <Header />
      
      <main>
        <Hero />
        
        <HowItWorks />
        
        <Pricing />
        
        <section id="app" className="py-24 bg-zinc-50 dark:bg-zinc-900/30">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-4">
              <h2 className="text-3xl md:text-5xl font-black tracking-tight text-zinc-900 dark:text-white">
                Try MomentClipper
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400">
                The fastest way to crop and trim your videos without leaving your browser.
              </p>
            </div>
            
            <div className="max-w-6xl mx-auto p-4 md:p-8 rounded-[40px] bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 shadow-2xl">
              <ClipperApp />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
