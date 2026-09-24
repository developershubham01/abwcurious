"use client";

import { create } from "zustand";

/**
 * Tiny cross-component store for the "Discuss this service" flow:
 * clicking a service card presets the contact form's service select
 * (and drops a starter line into the message) before scrolling to #contact.
 */
interface InquiryState {
  /** Service name selected upstream (services / pricing / case files). */
  presetService: string | null;
  /** Incremented on every preset so repeated clicks re-trigger the form effect. */
  presetNonce: number;
  presetService: (service: string) => void;
  clearPreset: () => void;
}

export const useInquiryStore = create<InquiryState>((set) => ({
  presetService: null,
  presetNonce: 0,
  presetService: (service) =>
    set((s) => ({ presetService: service, presetNonce: s.presetNonce + 1 })),
  clearPreset: () => set({ presetService: null }),
}));
