import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import type { ListItemConfig } from "@/types/list-item-config";

type BaseItem = { id: string } & Record<string, unknown>;

type DynamicDeleteFormProps<T extends BaseItem> = {
  items: T[];
  fields: ListItemConfig<T>[];
  onDelete: () => void;
  onRemove: (id: string) => void;
  deleteLabel?: string;
  isDeleting?: boolean;
};

export function DynamicBulkForm<T extends BaseItem>({
  items,
  fields,
  onDelete,
  onRemove,
  deleteLabel = "Delete",
  isDeleting = false,
}: DynamicDeleteFormProps<T>) {
  return null;
}
