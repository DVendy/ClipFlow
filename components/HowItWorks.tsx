"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { Upload01Icon, TransitionTopFreeIcons, Download01Icon } from "@hugeicons/core-free-icons";

const steps = [
  {
    title: "Step 1",
    subtitle: "Upload your video",
    description: "Simply drag and drop your video file into the browser. No files are uploaded to our servers; everything stays local.",
    icon: Upload01Icon,
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    title: "Step 2",
    subtitle: "Define timeline segments",
    description: "Use our intuitive timeline editor to select the parts you want to keep. Create multiple segments from a single video.",
    icon: TransitionTopFreeIcons,
    color: "bg-purple-500/10 text-purple-500",
  },
  {
    title: "Step 3",
    subtitle: "Generate and download",
    description: "Click generate and see the magic happen. Download your high-quality clips instantly directly from your browser.",
    icon: Download01Icon,
    color: "bg-emerald-500/10 text-emerald-500",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-zinc-50 dark:bg-zinc-900/50">
      <div className="container mx-auto px-4 md:px-6">
        <div 
          data-aos="fade-up"
          className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-4"
        >
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-zinc-900 dark:text-white">
            How MomentClipper Works
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Trimming videos has never been easier or more secure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index} 
              data-aos="fade-up"
              data-aos-delay={index * 200}
              className="flex flex-col gap-6 p-8 rounded-3xl bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 h-full"
            >
              <div className={`size-14 rounded-2xl flex items-center justify-center ${step.color}`}>
                <HugeiconsIcon icon={step.icon} className="size-8" />
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-primary">
                  {step.title}
                </span>
                <h3 className="text-2xl font-black text-zinc-900 dark:text-white">
                  {step.subtitle}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
