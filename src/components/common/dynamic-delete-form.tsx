import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemTitle,
} from "@/components/ui/item";
import type { ListItemConfig } from "@/types/list-item-config";
import { Container } from "@/components/common/container";

type BaseItem = { id: string } & Record<string, unknown>;

type DynamicDeleteFormProps<T extends BaseItem> = {
  items: T[];
  fields: ListItemConfig<T>[];
  markedIds: Set<string>;
  onToggleMark: (id: string) => void;
  onSubmit: () => void;
  submitLabel?: string;
  isSubmitting?: boolean;
  columns?: 1 | 2 | 3;
};

const COLUMN_CLASSES = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
};

export function DynamicDeleteForm<T extends BaseItem>({
  items,
  fields,
  markedIds,
  onToggleMark,
  onSubmit,
  submitLabel = "Delete Selected",
  isSubmitting = false,
  columns = 2,
}: DynamicDeleteFormProps<T>) {
  const hasMarked = markedIds.size > 0;

  return (
    <Container gap={4}>
      <div
        className={`grid ${COLUMN_CLASSES[columns]} gap-2 max-h-96 overflow-y-auto rounded-md border p-3`}
      >
        {items.map((item) => {
          const isMarked = markedIds.has(item.id);
          const label = fields
            .map((field) => String(item[field.key] ?? ""))
            .join(" ");

          return (
            <Item key={item.id}>
              <ItemContent>
                <ItemTitle
                  className={
                    isMarked ? "line-through text-muted-foreground" : ""
                  }
                >
                  {label}
                </ItemTitle>
              </ItemContent>
              <ItemActions>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onToggleMark(item.id)}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Mark for deletion</span>
                </Button>
              </ItemActions>
            </Item>
          );
        })}
      </div>

      <Button
        variant="destructive"
        onClick={onSubmit}
        disabled={!hasMarked || isSubmitting}
      >
        {isSubmitting ? "Deleting..." : submitLabel}
      </Button>
    </Container>
  );
}
