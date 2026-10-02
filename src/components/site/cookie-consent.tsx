"use client";

import { useEffect, useState } from "react";
import { Cookie, ShieldCheck, Settings, Check, X, Info, Lock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

export interface CookieConsentPreferences {
  essential: boolean; // Always true
  analytics: boolean;
  functional: boolean;
  marketing: boolean;
  timestamp: string;
  version: number;
}

const COOKIE_STORAGE_KEY = "abw_cookie_consent_v1";
const CURRENT_VERSION = 1;

export function getStoredConsent(): CookieConsentPreferences | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(COOKIE_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CookieConsentPreferences;
    return parsed;
  } catch {
    return null;
  }
}

export function saveConsent(prefs: Omit<CookieConsentPreferences, "timestamp" | "version">): CookieConsentPreferences {
  const full: CookieConsentPreferences = {
    ...prefs,
    essential: true, // Always enforced
    timestamp: new Date().toISOString(),
    version: CURRENT_VERSION,
  };
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(COOKIE_STORAGE_KEY, JSON.stringify(full));
      window.dispatchEvent(new CustomEvent("abw:cookie-consent-updated", { detail: full }));
    } catch (e) {
      console.warn("[CookieConsent] Could not save preferences to localStorage:", e);
    }
  }
  return full;
}

export function openCookiePreferencesModal() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("abw:open-cookie-settings"));
  }
}

