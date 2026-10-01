"use client";

import { Star, Quote, ExternalLink } from "lucide-react";
import { Eyebrow, Reveal, RollButton } from "./primitives";
import { SplitText } from "./text-anim";
import { TESTIMONIALS_DATA, Testimonial } from "@/data/testimonials";
import LogoLoop, { LogoItem } from "@/components/reactbits/LogoLoop";
import { cn } from "@/lib/utils";

function GoogleLogo({ className = "size-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  );
}

function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <div className="group flex h-[340px] w-[360px] sm:w-[420px] shrink-0 flex-col justify-between border border-hairline bg-white p-7 shadow-sm transition-all hover:border-primary hover:shadow-md">
      <div>
        {/* Top bar: Google Logo + Stars */}
        <div className="flex items-center justify-between border-b border-hairline/80 pb-3">
          <div className="flex items-center gap-2">
            <GoogleLogo className="size-4" />
            <span className="font-mono text-[11px] font-medium text-ink">Google Review</span>
          </div>

          <div className="flex items-center gap-1 text-amber-400">
            {Array.from({ length: item.rating }).map((_, idx) => (
              <Star key={idx} className="size-3.5 fill-amber-400 text-amber-400" />
            ))}
          </div>
        </div>

        {/* Quote */}
        <div className="mt-4 relative">
          <Quote className="absolute -left-1 -top-2 size-7 text-primary/10 select-none" />
          <p className="relative z-10 text-xs sm:text-sm leading-relaxed text-ink/90 italic line-clamp-4">
            &ldquo;{item.quote}&rdquo;
          </p>
        </div>
      </div>

      {/* Bottom author info + Google metadata */}
      <div className="mt-4 pt-4 border-t border-hairline">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex size-9 shrink-0 items-center justify-center text-xs font-mono font-medium text-white shadow-sm rounded-full",
              item.avatarBg
            )}
          >
            {item.monogram}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-ink">{item.name}</p>
            <p className="truncate text-xs text-ink-muted">
              {item.reviewCount} · <span className="text-primary font-normal">{item.industry}</span>
            </p>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <span className="inline-block truncate font-mono text-[10px] text-primary bg-ibm-layer px-2 py-0.5 border border-hairline max-w-[220px]">
            {item.projectTag}
          </span>
          <span className="font-mono text-[10px] text-ibm-subtle">{item.date}</span>
        </div>
      </div>
    </div>
  );
}

export function Testimonials() {
  const logoItems: LogoItem[] = TESTIMONIALS_DATA.map((item) => ({
    node: <TestimonialCard item={item} />,
    title: `${item.name} Google review`,
  }));

  return (
    <section
      id="reviews"
      aria-label="Google Client Reviews"
      className="relative scroll-mt-24 border-t border-hairline bg-ibm-layer py-20 sm:py-24 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Header with Google Logo */}
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <div className="inline-flex items-center justify-center gap-2 rounded-full border border-hairline bg-white px-4 py-1.5 shadow-sm mb-4">
              <GoogleLogo className="size-5" />
              <span className="font-mono text-xs font-medium text-ink">5.0 ★★★★★ Google Reviews</span>
            </div>
            <Eyebrow tone="blue" className="justify-center">
              Verified Client Reviews
            </Eyebrow>
          </Reveal>

          <h2 className="mt-4 text-balance text-4xl font-light leading-[1.1] tracking-tight text-ink sm:text-5xl">
            <SplitText text="What Our Clients Say on Google." immediate />
          </h2>

          <Reveal delay={0.15}>
            <p className="mt-4 text-pretty text-base leading-relaxed text-ink-muted">
              Real feedback from clients who trust ABWcurious for web development, custom software engineering, and IT solutions in Navi Mumbai.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Horizontal Scrolling Reviews Loop (Left to Right) */}
      <div className="mt-8 relative overflow-hidden">
        <LogoLoop
          logos={logoItems}
          speed={45}
          direction="right"
          logoHeight={340}
          gap={28}
          pauseOnHover
          fadeOut
          fadeOutColor="#f4f4f4"
          ariaLabel="Google client reviews marquee"
        />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        {/* CTA Banner below reviews */}
        <Reveal delay={0.3}>
          <div className="mt-10 border border-hairline bg-background p-8 sm:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h3 className="text-2xl font-light text-ink">
                Ready to build your next website or IT solution with ABWcurious?
              </h3>
              <p className="mt-2 text-sm text-ink-muted max-w-xl">
                Experience high-performance web development, custom software, and digital growth with our expert team.
              </p>
            </div>
            <RollButton href="/contact" variant="primary" arrow className="shrink-0">
              Start Your Project
            </RollButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
