import { useEffect, useSyncExternalStore } from "react";
import {
  subscribe,
  getSnapshot,
  ensureTagsLoaded,
  invalidateTags,
} from "@/lib/store/tags";

export function useTags() {
  const state = useSyncExternalStore(subscribe, getSnapshot);

  useEffect(() => {
    ensureTagsLoaded();
  }, []);

  return { ...state, invalidate: invalidateTags };
}
