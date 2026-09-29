"use client";

import { create } from "zustand";

/**
 * Tiny cross-component store for two prefill flows into the contact form:
 * 1. "Discuss this service" — service cards / case files / pricing preset the
 *    form's service select (and can drop a starter line into the message).
 * 2. "Apply for this role" — careers section presets service to
 *    "Join the team" plus the role being applied for.
 *
 * NOTE: state values and their setter actions deliberately carry different
 * names (`presetService` vs `setPresetService`) — a duplicate key in the
 * store literal would silently shadow one or the other depending on the
 * compiler, which is exactly the kind of bug that shows up only at runtime.
 */
interface InquiryState {
  /** Service name selected upstream (services / pricing / case files). */
  presetService: string | null;
  /** Incremented on every preset so repeated clicks re-trigger the form effect. */
  presetNonce: number;
  /** Role title set by the careers section. */
  presetRole: string | null;
  /** Incremented on every role preset so repeated clicks re-trigger the form effect. */
  roleNonce: number;
  setPresetService: (service: string) => void;
  setPresetRole: (role: string) => void;
  clearPreset: () => void;
  clearPresetRole: () => void;
}

export const useInquiryStore = create<InquiryState>((set) => ({
  presetService: null,
  presetNonce: 0,
  presetRole: null,
  roleNonce: 0,
  setPresetService: (service) =>
    set((s) => ({ presetService: service, presetNonce: s.presetNonce + 1 })),
  setPresetRole: (role) =>
    set((s) => ({ presetRole: role, roleNonce: s.roleNonce + 1 })),
  clearPreset: () => set({ presetService: null }),
  clearPresetRole: () => set({ presetRole: null }),
}));
