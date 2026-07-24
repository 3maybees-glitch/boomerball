"use client";

import { useSyncExternalStore } from "react";
import { Download, Share, X } from "lucide-react";

const DISMISS_KEY = "bb-install-note-dismissed";
const OPEN_EVENT = "bb-open-install-note";

function subscribe(onChange: () => void) {
  window.addEventListener(OPEN_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(OPEN_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

function getDismissed() {
  try {
    return localStorage.getItem(DISMISS_KEY) === "1";
  } catch {
    return true;
  }
}

function getStandalone() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    ("standalone" in navigator &&
      Boolean((navigator as Navigator & { standalone?: boolean }).standalone))
  );
}

function getIsIOS() {
  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
  );
}

export function InstallNote() {
  const dismissed = useSyncExternalStore(subscribe, getDismissed, () => true);
  const standalone = useSyncExternalStore(subscribe, getStandalone, () => true);
  const isIOS = useSyncExternalStore(subscribe, getIsIOS, () => false);

  if (dismissed || standalone) return null;

  function dismiss() {
    try {
      localStorage.setItem(DISMISS_KEY, "1");
    } catch {
      // ignore
    }
    window.dispatchEvent(new Event(OPEN_EVENT));
  }

  return (
    <div className="install-note pointer-events-none fixed inset-x-0 bottom-0 z-[60] p-3 sm:p-4 print:hidden">
      <aside
        className="pointer-events-auto mx-auto flex max-w-md items-start gap-3 border border-cream/20 bg-ink px-4 py-3.5 text-cream shadow-[0_16px_40px_rgba(26,10,10,0.32)]"
        aria-label="Install Boomer Ball"
      >
        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center bg-crimson text-cream">
          <Download className="h-4 w-4" aria-hidden />
        </div>

        <div className="min-w-0 flex-1">
          <p className="font-display text-base font-bold uppercase tracking-wide">
            Install Boomer Ball
          </p>
          {isIOS ? (
            <p className="mt-1 flex items-start gap-1.5 text-sm leading-snug text-cream/70">
              <Share className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
              <span>
                Tap Share, then{" "}
                <strong className="font-semibold text-cream/90">
                  Add to Home Screen
                </strong>{" "}
                for a one-tap app icon.
              </span>
            </p>
          ) : (
            <p className="mt-1 text-sm leading-snug text-cream/70">
              Open the browser menu and choose{" "}
              <strong className="font-semibold text-cream/90">Install app</strong>{" "}
              for a one-tap home-screen icon.
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={dismiss}
          className="rounded-sm p-1.5 text-cream/50 transition hover:bg-cream/10 hover:text-cream"
          aria-label="Dismiss install note"
        >
          <X className="h-4 w-4" aria-hidden />
        </button>
      </aside>
    </div>
  );
}
