"use client";

import { useEffect, RefObject } from "react";

export const useAutoScroll = (
  ref: RefObject<HTMLDivElement | null>, // Accept null safely
  deps: any[]
) => {
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  }, deps);
};
