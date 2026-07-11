import { useReducer } from "react";

type ListAction<T> =
  | { type: "add" }
  | { type: "remove"; id: string }
  | { type: "update"; id: string; key: keyof T; value: string }
  | { type: "reset" };

function createReducer<T extends Record<string, unknown>>(
  createEmpty: () => T,
) {
  return function reducer(state: T[], action: ListAction<T>): T[] {
    switch (action.type) {
      case "add":
        return [...state, createEmpty()];
      case "remove":
        return state.filter((item) => item.id !== action.id);
      case "update":
        return state.map((item) =>
          item.id === action.id
            ? { ...item, [action.key]: action.value }
            : item,
        );
      case "reset":
        return [createEmpty()];
      default:
        return state;
    }
  };
}

export function useBulkList<T extends Record<string, unknown>>(
  createEmpty: () => T,
) {
  const [items, dispatch] = useReducer(createReducer(createEmpty), [
    createEmpty(),
  ]);

  return {
    items,
    add: () => dispatch({ type: "add" }),
    remove: (id: string) => dispatch({ type: "remove", id }),
    update: (id: string, key: keyof T, value: string) =>
      dispatch({ type: "update", id, key, value }),
    reset: () => dispatch({ type: "reset" }),
  };
}
