"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { COMPANY } from "@/data/company";

export function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const waNumber = COMPANY.phone.replace(/[^0-9]/g, "");
  const defaultMessage = encodeURIComponent(
    "Hello ABWcurious! I have a question regarding your IT services, solutions, and career opportunities."
  );
  const waUrl = `https://wa.me/${waNumber}?text=${defaultMessage}`;

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-3">
      {/* Expanded Message Callout Bubble */}
      {isOpen && (
        <div className="w-72 bg-white border border-hairline shadow-2xl p-4 text-ink animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center justify-between border-b border-hairline pb-2.5 mb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#25D366] animate-pulse" />
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-ink">
                WhatsApp Assistant
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-ink-muted hover:text-ink transition-colors p-1"
              aria-label="Close message window"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-ink-muted leading-relaxed mb-3">
            Need help with custom software development, IT solutions, or career queries? Send us a direct message on WhatsApp!
          </p>

          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-mono font-semibold uppercase tracking-wider transition-colors shadow-sm"
          >
            <WhatsAppIcon className="w-4 h-4 fill-current" />
            Chat on WhatsApp
          </a>
        </div>
      )}

      {/* Floating Trigger Button */}
      <div className="flex items-center gap-2.5 group">
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with ABWcurious on WhatsApp"
          className="relative flex items-center justify-center w-12 h-12 rounded-full bg-[#25D366] text-white shadow-xl hover:bg-[#20bd5a] hover:scale-105 transition-all duration-200"
        >
          <WhatsAppIcon className="w-6 h-6 fill-current" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-primary border-2 border-white rounded-full" />
        </a>

        {/* Desktop Callout Pill */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="hidden sm:flex items-center gap-2 px-3.5 py-2 bg-white border border-hairline shadow-md text-xs font-mono font-medium text-ink hover:text-primary transition-colors"
        >
          <span className="w-2 h-2 rounded-full bg-[#25D366]" />
          <span>Need help? Chat on WhatsApp</span>
        </button>
      </div>
    </div>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c0-5.445 4.43-9.874 9.877-9.874 2.635 0 5.112 1.027 6.974 2.89a9.82 9.82 0 012.88 6.984c.001 5.447-4.428 9.877-9.87 9.877m0-18.067C6.065 3.719 1.25 8.534 1.25 14.536c0 2.112.6 4.12 1.733 5.864L1 23l4.735-1.242a11.234 11.234 0 005.312 1.34h.005c5.998 0 10.813-4.815 10.813-10.818 0-2.89-1.126-5.606-3.171-7.652a10.74 10.74 0 00-7.647-3.167" />
    </svg>
  );
}
