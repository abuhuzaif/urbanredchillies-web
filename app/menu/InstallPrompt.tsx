"use client";

import { useEffect, useState } from "react";
import styles from "./InstallPrompt.module.css";

// Chrome / Edge / Samsung Internet fire this when the site can be installed.
type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

const DISMISS_KEY = "urc_install_dismissed_at";
const DISMISS_DAYS = 3;

function isInstalled(): boolean {
  const nav = navigator as Navigator & { standalone?: boolean };
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    nav.standalone === true
  );
}

function isIos(): boolean {
  const ua = navigator.userAgent;
  return (
    /iPad|iPhone|iPod/.test(ua) ||
    // iPadOS reports itself as a Mac
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
  );
}

function recentlyDismissed(): boolean {
  try {
    const at = Number(localStorage.getItem(DISMISS_KEY));
    return at > 0 && Date.now() - at < DISMISS_DAYS * 24 * 60 * 60 * 1000;
  } catch {
    return false;
  }
}

export default function InstallPrompt() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [showIos, setShowIos] = useState(false);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    // Register the (non-caching) service worker so the menu is installable.
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }

    // Already installed, or the customer closed the banner recently.
    if (isInstalled() || recentlyDismissed()) return;

    setHidden(false);
    if (isIos()) setShowIos(true);

    const onBeforeInstall = (e: Event) => {
      e.preventDefault(); // keep it so we can trigger it from our own button
      setDeferred(e as BeforeInstallPromptEvent);
    };
    const onInstalled = () => {
      setDeferred(null);
      setHidden(true);
    };

    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstall);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  function dismiss() {
    try {
      localStorage.setItem(DISMISS_KEY, String(Date.now()));
    } catch {}
    setHidden(true);
  }

  async function install() {
    if (!deferred) return;
    await deferred.prompt();
    const choice = await deferred.userChoice;
    setDeferred(null);
    if (choice.outcome === "accepted") setHidden(true);
  }

  if (hidden) return null;

  // Android / desktop Chrome: real install button.
  if (deferred) {
    return (
      <div className={styles.banner} role="region" aria-label="Install app">
        <div className={styles.text}>
          <span className={styles.title}>Install our menu app</span>
          Add Urban Red Chillies to your home screen.
          <span className={styles.ar} dir="rtl">
            أضف قائمة الطعام إلى شاشتك الرئيسية
          </span>
        </div>
        <button className={styles.installBtn} onClick={install}>
          Install
        </button>
        <button className={styles.close} onClick={dismiss} aria-label="Close">
          ✕
        </button>
      </div>
    );
  }

  // iPhone / iPad: Apple has no install button, so show the steps.
  if (showIos) {
    return (
      <div className={styles.banner} role="region" aria-label="Install app">
        <div className={styles.text}>
          <span className={styles.title}>Add our menu to your home screen</span>
          Tap the <strong>Share</strong> button{" "}
          <span className={styles.shareIcon} aria-hidden="true">
            ⬆︎
          </span>{" "}
          then <strong>“Add to Home Screen”</strong>.
          <span className={styles.ar} dir="rtl">
            اضغط على «مشاركة» ثم «إضافة إلى الشاشة الرئيسية»
          </span>
        </div>
        <button className={styles.close} onClick={dismiss} aria-label="Close">
          ✕
        </button>
      </div>
    );
  }

  return null;
}
