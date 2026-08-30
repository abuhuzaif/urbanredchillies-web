"use client";

import { Announcement } from "../../lib/live-menu";

function styleFontWeight(fontStyle: string): number {
  return fontStyle.includes("bold") ? 700 : 400;
}

function styleFontStyle(fontStyle: string): "italic" | "normal" {
  return fontStyle.includes("italic") ? "italic" : "normal";
}

function styleLetterSpacing(fontStyle: string): number {
  return fontStyle === "spaced" ? 2 : 0;
}

export default function AnnouncementBanner({
  announcement,
}: {
  announcement: Announcement | null;
}) {
  if (!announcement || !announcement.isActive || !announcement.message) {
    return null;
  }

  const { message, textColor, fontStyle } = announcement;

  return (
    <div
      style={{
        width: "100%",
        background: "#000",
        overflow: "hidden",
        height: 36,
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "inline-block",
          whiteSpace: "nowrap",
          animation: "redchillies-marquee 12s linear infinite",
          color: textColor,
          fontSize: 14,
          fontWeight: styleFontWeight(fontStyle),
          fontStyle: styleFontStyle(fontStyle),
          letterSpacing: styleLetterSpacing(fontStyle),
        }}
      >
        {message}
      </div>
      <style jsx>{`
                @keyframes redchillies-marquee {
          0% {
            transform: translateX(100vw);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  );
}
