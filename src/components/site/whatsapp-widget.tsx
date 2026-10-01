"use client";

import { useState } from "react";
import { X, Send } from "lucide-react";
import { COMPANY } from "@/data/company";

export function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const waNumber = COMPANY.phone.replace(/[^0-9]/g, "");
  const defaultMessage = encodeURIComponent(
    "Hello ABWcurious! I have a question regarding your IT services, solutions, and opportunities."
  );
  const waUrl = `https://wa.me/${waNumber}?text=${defaultMessage}`;

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-3 select-none">
      {/* Expanded Message Callout Card */}
      {isOpen && (
        <div className="w-80 overflow-hidden rounded-2xl bg-white border border-slate-200/80 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* WhatsApp Header */}
          <div className="bg-[#075E54] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-[#25D366] text-white shadow-md">
                <WhatsAppIcon className="w-5 h-5 fill-current" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#075E54]" />
              </div>
              <div>
                <h4 className="text-sm font-semibold leading-snug">ABWcurious Support</h4>
                <p className="text-[11px] text-emerald-100 opacity-90">Typically replies instantly</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/10"
              aria-label="Close WhatsApp window"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Preview Body */}
          <div className="p-4 bg-[#E5DDD5]/40 min-h-[120px] flex flex-col justify-end">
            <div className="bg-white rounded-2xl rounded-tl-xs p-3.5 shadow-sm text-xs text-slate-700 leading-relaxed border border-slate-200/60 max-w-[90%]">
              <p className="font-medium text-slate-900 mb-1">Hi there! 👋</p>
              How can we help you with custom software, IT solutions, or project inquiries today?
              <span className="block text-[10px] text-slate-400 text-right mt-1.5 font-mono">Just now</span>
            </div>
          </div>

          {/* Action Footer */}
          <div className="p-3 bg-white border-t border-slate-100">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 w-full py-2.5 px-4 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-semibold rounded-xl transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.98]"
            >
              <WhatsAppIcon className="w-4 h-4 fill-current" />
              <span>Start Chat on WhatsApp</span>
              <Send className="w-3.5 h-3.5 ml-0.5" />
            </a>
          </div>
        </div>
      )}

      {/* Floating Trigger Button & Pill */}
      <div className="flex items-center gap-3 group">
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with ABWcurious on WhatsApp"
          className="relative flex items-center justify-center w-13 h-13 rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_rgba(37,211,102,0.4)] hover:bg-[#20bd5a] hover:scale-108 active:scale-95 transition-all duration-200 group"
        >
          {/* Subtle Outer Ping Wave */}
          <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-ping pointer-events-none" />
          
          {/* Official WhatsApp Icon */}
          <WhatsAppIcon className="w-7 h-7 fill-current relative z-10 drop-shadow-sm" />
        </a>

        {/* Desktop Callout Pill */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="hidden sm:flex items-center gap-2.5 px-4 py-2.5 bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-full shadow-lg text-xs font-semibold text-slate-800 hover:text-[#25D366] hover:border-[#25D366]/40 transition-all duration-200 active:scale-97"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#25D366] animate-pulse" />
          <span>Need help? Chat on WhatsApp</span>
        </button>
      </div>
    </div>
  );
}

/**
 * Official FontAwesome Crisp WhatsApp Icon SVG
 */
export function WhatsAppIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 448 512"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3 18.6-68.1-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
    </svg>
  );
}

