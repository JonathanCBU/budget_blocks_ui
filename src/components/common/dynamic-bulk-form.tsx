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
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

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

              if (field.type === "color") {
                return (
                  <div
                    key={String(field.key)}
                    className="flex items-center gap-2"
                  >
                    <input
                      type="color"
                      value={value || "#000000"}
                      onChange={(e) =>
                        onUpdate(item.id, field.key, e.target.value)
                      }
                      className="h-9 w-9 cursor-pointer rounded-md border p-0.5"
                      aria-label={field.label}
                    />
                    <span className="text-sm text-muted-foreground">
                      {value || "#000000"}
                    </span>
                  </div>
                );
              }

              if (field.type === "date") {
                const dateValue = value
                  ? new Date(value + "T00:00:00")
                  : undefined;

                return (
                  <Popover key={String(field.key)}>
                    <PopoverTrigger
                      render={
                        <Button
                          variant="outline"
                          className={cn(
                            "w-[180px] justify-start text-left font-normal",
                            !dateValue && "text-muted-foreground",
                          )}
                        />
                      }
                    >
                      <CalendarIcon className="h-4 w-4" />
                      {dateValue ? format(dateValue, "PPP") : field.label}
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={dateValue}
                        onSelect={(date) =>
                          onUpdate(
                            item.id,
                            field.key,
                            date ? format(date, "yyyy-MM-dd") : "",
                          )
                        }
                      />
                    </PopoverContent>
                  </Popover>
                );
              }

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
                  placeholder={field.placeholder ?? field.label}
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
