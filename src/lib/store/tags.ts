import { getAllTags } from "@/api/request/tags";
import type { Tag } from "@/api/dto/tag";

type TagsState = {
  tags: Tag[];
  loading: boolean;
  error: string | null;
};

let state: TagsState = {
  tags: [],
  loading: false,
  error: null,
};

let hasFetched = false;
const listeners = new Set<() => void>();

function setState(partial: Partial<TagsState>) {
  state = { ...state, ...partial };
  listeners.forEach((listener) => listener());
}

export function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getSnapshot(): TagsState {
  return state;
}

export async function fetchTags() {
  setState({ loading: true, error: null });
  try {
    const res = await getAllTags();
    setState({ tags: res.tags, loading: false });
  } catch (err) {
    setState({
      loading: false,
      error: err instanceof Error ? err.message : "Failed to load tags",
    });
  }
}

export function ensureTagsLoaded() {
  if (!hasFetched) {
    hasFetched = true;
    fetchTags();
  }
}

export function invalidateTags() {
  return fetchTags();
}
