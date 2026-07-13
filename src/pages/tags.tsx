import { useState } from "react";
import { useBulkList } from "@/hooks/use-bulk-list";
import { useTags } from "@/hooks/use-tags";
import { DynamicBulkForm } from "@/components/common/dynamic-bulk-form";
import { DynamicDeleteForm } from "@/components/common/dynamic-delete-form";
import { Container } from "@/components/common/container";
import { Typography } from "@/components/common/typography";
import { createTagsBulk, deleteTagsBulk } from "@/api/request/tags";
import { ApiError } from "@/api/api-client";
import type { FieldConfig } from "@/types/field-config";
import type { ListItemConfig } from "@/types/list-item-config";

type TagFormItem = {
  id: string;
  name: string;
};

type TagListItem = {
  id: string;
  name: string;
};

function createEmptyTag(): TagFormItem {
  return { id: crypto.randomUUID(), name: "" };
}

const createFields: FieldConfig<TagFormItem>[] = [
  { type: "text", key: "name", label: "Tag name", placeholder: "Tag name" },
];

const displayFields: ListItemConfig<TagListItem>[] = [{ key: "name" }];

export default function Tags() {
  const { items, add, remove, update, reset } = useBulkList(createEmptyTag);
  const { tags, loading, error, invalidate } = useTags();

  const [markedIds, setMarkedIds] = useState<Set<string>>(new Set());
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [lastDeletedCount, setLastDeletedCount] = useState<number | null>(null);

  async function handleCreate() {
    const names = items.map((item) => item.name.trim()).filter(Boolean);
    if (names.length === 0) return;

    try {
      await createTagsBulk(names);
      reset();
      invalidate();
    } catch (err) {
      console.error("Failed to create tags:", err);
    }
  }

  function toggleMark(id: string) {
    setMarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  async function handleDelete() {
    const idsToDelete = Array.from(markedIds).map(Number);
    if (idsToDelete.length === 0) return;

    setIsDeleting(true);
    setDeleteError(null);
    try {
      const res = await deleteTagsBulk(idsToDelete);
      setLastDeletedCount(res.deleted_count);
      setMarkedIds(new Set());
      invalidate();
    } catch (err) {
      setDeleteError(
        err instanceof ApiError ? err.message : "Failed to delete tags",
      );
    } finally {
      setIsDeleting(false);
    }
  }

  const listItems: TagListItem[] = tags.map((tag) => ({
    id: String(tag.ID),
    name: tag.name,
  }));

  return (
    <div className="flex min-h-svh w-full justify-center p-8">
      <Container
        direction="row"
        gap={8}
        className="w-full max-w-4xl items-start"
      >
        <Container gap={4} className="max-w-sm flex-1">
          <Typography type="h3" text="Add Tags" />
          <DynamicBulkForm
            items={items}
            fields={createFields}
            onAdd={add}
            onRemove={remove}
            onUpdate={update}
            onSubmit={handleCreate}
            addLabel="Add Tag"
          />
        </Container>

        <Container gap={2} className="max-w-md flex-1">
          <Typography type="h3" text="Existing Tags" />

          {loading && <Typography type="muted" text="Loading..." />}
          {error && <Typography type="error" text={error} />}

          {!loading && !error && (
            <DynamicDeleteForm
              items={listItems}
              fields={displayFields}
              markedIds={markedIds}
              onToggleMark={toggleMark}
              onSubmit={handleDelete}
              isSubmitting={isDeleting}
              columns={2}
            />
          )}

          {deleteError && <Typography type="error" text={deleteError} />}
          {lastDeletedCount !== null && !deleteError && (
            <Typography
              type="muted"
              text={`Deleted ${lastDeletedCount} tag${lastDeletedCount === 1 ? "" : "s"}.`}
            />
          )}
        </Container>
      </Container>
    </div>
  );
}
