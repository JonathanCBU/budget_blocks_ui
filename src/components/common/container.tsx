import type { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  id?: string;
  gap?: number;
  direction?: "row" | "col";
  className?: string;
}

const GAP_CLASSES: Record<number, string> = {
  1: "gap-1",
  2: "gap-2",
  3: "gap-3",
  4: "gap-4",
  6: "gap-6",
  8: "gap-8",
};

const DIRECTION_CLASSES = {
  row: "flex-row",
  col: "flex-col",
};

export function Container({
  children,
  id,
  gap = 4,
  direction = "col",
  className,
}: PropsWithChildren<ContainerProps>) {
  return (
    <div
      id={id}
      className={cn(
        "flex",
        DIRECTION_CLASSES[direction],
        GAP_CLASSES[gap] ?? "gap-4",
        className,
      )}
    >
      {children}
    </div>
  );
}
