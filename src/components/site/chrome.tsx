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
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-ibm-blue via-ibm-bright to-ibm-cyan"
      style={{ scaleX }}
    />
  );
}

/** Square IBM-style back-to-top control, appears after the hero. */
export function BackToTop() {
  const [visible, setVisible] = useState(false);

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
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="focus-carbon fixed bottom-6 right-6 z-50 flex size-11 items-center justify-center border border-hairline-strong bg-card/90 text-foreground backdrop-blur-md transition-colors duration-300 hover:border-ibm-bright hover:text-ibm-bright"
        >
          <ArrowUp className="size-5" strokeWidth={1.5} aria-hidden="true" />
          <span
            className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-100 bg-gradient-to-r from-ibm-blue to-ibm-cyan"
            aria-hidden="true"
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
