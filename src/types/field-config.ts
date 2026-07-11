export type FieldConfig<T> =
  | { type: "text"; key: keyof T; label: string; placeholder?: string }
  | { type: "number"; key: keyof T; label: string; placeholder?: string }
  | { type: "date"; key: keyof T; label: string }
  | {
      type: "select";
      key: keyof T;
      label: string;
      placeholder?: string;
      options: { value: string; label: string }[];
    };

