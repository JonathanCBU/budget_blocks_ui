import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { FieldConfig } from "@/types/field-config";
import { Container } from "./container";

type BaseItem = { id: string } & Record<string, unknown>;

type DynamicBulkFormProps<T extends BaseItem> = {
  items: T[];
  fields: FieldConfig<T>[];
  onAdd: () => void;
  onRemove: (id: string) => void;
  onUpdate: (id: string, key: keyof T, value: string) => void;
  onSubmit: () => void;
  addLabel?: string;
  submitLabel?: string;
  isSubmitting?: boolean;
};

export function DynamicBulkForm<T extends BaseItem>({
  items,
  fields,
  onAdd,
  onRemove,
  onUpdate,
  onSubmit,
  addLabel = "Add",
  submitLabel = "Submit",
  isSubmitting = false,
}: DynamicBulkFormProps<T>) {
  return (
    <Container gap={4}>
      <Container gap={3}>
        {items.map((item) => (
          <div key={item.id} className="flex items-end gap-2">
            {fields.map((field) => {
              const value = String(item[field.key] ?? "");

              if (field.type === "select") {
                return (
                  <Select
                    key={String(field.key)}
                    value={value}
                    onValueChange={(v) => onUpdate(item.id, field.key, v)}
                  >
                    <SelectTrigger className="w-[140px]">
                      <SelectValue
                        placeholder={field.placeholder ?? field.label}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {field.options.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                );
              }

              return (
                <Input
                  key={String(field.key)}
                  type={field.type}
                  placeholder={
                    field.type === "date"
                      ? undefined
                      : (field.placeholder ?? field.label)
                  }
                  value={value}
                  onChange={(e) => onUpdate(item.id, field.key, e.target.value)}
                />
              );
            })}

            <Button
              variant="ghost"
              size="icon"
              onClick={() => onRemove(item.id)}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Remove row</span>
            </Button>
          </div>
        ))}
      </Container>

      <Container gap={2}>
        <Button variant="outline" onClick={onAdd}>
          <Plus className="h-4 w-4" />
          {addLabel}
        </Button>
        <Button onClick={onSubmit} disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : submitLabel}
        </Button>
      </Container>
    </Container>
  );
}
