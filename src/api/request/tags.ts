import { apiPost } from "../api-client";
import type { CreateTagsBulkRequest, Tags } from "../dto/tag";

export function createTagsBulk(names: string[]) {
  const body: CreateTagsBulkRequest = {
    tags: names.map((name) => ({ name })),
  };

  return apiPost<CreateTagsBulkRequest, Tags>(
    "/api/budget/tag/create-bulk",
    body,
  );
}
