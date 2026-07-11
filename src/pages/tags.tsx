import { useBulkList } from "@/hooks/use-bulk-list";
import { useTags } from "@/hooks/use-tags";
import { DynamicBulkForm } from "@/components/common/dynamic-bulk-form";
import { createTagsBulk } from "@/api/request/tags";
import type { FieldConfig } from "@/types/field-config";
import { Typography } from "@/components/common/typography";
import { useEffect } from "react";

type TagFormItem = {
  id: string;
  name: string;
};

function createEmptyTag(): TagFormItem {
  return { id: crypto.randomUUID(), name: "" };
}

const fields: FieldConfig<TagFormItem>[] = [
  { type: "text", key: "name", label: "Tag name", placeholder: "Tag name" },
];

export default function Tags() {
  const { items, add, remove, update, reset } = useBulkList(createEmptyTag);
  const { tags, loading, error, invalidate } = useTags();

  useEffect(() => {
    console.log("TAGS", tags);
  }, [tags]);

  async function handleSubmit() {
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

  return (
    <div className="flex gap-8">
      <div className="flex flex-col gap-4 max-w-sm">
        <Typography id="title" type="h2" text="Create Tags" />
        <DynamicBulkForm
          items={items}
          fields={fields}
          onAdd={add}
          onRemove={remove}
          onUpdate={update}
          onSubmit={handleSubmit}
          addLabel="Add Tag"
        />
      </div>

      <div className="flex flex-col gap-2 max-w-xs">
        <Typography id="existing-tags" type="h2" text="Existing Tags" />
        {loading && <Typography text="Loading..." type="muted" />}
        {error && <Typography text={error} type="error" />}
        {!loading && !error && tags && (
          <ul className="flex flex-col gap-1">
            {tags.map((tag) => (
              <li key={tag.ID} className="text-sm border-b pb-1">
                {tag.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
