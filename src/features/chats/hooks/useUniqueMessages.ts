import { useMemo } from "react";

export const useUniqueMessages = (messages: any[]) => {
  return useMemo(() => {
    const map = new Map<string, any>();

    messages?.forEach((m) => {
      if (!map.has(m._id)) map.set(m._id, m);
    });

    return Array.from(map.values());
  }, [messages]);
};
