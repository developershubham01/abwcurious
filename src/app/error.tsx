"use client";

import { useEffect } from "react";
import { AlertTriangle, Home, RotateCcw } from "lucide-react";

/**
 * Carbon-styled error boundary for the app segment.
 * The root layout (header/footer) still renders around this.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[app-error]", error);
  }, [error]);

  return (
    <main id="main" tabIndex={-1} className="flex-1 outline-none">
      <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden border-y border-hairline">
        <div className="absolute inset-0 bg-grid-fine opacity-60" aria-hidden="true" />
        <div
          className="absolute inset-0"
          aria-hidden="true"
          style={{
            background: "radial-gradient(ellipse 50% 60% at 50% 30%, rgba(15,98,254,0.10), transparent 60%)",
          }}
        />
        <div className="relative mx-auto max-w-lg px-6 py-20 text-center">
        <span className="mx-auto flex size-14 items-center justify-center border border-hairline-strong bg-card">
          <AlertTriangle className="size-6 text-ibm-bright" strokeWidth={1.5} aria-hidden="true" />
        </span>
        <p className="mt-6 font-mono text-xs uppercase tracking-[0.24em] text-ibm-soft">
          500 · Something broke
        </p>
        <h1 className="mt-4 text-4xl font-light leading-tight tracking-tight sm:text-5xl">
          A wire came{" "}
          <span className="text-ibm-bright">loose.</span>
        </h1>
        <p className="mt-4 text-muted-foreground">
          An unexpected error interrupted this page. Try again — if it keeps
          happening, write to{" "}
          <a
            href="mailto:hello@abwcurious.com"
            className="text-ibm-soft underline-offset-4 hover:underline focus-carbon"
          >
            hello@abwcurious.com
          </a>{" "}
          and a human will jump on it.
        </p>
        {error?.digest && (
          <p className="mt-3 font-mono text-[10px] text-muted-foreground">
            error ref: {error.digest}
          </p>
        )}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={reset}
            className="focus-carbon inline-flex h-11 items-center gap-2 bg-primary px-5 font-mono text-sm text-primary-foreground transition-colors hover:bg-ibm-blue-hover"
          >
            <RotateCcw className="size-4" strokeWidth={1.75} aria-hidden="true" />
            Try again
          </button>
          <a
            href="/#top"
            className="focus-carbon inline-flex h-11 items-center gap-2 border border-hairline-strong px-5 font-mono text-sm text-foreground transition-colors hover:border-ibm-bright hover:text-ibm-bright"
          >
            <Home className="size-4" strokeWidth={1.5} aria-hidden="true" />
            Back to home
          </a>
        </div>
      </div>
      </section>
    </main>
  );
}
