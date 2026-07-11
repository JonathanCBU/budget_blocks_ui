import { apiPost } from "../api-client";
import type { CreateTagsBulkRequest, Tags } from "../dto/tag";

const TagBaseUrl = "tag/";

export function createTagsBulk(names: string[]) {
  const body: CreateTagsBulkRequest = {
    tags: names.map((name) => ({ name })),
  };

  return apiPost<CreateTagsBulkRequest, Tags>(`${TagBaseUrl}create-bulk`, body);
}

export function getAllTags() {
  return apiPost<Record<string, never>, Tags>(`${TagBaseUrl}get-all`, {});
}
