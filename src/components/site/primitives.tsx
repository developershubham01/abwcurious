"use client";

import { motion, useInView, useReducedMotion, useSpring } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/* ---------------- Reveal: scroll-triggered fade-up ---------------- */

export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  once = true,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-64px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ---------------- Eyebrow: mono label with dash ornaments ---------------- */

export function Eyebrow({
  children,
  className,
  tone = "blue",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "blue" | "muted";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 font-mono text-xs tracking-[0.22em] uppercase",
        tone === "blue" ? "text-ibm-soft" : "text-muted-foreground",
        className
      )}
    >
      <span className="h-px w-6 bg-current inline-block" aria-hidden="true" />
      {children}
      <span className="h-px w-6 bg-current inline-block" aria-hidden="true" />
    </span>
  );
}

/* ---------------- RollButton: dual-layer text roll-up CTA ---------------- */

export function RollButton({
  children,
  href,
  onClick,
  variant = "primary",
  className,
  type,
  arrow = false,
  disabled = false,
}: {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "outline" | "ghost" | "light" | "outline-light";
  className?: string;
  type?: "button" | "submit";
  arrow?: boolean;
  disabled?: boolean;
}) {
  const inner = (dark?: boolean) => (
    <>
      <span>{children}</span>
      {arrow && (
        <ArrowRight
          className={cn(
            "size-4 transition-transform duration-300 group-hover:translate-x-0.5"
          )}
          strokeWidth={1.75}
        />
      )}
    </>
  );
  const styles = cn(
    "btn-roll group focus-carbon font-mono text-sm tracking-[0.02em] px-6 h-12 select-none",
    variant === "primary" && "bg-primary text-primary-foreground hover:bg-ibm-blue-hover",
    variant === "outline" &&
      "bg-transparent text-foreground ring-1 ring-inset ring-ink/35 hover:bg-ink/[0.05] hover:ring-ink/70",
    variant === "ghost" && "text-foreground hover:text-ibm-bright",
    /* white buttons for use on solid IBM blue surfaces */
    variant === "light" && "bg-white text-ibm-blue-active hover:bg-white/85",
    variant === "outline-light" &&
      "bg-transparent text-white ring-1 ring-inset ring-white/60 hover:bg-white/10 hover:ring-white",
    disabled && "opacity-50 pointer-events-none",
    className
  );
  const track = (
    <span className="btn-roll__viewport">
      <span className="btn-roll__track">
        <span className="btn-roll__span">{inner()}</span>
        <span className="btn-roll__span">{inner()}</span>
      </span>
    </span>
  );
  if (href) {
    return (
      <a href={href} className={cn(styles, "group")} onClick={onClick}>
        {track}
      </a>
    );
  }
  return (
    <button type={type ?? "button"} onClick={onClick} className={cn(styles, "group")} disabled={disabled}>
      {track}
    </button>
  );
}

/* ---------------- useCountUp: animated stat numbers ---------------- */

export function CountUp({
  to,
  suffix = "",
  prefix = "",
  duration = 1.8,
  decimals = 0,
  className,
}: {
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  decimals?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduced = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const dur = reduced ? 0 : duration * 1000;
    const start = performance.now();
    const tick = (now: number) => {
      const t = dur === 0 ? 1 : Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(to * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration, reduced]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
}

/* ---------------- Magnetic: cursor-attracting wrapper for CTAs ------------- */

export function Magnetic({
  children,
  strength = 0.28,
  className,
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const x = useSpring(0, { stiffness: 160, damping: 14, mass: 0.25 });
  const y = useSpring(0, { stiffness: 160, damping: 14, mass: 0.25 });

  return (
    <motion.div
      ref={ref}
      className={cn("inline-block", className)}
      style={{ x, y }}
      onPointerMove={(e) => {
        if (reduced || e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/* ---------------- TiltCard: subtle 3D pointer tilt wrapper ---------------- */

export function TiltCard({
  children,
  max = 5,
  className,
}: {
  children: React.ReactNode;
  max?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const rx = useSpring(0, { stiffness: 140, damping: 16 });
  const ry = useSpring(0, { stiffness: 140, damping: 16 });

  return (
    <motion.div
      ref={ref}
      className={cn("[perspective:1100px]", className)}
      onPointerMove={(e) => {
        if (reduced || e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        ry.set(px * max * 2);
        rx.set(-py * max * 2);
      }}
      onPointerLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
    >
      <motion.div
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className="h-full will-change-transform"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

/* ---------------- SectionShell: framed section wrapper ---------------- */

export function SectionFrame({
  children,
  className,
  id,
  frame = true,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  frame?: boolean;
}) {
  return (
    <section id={id} className={cn("relative border-y border-hairline", className)}>
      <div className={cn("mx-auto max-w-7xl px-6", frame && "lg:border-x lg:border-hairline")}>
        {children}
      </div>
    </section>
  );
}
