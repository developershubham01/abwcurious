"use client";

import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

/** Thin IBM-blue scroll progress line pinned to the top of the viewport. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden="true"
      data-scroll-progress
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-ibm-blue via-ibm-bright to-ibm-cyan"
      style={{ scaleX }}
    />
  );
}

/** Rounded premium back-to-top control with a scroll-progress ring. */
export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  const dash = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 1.2);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          data-back-to-top
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.9 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          title="Back to top"
          className="focus-carbon group fixed bottom-6 right-6 z-50 flex size-12 items-center justify-center rounded-full border border-ink/[0.08] bg-white/85 text-ink shadow-[0_14px_40px_-12px_rgba(15,98,254,0.45)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-ibm-blue/40 hover:text-ibm-bright"
        >
          {/* progress ring */}
          <svg viewBox="0 0 48 48" className="absolute inset-0 size-full -rotate-90" aria-hidden="true">
            <circle cx="24" cy="24" r="22" fill="none" stroke="rgba(15,98,254,0.12)" strokeWidth="2" />
            <motion.circle
              cx="24"
              cy="24"
              r="22"
              fill="none"
              stroke="#0f62fe"
              strokeWidth="2"
              strokeLinecap="round"
              style={{ pathLength: dash }}
            />
          </svg>
          <ArrowUp
            className="size-5 transition-transform duration-300 group-hover:-translate-y-0.5"
            strokeWidth={1.75}
            aria-hidden="true"
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
