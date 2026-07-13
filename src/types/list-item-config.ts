export type ListItemConfig<T> =
  | { type: "title"; key: keyof T }
  | { type: "body"; key: keyof T }
  | { type: "number"; key: keyof T; symbol?: string };
