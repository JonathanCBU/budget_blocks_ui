import { apiPost } from "@/api/api-client";
import type {
  CreateItemDto,
  CreateItemsBulkRequest,
  CreateItemsBulkResponse,
} from "@/api/dto/item";

const ItemBaseUrl = "item/";

export function createItemsBulk(items: CreateItemDto[], tagId?: number) {
  const body: CreateItemsBulkRequest = { items, tag_id: tagId };
  return apiPost<CreateItemsBulkRequest, CreateItemsBulkResponse>(
    `${ItemBaseUrl}create-bulk`,
    body,
  );
}