export function CookieConsent() {
  const { toast } = useToast();
  const [mounted, setMounted] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Preference Toggles state
  const [analytics, setAnalytics] = useState(true);
  const [functional, setFunctional] = useState(true);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    setMounted(true);
    const existing = getStoredConsent();
    if (!existing) {
      // Show banner on first visit after short delay
      const timer = setTimeout(() => setShowBanner(true), 600);
      return () => clearTimeout(timer);
    } else {
      setAnalytics(existing.analytics);
      setFunctional(existing.functional);
      setMarketing(existing.marketing);
    }
  }, []);

  useEffect(() => {
    const handleOpenModal = () => {
      const existing = getStoredConsent();
      if (existing) {
        setAnalytics(existing.analytics);
        setFunctional(existing.functional);
        setMarketing(existing.marketing);
      }
      setShowModal(true);
    };

    window.addEventListener("abw:open-cookie-settings", handleOpenModal);
    return () => window.removeEventListener("abw:open-cookie-settings", handleOpenModal);
  }, []);

  if (!mounted) return null;

  const handleAcceptAll = () => {
    saveConsent({
      essential: true,
      analytics: true,
      functional: true,
      marketing: true,
    });
    setAnalytics(true);
    setFunctional(true);
    setMarketing(true);
    setShowBanner(false);
    setShowModal(false);
    toast({
      title: "All cookies accepted",
      description: "Your cookie preferences have been saved.",
    });
  };

  const handleDeclineOptional = () => {
    saveConsent({
      essential: true,
      analytics: false,
      functional: false,
      marketing: false,
    });
    setAnalytics(false);
    setFunctional(false);
    setMarketing(false);
    setShowBanner(false);
    setShowModal(false);
    toast({
      title: "Essential cookies only",
      description: "Optional analytics, functional, and marketing cookies have been declined.",
    });
  };

  const handleSaveCustom = () => {
    saveConsent({
      essential: true,
      analytics,
      functional,
      marketing,
    });
    setShowBanner(false);
    setShowModal(false);
    toast({
      title: "Preferences saved",
      description: "Your customized cookie consent choices have been saved.",
    });
  };

  return (
    <>
      {/* ================= Initial Cookie Banner (Blue & White Theme) ================= */}
      {showBanner && (
        <div
          role="region"
          aria-label="Cookie Privacy Banner"
          className="fixed bottom-0 inset-x-0 z-[95] p-4 sm:p-6 transition-all duration-500 animate-in slide-in-from-bottom-8"
        >
          <div className="mx-auto max-w-5xl border border-[#0f62fe]/30 bg-white/98 p-5 sm:p-6 text-[#161616] shadow-[0_8px_32px_rgba(15,98,254,0.12)] backdrop-blur-xl">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              {/* Left Column: Icon & Info */}
              <div className="flex items-start gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center border border-[#0f62fe]/30 bg-[#0f62fe]/10 text-[#0f62fe]">
                  <Cookie className="size-5.5" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <h2 className="text-base font-semibold text-[#161616] tracking-tight">
                      Cookie &amp; Privacy Choices
                    </h2>
                    <span className="inline-flex items-center gap-1 border border-emerald-600/40 bg-emerald-50 px-2 py-0.5 text-[11px] font-mono font-medium text-emerald-700">
                      <ShieldCheck className="size-3" />
                      DPDP Compliant
                    </span>
                  </div>
                  <p className="max-w-3xl text-xs sm:text-sm leading-relaxed text-[#525252]">
                    We use essential cookies to keep ABWcurious secure and functioning. With your permission, we also use optional analytics, functional, and media cookies to measure performance, power our AI assistant, and personalize your experience. Learn more in our{" "}
                    <a
                      href="/privacy#cookies"
                      className="text-[#0f62fe] font-medium underline underline-offset-2 hover:text-[#0043ce]"
                    >
                      Privacy Policy
                    </a>.
                  </p>
                </div>
              </div>

              {/* Right Column: 3 Action Buttons (Blue & White) */}
              <div className="flex flex-wrap items-center gap-2.5 shrink-0 pt-2 lg:pt-0">
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="inline-flex h-10 items-center justify-center gap-1.5 bg-[#0f62fe] px-5 text-xs font-medium text-white transition-colors hover:bg-[#0043ce] active:bg-[#002d9c] shadow-sm"
                >
                  <Check className="size-3.5" strokeWidth={2} />
                  <span>Accept All</span>
                </button>

                <button
                  type="button"
                  onClick={handleDeclineOptional}
                  className="inline-flex h-10 items-center justify-center gap-1.5 border border-[#161616]/20 bg-white px-4 text-xs font-medium text-[#161616] transition-colors hover:border-[#161616] hover:bg-slate-50"
                >
                  <X className="size-3.5" strokeWidth={2} />
                  <span>Essential Only</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowModal(true)}
                  className="inline-flex h-10 items-center justify-center gap-1.5 border border-[#0f62fe]/40 bg-[#0f62fe]/5 px-4 text-xs font-medium text-[#0f62fe] transition-colors hover:border-[#0f62fe] hover:bg-[#0f62fe]/15"
                >
                  <Settings className="size-3.5" strokeWidth={1.75} />
                  <span>Customize</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= Detailed Preferences Modal (Blue & White Theme) ================= */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-h-[90dvh] w-[calc(100vw-2rem)] max-w-2xl overflow-hidden rounded-none border border-[#0f62fe]/20 bg-white p-0 shadow-2xl">
          <div className="flex max-h-[90dvh] flex-col">
            {/* Header */}
            <DialogHeader className="border-b border-[#e0e0e0] bg-[#0f62fe]/[0.03] p-6 sm:p-7">
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center border border-[#0f62fe]/30 bg-[#0f62fe]/10 text-[#0f62fe]">
                  <Cookie className="size-5" strokeWidth={1.75} />
                </span>
                <div>
                  <DialogTitle className="text-xl font-normal text-[#161616]">
                    Cookie Preferences &amp; Category Settings
                  </DialogTitle>
                  <DialogDescription className="mt-1 text-xs text-[#525252]">
                    Manage how cookies and telemetry data are used across ABWcurious digital platforms.
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            {/* Scrollable Categories List */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-7 space-y-5">
              {/* Category 1: Essential */}
              <div className="border border-[#e0e0e0] bg-[#f4f4f4]/60 p-5 space-y-2.5">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2.5">
                    <Lock className="size-4 text-emerald-600 shrink-0" />
                    <h3 className="text-sm font-medium text-[#161616]">
                      1. Strictly Necessary &amp; Essential Cookies
                    </h3>
                  </div>
                  <span className="inline-flex items-center gap-1 border border-emerald-600/30 bg-emerald-50 px-2.5 py-0.5 text-[11px] font-mono font-medium text-emerald-700">
                    Always Active
                  </span>
                </div>
                <p className="text-xs leading-relaxed text-[#525252]">
                  Required for core website security, TLS encryption, CSRF protection, session integrity, layout state, and remembering your cookie privacy choices. These cannot be disabled.
                </p>
              </div>

              {/* Category 2: Analytics & Performance */}
              <div className="border border-[#e0e0e0] bg-white p-5 space-y-3 hover:border-[#0f62fe]/40 transition-colors">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-[#161616]">
                      2. Analytics &amp; Performance Cookies
                    </h3>
                    <p className="text-xs text-[#8d8d8d] mt-0.5">
                      Anonymized usage statistics and telemetry
                    </p>
                  </div>
                  <Switch
                    checked={analytics}
                    onCheckedChange={setAnalytics}
                    aria-label="Toggle Analytics and Performance Cookies"
                  />
                </div>
                <p className="text-xs leading-relaxed text-[#525252]">
                  Helps us understand how visitors interact with ABWcurious pages (e.g. page views, load speed, error diagnostics). All data collected is aggregated and anonymized without individual profiling.
                </p>
              </div>

              {/* Category 3: Functional & Experience */}
              <div className="border border-[#e0e0e0] bg-white p-5 space-y-3 hover:border-[#0f62fe]/40 transition-colors">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-[#161616]">
                      3. Functional &amp; Experience Cookies
                    </h3>
                    <p className="text-xs text-[#8d8d8d] mt-0.5">
                      AI Assistant chat memory &amp; state preferences
                    </p>
                  </div>
                  <Switch
                    checked={functional}
                    onCheckedChange={setFunctional}
                    aria-label="Toggle Functional and Experience Cookies"
                  />
                </div>
                <p className="text-xs leading-relaxed text-[#525252]">
                  Remembers your functional choices across sessions, such as AI Chat Assistant conversation history, contact form auto-save drafts, and location display preferences.
                </p>
              </div>

              {/* Category 4: Marketing & Media */}
              <div className="border border-[#e0e0e0] bg-white p-5 space-y-3 hover:border-[#0f62fe]/40 transition-colors">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-[#161616]">
                      4. Marketing &amp; Media Telemetry Cookies
                    </h3>
                    <p className="text-xs text-[#8d8d8d] mt-0.5">
                      Showcase video performance &amp; campaign metrics
                    </p>
                  </div>
                  <Switch
                    checked={marketing}
                    onCheckedChange={setMarketing}
                    aria-label="Toggle Marketing and Media Telemetry Cookies"
                  />
                </div>
                <p className="text-xs leading-relaxed text-[#525252]">
                  Used to measure engagement on video showcases (such as our Motion Graphic section) and embedded external media content. ABWcurious does not engage in third-party behavioral advertising sales.
                </p>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="border-t border-[#e0e0e0] bg-[#f4f4f4] p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleDeclineOptional}
                  className="w-full sm:w-auto inline-flex h-10 items-center justify-center border border-[#161616]/20 bg-white px-4 text-xs font-medium text-[#161616] transition-colors hover:bg-slate-50"
                >
                  Essential Only
                </button>
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="w-full sm:w-auto inline-flex h-10 items-center justify-center border border-[#0f62fe]/40 bg-[#0f62fe]/10 px-4 text-xs font-medium text-[#0f62fe] transition-colors hover:bg-[#0f62fe]/20"
                >
                  Accept All
                </button>
              </div>

              <button
                type="button"
                onClick={handleSaveCustom}
                className="w-full sm:w-auto inline-flex h-10 items-center justify-center gap-2 bg-[#0f62fe] px-6 text-xs font-medium text-white transition-colors hover:bg-[#0043ce]"
              >
                <Check className="size-3.5" />
                <span>Save Preferences</span>
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Floating Small Re-open Badge (visible when banner is closed) */}
      {!showBanner && (
        <button
          type="button"
          onClick={() => setShowModal(true)}
          title="Manage Cookie Preferences"
          aria-label="Manage Cookie Preferences"
          className="focus-carbon fixed bottom-4 left-4 z-40 flex size-9 items-center justify-center border border-[#0f62fe]/30 bg-white text-[#0f62fe] shadow-[0_4px_16px_rgba(15,98,254,0.15)] transition-all duration-300 hover:scale-105 hover:bg-[#0f62fe] hover:text-white"
        >
          <Cookie className="size-4" />
        </button>
      )}
    </>
  );
}
