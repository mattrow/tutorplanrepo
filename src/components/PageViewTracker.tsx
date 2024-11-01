"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { analytics } from "@/firebase/config";
import { logEvent } from "firebase/analytics";

export default function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (analytics) {
      const pagePath = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '');
      logEvent(analytics, "page_view", {
        page_title: document.title,
        page_location: window.location.href,
        page_path: pagePath,
      });
    }
  }, [pathname, searchParams]);

  return null;
} 