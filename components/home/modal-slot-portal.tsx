"use client";

import { createPortal } from "react-dom";
import type { ReactNode } from "react";

interface ModalSlotPortalProps {
  children: ReactNode;
}

/**
 * Renders the modal slot content into document.body so it always appears on top
 * (avoids stacking context issues with parent layouts).
 */
export function ModalSlotPortal({ children }: ModalSlotPortalProps) {
  if (children == null) return null;
  if (typeof document === "undefined") return null;
  return createPortal(children, document.body);
}
