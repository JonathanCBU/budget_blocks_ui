import { useState } from "react";
import { useBulkList } from "@/hooks/use-bulk-list";
import { useTags } from "@/hooks/use-tags";
import { DynamicBulkForm } from "@/components/common/dynamic-bulk-form";
import { Container } from "@/components/common/container";
import { Typography } from "@/components/common/typography";
import { createItemsBulk } from "@/api/request/items";
import { ApiError } from "@/api/api-client";
import type { FieldConfig } from "@/types/field-config";

type TransactionForm = {
  id: string;
  name: string;
  value_c: string;
  tag_id: string;
  date: string;
  desc: string;
  notes: string;
};

function createEmptyTransaction(): TransactionForm {
  return {
    id: crypto.randomUUID(),
    name: "",
    value_c: "",
    tag_id: "",
    date: "",
    desc: "",
    notes: "",
  };
}

export default function Transactions() {
  const { items, add, remove, update, reset } = useBulkList(
    createEmptyTransaction,
  );
  const { tags, loading: tagsLoading, error: tagsError } = useTags();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [createdCount, setCreatedCount] = useState<number | null>(null);

  const fields: FieldConfig<TransactionForm>[] = [
    { type: "text", key: "name", label: "Name", placeholder: "Item name" },
    {
      type: "number",
      key: "value_c",
      label: "Value",
      placeholder: "Value ($)",
    },
    {
      type: "select",
      key: "tag_id",
      label: "Tag",
      placeholder: "Tag",
      options: tags.map((tag) => ({ value: String(tag.ID), label: tag.name })),
    },
    { type: "date", key: "date", label: "Date" },
    {
      type: "text",
      key: "desc",
      label: "Description",
      placeholder: "Description",
    },
    { type: "text", key: "notes", label: "Notes", placeholder: "Notes" },
  ];

  async function handleSubmit() {
    setSubmitError(null);

    const payload = items
      .filter((item) => item.name.trim() && item.value_c)
      .map((item) => ({
        name: item.name.trim(),
        value_c: Math.round(Number(item.value_c) * 100),
        tag_id: item.tag_id ? Number(item.tag_id) : undefined,
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
      const res = await createItemsBulk(payload);
      setCreatedCount(res.items.length);
      reset();
    } catch (err) {
      setSubmitError(
        err instanceof ApiError ? err.message : "Failed to create transactions",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-svh w-full flex-col p-8">
      <Container gap={6} className="w-full">
        <Typography type="h1" text="Transactions" />

        {tagsLoading && <Typography type="muted" text="Loading tags..." />}
        {tagsError && <Typography type="error" text={tagsError} />}

        <Container gap={2} className="w-full">
          <DynamicBulkForm
            items={items}
            fields={fields}
            onAdd={add}
            onRemove={remove}
            onUpdate={update}
            onSubmit={handleSubmit}
            addLabel="Add Transaction"
            submitLabel="Create Transactions"
            isSubmitting={isSubmitting}
          />
        </Container>

        {submitError && <Typography type="error" text={submitError} />}
        {createdCount !== null && !submitError && (
          <Typography
            type="muted"
            text={`Created ${createdCount} transaction${createdCount === 1 ? "" : "s"}.`}
          />
        )}
      </Container>
    </div>
  );
}
