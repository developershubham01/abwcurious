"use client";

/* MaskedHeading — React Bits (reactbits.dev), TypeScript adaptation.
   An oversized heading whose letterforms act as a window onto an image or
   a looping muted video, with pointer parallax, idle drift and a GSAP
   word entrance.

   Implementation note: the original builds an SVG clipPath mirrored to the
   measured word boxes. That sync proved fragile under Next/React 19
   hydration timing, so this variant achieves the same continuous-image
   effect with `background-clip: text`: every word span paints its own
   slice of one shared image (backgroundSize/Position derived from each
   word's offsetLeft), so the slices recombine into a single picture. */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";

import "./MaskedHeading.css";

const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);

export interface MaskedHeadingProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "style"> {
  /** Heading copy. */
  text?: string;
  /** Element the heading renders as, so it can carry the right semantics. */
  tag?: "h1" | "h2" | "h3" | "div";
  /** Whether the source showing through the letters is an image or a looping muted video. */
  mediaType?: "image" | "video";
  /** Image or video URL. */
  src?: string;
  /** Multiple image URLs to cycle through automatically. */
  images?: string[];
  /** Duration in milliseconds before switching to the next image (default 5000). */
  interval?: number;
  /** Poster frame used while a video loads. */
  poster?: string;
  /** How far the media is zoomed past the heading (background overscan). */
  fillScale?: number;
  /** How far the media slides under the letters as the pointer moves, in px. */
  parallax?: number;
  /** Amplitude of the slow idle motion, in px. 0 holds the media still. */
  drift?: number;
  brightness?: number;
  saturation?: number;
  grayscale?: boolean;
  /** Entrance style: words rise into place, a wipe sweeps across, or the whole block fades up. */
  reveal?: "rise" | "wipe" | "fade" | "none";
  /** When the entrance runs. */
  trigger?: "view" | "mount" | "hover";
  /** Entrance duration, in seconds. */
  duration?: number;
  /** Delay between words, in seconds. Used by the rise reveal. */
  stagger?: number;
  align?: "left" | "center" | "right";
  weight?: number;
  /** Letter spacing, in em. */
  tracking?: number;
  lineHeight?: number;
  /** Type size as a fraction of the container width, so the heading stays responsive. */
  textScale?: number;
  /** Vertical focal point of the media fill — 0 top, 1 bottom (default 0.5). */
  focalY?: number;
  className?: string;
  style?: React.CSSProperties;
}

