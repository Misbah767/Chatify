import { useEffect, RefObject } from "react";

export const useAutoScroll = (ref: RefObject<HTMLDivElement>, deps: any[]) => {
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, deps);
};
