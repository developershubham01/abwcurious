"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./primitives";

/**
 * Motion graphic showcase video section placed right after Hero:
 * - Continuous autoplay without controls or play icon (autoPlay, loop, muted, playsInline)
 * - Space above and below
 * - Crisp IBM Carbon hairline border frame
 */
export function MotionVideoSection() {
  return (
    <section
      aria-label="ABWcurious Motion Showcase"
      className="relative border-b border-hairline bg-ibm-layer py-12 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal y={24}>
          {/* Border Frame */}
          <div className="group relative overflow-hidden border border-hairline bg-white p-2 sm:p-4 shadow-lg transition-all duration-300 hover:border-primary/60 hover:shadow-2xl">
            {/* Corner accent tags */}
            <div className="absolute left-0 top-0 z-20 h-3 w-3 border-l-2 border-t-2 border-primary" />
            <div className="absolute right-0 top-0 z-20 h-3 w-3 border-r-2 border-t-2 border-primary" />
            <div className="absolute bottom-0 left-0 z-20 h-3 w-3 border-b-2 border-l-2 border-primary" />
            <div className="absolute bottom-0 right-0 z-20 h-3 w-3 border-b-2 border-r-2 border-primary" />

            {/* Video Player */}
            <div className="relative overflow-hidden bg-black">
              <video
                src="/abwcurious-services-explainer.mp4"
                autoPlay
                loop
                muted
                playsInline
                controls={false}
                className="w-full h-auto max-h-[720px] object-cover block select-none"
              />
            </div>
          </div>

          {/* Connect Button Just Below Video */}
          <div className="mt-8 flex items-center justify-center">
            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center gap-2.5 border border-[#0f62fe] bg-[#0f62fe] px-8 text-sm font-medium text-white transition-colors hover:bg-[#0043ce] shadow-sm"
            >
              <span>Let&apos;s connect with us</span>
              <ArrowRight className="size-4 shrink-0" strokeWidth={2} />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
