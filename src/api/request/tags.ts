import { apiPost } from "../api-client";
import type {
  CreateTagsBulkRequest,
  Tags,
  DeleteTagsBulkRequest,
  DeleteTagsBulkResponse,
  CreateTagRequest,
} from "../dto/tag";

const TagBaseUrl = "tag/";

export function createTagsBulk(tags: CreateTagRequest[]) {
  const body: CreateTagsBulkRequest = { tags };
  return apiPost<CreateTagsBulkRequest, Tags>(`${TagBaseUrl}create-bulk`, body);
}

export function getAllTags() {
  return apiPost<Record<string, never>, Tags>(`${TagBaseUrl}get-all`, {});
}

export function deleteTagsBulk(ids: number[]) {
  const body: DeleteTagsBulkRequest = { ids };
  return apiPost<DeleteTagsBulkRequest, DeleteTagsBulkResponse>(
    `${TagBaseUrl}delete-bulk`,
    body,
  );
}
