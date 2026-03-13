"use client";

import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { Tick01Icon } from "@hugeicons/core-free-icons";

const plans = [
  {
    name: "FREE PLAN",
    price: "Free",
    description: "Perfect for quick one-off trims.",
    features: [
      "Max video length: 60 seconds",
      "Max file size: 20 MB",
      "Up to 10 videos per day",
      "Standard quality",
    ],
    buttonText: "Start Free",
    popular: false,
  },
  {
    name: "PREMIUM PLAN",
    price: "$9",
    period: "/ month",
    description: "For professionals and content creators.",
    features: [
      "Unlimited video length",
      "Unlimited file size",
      "Unlimited clips",
      "Priority processing",
      "Ultra-high quality",
      "Custom filenames",
    ],
    buttonText: "Upgrade to Premium",
    popular: true,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-4">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-zinc-900 dark:text-white">
            Simple Pricing
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Choose the plan that fits your needs. No hidden fees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`relative flex flex-col gap-8 p-10 rounded-[32px] border transition-all ${
                plan.popular 
                  ? "bg-zinc-900 border-zinc-800 shadow-2xl scale-105 z-10" 
                  : "bg-white dark:bg-black border-zinc-200 dark:border-zinc-800 shadow-sm"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full ring-4 ring-white dark:ring-black">
                  MOST POPULAR
                </div>
              )}

              <div className="flex flex-col gap-2">
                <span className={`text-xs font-black uppercase tracking-[0.2em] ${plan.popular ? "text-primary" : "text-zinc-400"}`}>
                  {plan.name}
                </span>
                <div className="flex items-baseline gap-1">
                  <span className={`text-5xl font-black tracking-tighter ${plan.popular ? "text-white" : "text-zinc-900 dark:text-white"}`}>
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className={`text-lg font-bold ${plan.popular ? "text-zinc-400" : "text-zinc-500"}`}>
                      {plan.period}
                    </span>
                  )}
                </div>
                <p className={`text-sm ${plan.popular ? "text-zinc-400" : "text-zinc-500"}`}>
                  {plan.description}
                </p>
              </div>

              <ul className="flex flex-col gap-4">
                {plan.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-center gap-3">
                    <div className={`size-5 rounded-full flex items-center justify-center ${plan.popular ? "bg-primary/20 text-primary" : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"}`}>
                      <HugeiconsIcon icon={Tick01Icon} className="size-3.5" />
                    </div>
                    <span className={`text-sm font-medium ${plan.popular ? "text-zinc-300" : "text-zinc-700 dark:text-zinc-300"}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Button 
                size="lg" 
                className={`w-full h-14 rounded-2xl text-lg font-black mt-auto transition-transform active:scale-95 ${
                  plan.popular 
                    ? "bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20" 
                    : "variant-outline border-2"
                }`}
              >
                {plan.buttonText}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
