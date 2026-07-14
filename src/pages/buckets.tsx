import { useState } from "react";
import { useBulkList } from "@/hooks/use-bulk-list";
import { useTags } from "@/hooks/use-tags";
import { DynamicBulkForm } from "@/components/common/dynamic-bulk-form";
import { Container } from "@/components/common/container";
import { Typography } from "@/components/common/typography";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createItemsBulk } from "@/api/request/items";
import { ApiError } from "@/api/api-client";
import type { FieldConfig } from "@/types/field-config";

type BucketItemForm = {
  id: string;
  name: string;
  value_c: string;
  date: string;
  desc: string;
  notes: string;
};

function createEmptyItem(): BucketItemForm {
  return {
    id: crypto.randomUUID(),
    name: "",
    value_c: "",
    date: "",
    desc: "",
    notes: "",
  };
}

const fields: FieldConfig<BucketItemForm>[] = [
  { type: "text", key: "name", label: "Name", placeholder: "Item name" },
  { type: "number", key: "value_c", label: "Value", placeholder: "Value ($)" },
  { type: "date", key: "date", label: "Date" },
  {
    type: "text",
    key: "desc",
    label: "Description",
    placeholder: "Description",
  },
  { type: "text", key: "notes", label: "Notes", placeholder: "Notes" },
];

export default function Buckets() {
  const { items, add, remove, update, reset } = useBulkList(createEmptyItem);
  const { tags, loading: tagsLoading, error: tagsError } = useTags();

  const [selectedTagId, setSelectedTagId] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [createdCount, setCreatedCount] = useState<number | null>(null);

  const selectedTag = tags.find((tag) => String(tag.ID) === selectedTagId);

  async function handleSubmit() {
    setSubmitError(null);

    if (!selectedTagId) {
      setSubmitError("Choose a tag for this bucket before submitting.");
      return;
    }

    const payload = items
      .filter((item) => item.name.trim() && item.value_c)
      .map((item) => ({
        name: item.name.trim(),
        value_c: Math.round(Number(item.value_c) * 100),
        date: item.date || undefined,
        desc: item.desc.trim() || undefined,
        notes: item.notes.trim() || undefined,
      }));

    if (payload.length === 0) {
      setSubmitError("Add at least one item with a name and value.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await createItemsBulk(payload, Number(selectedTagId));
      setCreatedCount(res.items.length);
      reset();
    } catch (err) {
      setSubmitError(
        err instanceof ApiError ? err.message : "Failed to create items",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-svh w-full flex-col p-8">
      <Container gap={6} className="w-full">
        <Typography type="h1" text="Create Bucket" />

        <Container gap={2}>
          <Typography type="h4" text="Bucket Tag" />
          {tagsLoading && <Typography type="muted" text="Loading tags..." />}
          {tagsError && <Typography type="error" text={tagsError} />}
          {!tagsLoading && !tagsError && (
            <Select value={selectedTagId} onValueChange={setSelectedTagId}>
              <SelectTrigger className="w-[240px]">
                <SelectValue placeholder="Select a tag" />
              </SelectTrigger>
              <SelectContent>
                {tags.map((tag) => (
                  <SelectItem key={tag.ID} value={String(tag.ID)}>
                    {tag.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          {selectedTag && (
            <Typography
              type="muted"
              text={`Adding items to: ${selectedTag.name}`}
            />
          )}
        </Container>

        <Container gap={2} className="w-full">
          <Typography type="h4" text="Items" />
          <DynamicBulkForm
            items={items}
            fields={fields}
            onAdd={add}
            onRemove={remove}
            onUpdate={update}
            onSubmit={handleSubmit}
            addLabel="Add Item"
            submitLabel="Create Bucket"
            isSubmitting={isSubmitting}
          />
        </Container>

        {submitError && <Typography type="error" text={submitError} />}
        {createdCount !== null && !submitError && (
          <Typography
            type="muted"
            text={`Created ${createdCount} item${createdCount === 1 ? "" : "s"}.`}
          />
        )}
      </Container>
    </div>
  );
}
