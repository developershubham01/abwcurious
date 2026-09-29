"use client";

import { Sparkle } from "lucide-react";

const ITEMS = [
  "AI Software Development",
  "AI Solutions",
  "Website Development",
  "UI/UX Design",
  "Chatbots & Assistants",
  "Web Applications",
  "Machine Learning",
  "Brand Identity",
  "Automation",
  "Cloud & APIs",
];

export function Marquee({
  reverse = false,
  className = "",
}: {
  reverse?: boolean;
  className?: string;
}) {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className={`relative overflow-hidden border-y border-hairline bg-white py-4 ${className}`}>
      <div
        className={`flex w-max items-center gap-8 whitespace-nowrap ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
      >
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-8 text-sm text-ink-muted">
            <span className="transition-colors hover:text-ink">{item}</span>
            <Sparkle className="size-3.5 text-ibm-subtle" strokeWidth={1.5} aria-hidden="true" />
          </span>
        ))}
      </div>
    </div>
  );
}
