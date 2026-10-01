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

/* ---------------- Eyebrow: Carbon sentence-case 14px section label -------- */

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
        "inline-flex items-center gap-2.5 text-sm",
        tone === "blue" ? "text-primary" : "text-ink-muted",
        className
      )}
    >
      <span className="h-px w-6 bg-current inline-block" aria-hidden="true" />
      {children}
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
  variant?: "primary" | "secondary" | "outline" | "ghost" | "light" | "outline-light";
  className?: string;
  type?: "button" | "submit";
  arrow?: boolean;
  disabled?: boolean;
}) {
  const styles = cn(
    "group relative inline-flex items-center justify-center gap-2 focus-carbon text-sm font-medium px-6 h-12 select-none transition-all duration-200 rounded-none",
    /* Carbon button-primary: blue solid */
    variant === "primary" &&
      "bg-primary text-white hover:bg-ibm-blue-hover active:bg-ibm-blue-active",
    /* Carbon button-secondary: charcoal solid */
    variant === "secondary" &&
      "bg-ink text-white hover:bg-ibm-inverse-hover active:bg-ink",
    /* Carbon button-tertiary: white with 1px blue border + blue text → fills on hover */
    variant === "outline" &&
      "bg-transparent text-primary ring-1 ring-inset ring-primary hover:bg-primary hover:text-white active:bg-ibm-blue-active active:text-white",
    /* Carbon button-ghost: plain blue text, blue-10 wash on hover */
    variant === "ghost" && "text-primary hover:bg-[#edf5ff] active:bg-ibm-blue-active active:text-white",
    /* white buttons for use on solid IBM blue surfaces */
    variant === "light" && "bg-white text-primary hover:bg-slate-100 active:bg-slate-200",
    variant === "outline-light" &&
      "bg-transparent text-white ring-1 ring-inset ring-white/60 hover:bg-white hover:text-primary active:bg-white/80",
    disabled && "opacity-50 pointer-events-none",
    className
  );
  const track = (
    <span className="inline-flex items-center justify-center gap-2 whitespace-nowrap">
      <span className="inline-flex items-center justify-center gap-2 whitespace-nowrap">{children}</span>
      {arrow && (
        <ArrowRight
          className="size-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1"
          strokeWidth={1.75}
        />
      )}
    </span>
  );
  if (href) {
    return (
      <a href={href} className={styles} onClick={onClick}>
        {track}
      </a>
    );
  }
  return (
    <button type={type ?? "button"} onClick={onClick} className={styles} disabled={disabled}>
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
