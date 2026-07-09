import { useReducer } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createTagsBulk } from "@/api/request/tags";

type TagField = {
  id: string;
  value: string;
};

type TagAction =
  | { type: "add" }
  | { type: "remove"; id: string }
  | { type: "update"; id: string; value: string };

function tagsReducer(state: TagField[], action: TagAction): TagField[] {
  switch (action.type) {
    case "add":
      return [...state, { id: crypto.randomUUID(), value: "" }];
    case "remove":
      return state.filter((tag) => tag.id !== action.id);
    case "update":
      return state.map((tag) =>
        tag.id === action.id ? { ...tag, value: action.value } : tag,
      );
    default:
      return state;
  }
}

export default function Tags() {
  const [tags, dispatch] = useReducer(tagsReducer, [
    { id: crypto.randomUUID(), value: "" },
  ]);

  async function handleSubmit() {
    const values = tags.map((tag) => tag.value.trim()).filter(Boolean);
    if (values.length === 0) return;

    try {
      await createTagsBulk(values);
    } catch (err) {
      console.error("Failed to create tags:", err);
    }
  }

  return (
    <div className="flex flex-col gap-4 max-w-sm">
      <h1 className="text-2xl font-bold">Tags</h1>

      <div className="flex flex-col gap-2">
        {tags.map((tag) => (
          <div key={tag.id} className="flex items-center gap-2">
            <Input
              placeholder="Tag name"
              value={tag.value}
              onChange={(e) =>
                dispatch({ type: "update", id: tag.id, value: e.target.value })
              }
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => dispatch({ type: "remove", id: tag.id })}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Remove tag</span>
            </Button>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" onClick={() => dispatch({ type: "add" })}>
          <Plus className="h-4 w-4" />
          Add Tag
        </Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </div>
    </div>
  );
}
