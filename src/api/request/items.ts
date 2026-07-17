import { apiPost } from "@/api/api-client";
import type {
  ItemsResponse,
  CreateItemDto,
  CreateItemsBulkRequest,
  GetItemsByDateRequest,
  GetItemsByTagAndOrDateRequest,
} from "@/api/dto/item";

const ItemBaseUrl = "item/";

export function createItemsBulk(items: CreateItemDto[], tagId?: number) {
  const body: CreateItemsBulkRequest = { items, tag_id: tagId };
  return apiPost<CreateItemsBulkRequest, ItemsResponse>(
    `${ItemBaseUrl}create-bulk`,
    body,
  );
}

export function getItemsByDate(startDate: string, endDate: string) {
  const body: GetItemsByDateRequest = {
    start_date: startDate,
    end_date: endDate,
  };
  return apiPost<GetItemsByDateRequest, ItemsResponse>(
    `${ItemBaseUrl}get-date`,
    body,
  );
}

export function getItemsByTagAndOrDate(
  startDate: string | null,
  endDate: string | null,
  tagIds: number[],
) {
  const body: GetItemsByTagAndOrDateRequest = {
    start_date: startDate ?? undefined,
    end_date: endDate ?? undefined,
    tag_ids: tagIds.length > 0 ? tagIds : undefined,
  };
  return apiPost<GetItemsByTagAndOrDateRequest, ItemsResponse>(
    `${ItemBaseUrl}get-tag-date`,
    body,
  );
}
