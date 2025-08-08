"use client";

import { useSettingsStore } from "@/lib/store/useSettingsStore";
import Head from "next/head";

export function FontLoader() {
  // This component subscribes to the fontLink in our settings store.
  const fontLink = useSettingsStore((state) => state.fontLink);

  // If a font link is provided, it renders the <link> tags into the document's head.
  // If the fontLink is cleared, this component renders nothing, effectively removing the font.
  return (
    <>
      {fontLink && (
        <>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link href={fontLink} rel="stylesheet" />
        </>
      )}
    </>
  );
}