const MaskedHeading = ({
  text = "Designed in the details",
  tag = "h2",
  mediaType = "image",
  src = "",
  images,
  interval = 5000,
  poster = "",
  fillScale = 1.25,
  parallax = 26,
  drift = 18,
  brightness = 1,
  saturation = 1,
  grayscale = false,
  reveal = "rise",
  duration = 1.1,
  stagger = 0.09,
  trigger = "view",
  align = "center",
  weight = 700,
  tracking = -0.03,
  lineHeight = 1.06,
  textScale = 0.115,
  focalY = 0.5,
  className = "",
  style,
  ...rest
}: MaskedHeadingProps) => {
  const rootRef = useRef<HTMLElement | null>(null);
  const measureRef = useRef<HTMLSpanElement | null>(null);
  const layerRef = useRef<HTMLSpanElement | null>(null);
  const wordRefsA = useRef<(HTMLSpanElement | null)[]>([]);
  const wordRefsB = useRef<(HTMLSpanElement | null)[]>([]);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const rafRef = useRef(0);
  const offset = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const clock = useRef(0);
  const natural = useRef({ w: 0, h: 0 });

  const imageList = useMemo(() => {
    if (images && images.length > 0) return images;
    if (src) return [src];
    return [];
  }, [images, src]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const [currentLayer, setCurrentLayer] = useState<"A" | "B">("A");
  const [srcA, setSrcA] = useState<string>(() => imageList[0] || src);
  const [srcB, setSrcB] = useState<string>(() => (imageList.length > 1 ? imageList[1] : imageList[0] || src));
  const activeIndexRef = useRef(0);

  /* Preload all images in the list */
  useEffect(() => {
    if (!imageList || imageList.length <= 1) return;
    imageList.forEach((url) => {
      const img = new Image();
      img.src = url;
    });
  }, [imageList]);

  /* Auto-cycle images every interval (default 5000ms = 5 sec) */
  useEffect(() => {
    if (imageList.length <= 1) return;

    const timer = setInterval(() => {
      const nextIndex = (activeIndexRef.current + 1) % imageList.length;
      activeIndexRef.current = nextIndex;
      const nextSrc = imageList[nextIndex];

      setCurrentLayer((prev) => {
        if (prev === "A") {
          setSrcB(nextSrc);
          return "B";
        } else {
          setSrcA(nextSrc);
          return "A";
        }
      });
    }, interval);

    return () => clearInterval(timer);
  }, [imageList, interval]);

  const words = useMemo(
    () => String(text).split(/\s+/).filter(Boolean),
    [text]
  );

  const settings = useRef<Record<string, number | boolean>>({
    fillScale,
    parallax,
    drift,
    brightness,
    saturation,
    grayscale,
    textScale,
    focalY,
  });
  useEffect(() => {
    settings.current = {
      fillScale,
      parallax,
      drift,
      brightness,
      saturation,
      grayscale,
      textScale,
      focalY,
    };
  });

  /** Paint one word's background slice so all slices join into one image.
     The image is scaled to COVER the heading box (like object-fit: cover
     on a full-size media layer), overscanned by fillScale. */
  const paintWords = useCallback(() => {
    const root = rootRef.current;
    const s = settings.current;
    if (!root) return;
    const W = Math.max(1, root.clientWidth);
    const H = Math.max(1, root.clientHeight);
    const fs = Number(s.fillScale) || 1;
    const off = offset.current;
    /* Only attach a filter when it actually differs — a constant filter
       promotes the background-clip:text words onto composited layers and
       rasterizes the letter masks with banding artifacts. */
    const needsFilter =
      Number(s.brightness) !== 1 || Number(s.saturation) !== 1 || Boolean(s.grayscale);
    const filter = needsFilter
      ? `brightness(${s.brightness}) saturate(${s.saturation})${s.grayscale ? " grayscale(1)" : ""}`
      : "";

    /* cover-scale using natural image size when known; until then fall
       back to a wide flat paint so something sensible shows immediately */
    const iw = natural.current.w || W;
    const ih = natural.current.h || H * 4;
    const scale = Math.max(W / iw, H / ih) * fs;
    const bw = iw * scale;
    const bh = ih * scale;
    const bx = (W - bw) / 2 - off.x;
    const by = -(bh - H) * (Number(s.focalY) || 0.5) - off.y;

    for (let i = 0; i < words.length; i += 1) {
      const elA = wordRefsA.current[i];
      if (elA) {
        elA.style.backgroundImage = mediaType === "video" ? "none" : `url(${srcA})`;
        elA.style.backgroundSize = `${bw.toFixed(1)}px ${bh.toFixed(1)}px`;
        elA.style.backgroundPosition = `${(bx - elA.offsetLeft).toFixed(1)}px ${(by - elA.offsetTop).toFixed(1)}px`;
        elA.style.filter = filter;
      }
      const elB = wordRefsB.current[i];
      if (elB) {
        elB.style.backgroundImage = mediaType === "video" ? "none" : `url(${srcB})`;
        elB.style.backgroundSize = `${bw.toFixed(1)}px ${bh.toFixed(1)}px`;
        elB.style.backgroundPosition = `${(bx - elB.offsetLeft).toFixed(1)}px ${(by - elB.offsetTop).toFixed(1)}px`;
        elB.style.filter = filter;
      }
    }
  }, [mediaType, srcA, srcB, words.length]);

  const sync = useCallback(() => {
    const root = rootRef.current;
    const measure = measureRef.current;
    if (!root || !measure) return;
    const s = settings.current;
    root.style.fontSize = `${clamp(root.clientWidth * Number(s.textScale), 20, 200).toFixed(1)}px`;
    paintWords();
  }, [paintWords]);

  /* Pointer parallax + idle drift on a single rAF loop. */
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(root);
    if (document.fonts?.ready) document.fonts.ready.then(sync).catch(() => {});

    let last = performance.now();
    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      clock.current += dt;
      const s = settings.current;
      const d = Number(s.drift);

      const dx = Math.sin(clock.current * 0.21) * d;
      const dy = Math.cos(clock.current * 0.17) * d * 0.6;

      const ease = 1 - Math.exp(-dt / 0.18);
      offset.current.x += (offset.current.tx + dx - offset.current.x) * ease;
      offset.current.y += (offset.current.ty + dy - offset.current.y) * ease;

      paintWords();
      rafRef.current = requestAnimationFrame(frame);
    };
    rafRef.current = requestAnimationFrame(frame);

    const onMove = (e: PointerEvent) => {
      const s = settings.current;
      const p = Number(s.parallax);
      if (p <= 0 || !root) return;
      const r = root.getBoundingClientRect();
      const nx = ((e.clientX - r.left) / (r.width || 1)) * 2 - 1;
      const ny = ((e.clientY - r.top) / (r.height || 1)) * 2 - 1;
      offset.current.tx = clamp(nx, -1, 1) * -p;
      offset.current.ty = clamp(ny, -1, 1) * -p;
    };
    const onLeave = () => {
      offset.current.tx = 0;
      offset.current.ty = 0;
    };

    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
    };
  }, [sync, paintWords]);

  useEffect(() => {
    sync();
  }, [sync, words, tag, align, weight, tracking, lineHeight, textScale, focalY]);

  /* Load the media's natural size so the cover math is exact. */
  useEffect(() => {
    const activeSrc = currentLayer === "A" ? srcA : srcB;
    if (mediaType !== "image" || !activeSrc) return;
    let cancelled = false;
    const img = new Image();
    img.onload = () => {
      if (cancelled) return;
      natural.current = { w: img.naturalWidth || 0, h: img.naturalHeight || 0 };
      paintWords();
    };
    img.src = activeSrc;
    return () => {
      cancelled = true;
    };
  }, [srcA, srcB, currentLayer, mediaType, paintWords]);

  /* Entrance animation — GSAP on the word spans (rise/wipe/fade). */
  useEffect(() => {
    const root = rootRef.current;
    const layer = layerRef.current;
    if (!root || !layer) return;
    const targets = [...wordRefsA.current, ...wordRefsB.current].filter(Boolean) as HTMLSpanElement[];
    if (!targets.length) return;

    const riseDistance = () =>
      (parseFloat(window.getComputedStyle(root).fontSize) || 48) * 1.15;

    const settle = () => {
      gsap.set(targets, { y: 0, opacity: 1 });
      gsap.set(layer, { opacity: 1, scale: 1, clipPath: "inset(0% 0% 0% 0%)" });
    };

    const rest = () => {
      if (reveal === "rise") {
        gsap.set(targets, { y: riseDistance(), opacity: 0.001 });
      } else if (reveal === "wipe") {
        gsap.set(layer, { clipPath: "inset(0% 100% 0% 0%)" });
      } else if (reveal === "fade") {
        gsap.set(layer, { opacity: 0, scale: 1.08 });
      }
    };

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reveal === "none" || reduce) {
      settle();
      return;
    }

    const play = () => {
      tweenRef.current?.kill();
      if (reveal === "rise") {
        gsap.set(layer, { opacity: 1, scale: 1, clipPath: "inset(0% 0% 0% 0%)" });
        tweenRef.current = gsap.fromTo(
          targets,
          { y: riseDistance(), opacity: 0.001 },
          {
            y: 0,
            opacity: 1,
            duration,
            stagger,
            ease: "power4.out",
            overwrite: "auto",
            /* drop the layer promotion when done — background-clip:text
               rasterizes with banding while a transform/opacity layer exists */
            clearProps: "transform,opacity",
          }
        );
      } else if (reveal === "wipe") {
        gsap.set(targets, { y: 0, opacity: 1 });
        const state = { p: 100 };
        tweenRef.current = gsap.to(state, {
          p: 0,
          duration,
          ease: "power3.inOut",
          overwrite: "auto",
          onUpdate: () => {
            layer.style.clipPath = `inset(0% ${state.p}% 0% 0%)`;
          },
        });
      } else {
        gsap.set(targets, { y: 0, opacity: 1 });
        tweenRef.current = gsap.fromTo(
          layer,
          { opacity: 0, scale: 1.08 },
          { opacity: 1, scale: 1, duration, ease: "power3.out", overwrite: "auto" }
        );
      }
    };

    if (trigger === "hover") {
      settle();
      root.addEventListener("pointerenter", play);
      return () => {
        root.removeEventListener("pointerenter", play);
        tweenRef.current?.kill();
      };
    }

    if (trigger === "view") {
      settle();
      rest();
      const io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            play();
            io.disconnect();
          }
        },
        { threshold: 0.25 }
      );
      io.observe(root);
      return () => {
        io.disconnect();
        tweenRef.current?.kill();
      };
    }

    play();
    return () => tweenRef.current?.kill();
  }, [reveal, trigger, duration, stagger, words]);

  const Tag = tag;

  return (
    <Tag
      ref={rootRef as any}
      suppressHydrationWarning
      className={`masked-heading ${mediaType === "video" ? "masked-heading--video" : ""} ${className}`.trim()}
      style={{
        textAlign: align,
        fontWeight: weight,
        letterSpacing: `${tracking}em`,
        lineHeight,
        ...style,
      }}
      {...rest}
    >
      {/* Accessible copy for AT + the transparent measure layer for layout */}
      <span className="sr-only">{text}</span>
      <span ref={measureRef} className="masked-heading__measure" aria-hidden="true">
        {words.map((word, i) => (
          <span key={`${word}-${i}`} className="masked-heading__word">
            {word}
          </span>
        ))}
      </span>

      {/* Filled layer — words with background-clip:text + GSAP entrance */}
      <span ref={layerRef} className="masked-heading__reveal" aria-hidden="true">
        <span className="masked-heading__clip">
          <span className="masked-heading__media">
            {mediaType === "video" ? (
              <video
                className="masked-heading__source"
                src={src}
                poster={poster}
                autoPlay
                muted
                loop
                playsInline
              />
            ) : null}
            <span
              className="masked-heading__ghost transition-opacity duration-1000 ease-in-out"
              style={{
                opacity: currentLayer === "A" ? 1 : 0,
              }}
            >
              {words.map((word, i) => (
                <span
                  key={`a-${word}-${i}`}
                  ref={(el) => {
                    wordRefsA.current[i] = el;
                  }}
                  className="masked-heading__fill"
                >
                  {word}{" "}
                </span>
              ))}
            </span>

            {mounted && imageList.length > 1 && (
              <span
                className="masked-heading__ghost transition-opacity duration-1000 ease-in-out"
                style={{
                  opacity: currentLayer === "B" ? 1 : 0,
                }}
              >
                {words.map((word, i) => (
                  <span
                    key={`b-${word}-${i}`}
                    ref={(el) => {
                      wordRefsB.current[i] = el;
                    }}
                    className="masked-heading__fill"
                  >
                    {word}{" "}
                  </span>
                ))}
              </span>
            )}
          </span>
        </span>
      </span>
    </Tag>
  );
};

export default MaskedHeading;
