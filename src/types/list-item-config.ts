export type ListItemConfig<T> =
  | { type: "title"; key: keyof T; text: string }
  | { type: "body"; key: keyof T; text: string }
  | { type: "number"; key: keyof T; text: string; symbol?: string };
