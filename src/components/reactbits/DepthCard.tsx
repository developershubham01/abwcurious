"use client";

/* DepthCard — perspective depth effect that responds to mouse movement.
   Carbon-styled equivalent of the React Bits Pro "Depth Card": the card
   tilts in 3D space toward the pointer while its layers sit at different
   translateZ planes, a specular glare tracks the cursor, and everything
   eases back to rest on leave. Rendered square (radius 0) to match the
   IBM Carbon system. Reduced-motion users get a static card. */

import {
  useCallback,
  useEffect,
  useRef,
  type CSSProperties,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);

export interface DepthCardProps {
  children: ReactNode;
  className?: string;
  /** Max rotation in degrees on each axis. */
  maxTilt?: number;
  /** Scale applied while hovering. */
  hoverScale?: number;
  /** CSS perspective distance in px. */
  perspective?: number;
  /** Show the specular glare that tracks the pointer. */
  glare?: boolean;
  /** Lift the card on hover (translateZ in px). */
  lift?: number;
  style?: CSSProperties;
  onClick?: () => void;
  ariaLabel?: string;
}

export function DepthCard({
  children,
  className,
  maxTilt = 9,
  hoverScale = 1.015,
  perspective = 1100,
  glare = true,
  lift = 14,
  style,
  onClick,
  ariaLabel,
}: DepthCardProps) {
  const outerRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const glareRef = useRef<HTMLDivElement | null>(null);
  const s = useRef({
    cx: 0,
    cy: 0, // current rotation (deg)
    tx: 0,
    ty: 0, // target rotation (deg)
    gx: 50,
    gy: 50, // glare position (%)
    active: false,
    scale: 1,
  });

  const paint = useCallback(() => {
    const inner = innerRef.current;
    const glareEl = glareRef.current;
    if (!inner) return;
    const st = s.current;
    const liftZ = st.active ? lift : 0;
    inner.style.transform = `rotateX(${st.cy.toFixed(3)}deg) rotateY(${st.cx.toFixed(3)}deg) translateZ(${liftZ.toFixed(1)}px) scale(${st.scale.toFixed(4)})`;
    if (glareEl) {
      glareEl.style.opacity = st.active ? "1" : "0";
      glareEl.style.background = `radial-gradient(circle at ${st.gx}% ${st.gy}%, rgba(255,255,255,0.34) 0%, rgba(120,169,255,0.10) 34%, rgba(15,98,254,0.05) 54%, transparent 74%)`;
    }
  }, [lift]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return; // static card — no listeners-driven loop
    let raf = 0;
    let last = 0;
    const frame = (now: number) => {
      const st = s.current;
      const dt = Math.min(0.05, last ? (now - last) / 1000 : 0.016);
      last = now;
      const ease = 1 - Math.exp(-dt / 0.11);
      st.cx += (st.tx - st.cx) * ease;
      st.cy += (st.ty - st.cy) * ease;
      const targetScale = st.active ? hoverScale : 1;
      st.scale += (targetScale - st.scale) * ease;
      paint();
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [hoverScale, paint]);

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const outer = outerRef.current;
    if (!outer) return;
    const st = s.current;
    const r = outer.getBoundingClientRect();
    const nx = clamp((e.clientX - r.left) / (r.width || 1), 0, 1);
    const ny = clamp((e.clientY - r.top) / (r.height || 1), 0, 1);
    st.active = true;
    // rotateY follows X, rotateX opposes Y — classic look-at-cursor tilt
    st.tx = (nx - 0.5) * 2 * maxTilt;
    st.ty = -(ny - 0.5) * 2 * maxTilt;
    st.gx = nx * 100;
    st.gy = ny * 100;
  };

  const onPointerLeave = () => {
    const st = s.current;
    st.active = false;
    st.tx = 0;
    st.ty = 0;
  };

  return (
    <div
      ref={outerRef}
      className={cn("[perspective:var(--depth-perspective)]", className)}
      style={
        {
          "--depth-perspective": `${perspective}px`,
          ...style,
        } as CSSProperties
      }
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      onClick={onClick}
    >
      <div
        ref={innerRef}
        aria-label={ariaLabel}
        className="relative h-full w-full will-change-transform [transform-style:preserve-3d]"
        style={{ transformStyle: "preserve-3d" }}
      >
        {children}
        {glare && (
          <div
            ref={glareRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300"
          />
        )}
      </div>
    </div>
  );
}

/** A child plane of a DepthCard lifted toward the viewer at a given depth. */
export function DepthLayer({
  children,
  z = 0,
  className,
}: {
  children: ReactNode;
  /** Translation along the Z axis in px — larger is closer to the viewer. */
  z?: number;
  className?: string;
}) {
  return (
    <div
      className={className}
      style={{ transform: `translateZ(${z}px)`, transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
}
