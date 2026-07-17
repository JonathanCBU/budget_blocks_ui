export type CreateItemDto = {
  tag_id?: number;
  name: string;
  value_c: number;
  date?: string;
  desc?: string;
  notes?: string;
};

export type CreateItemsBulkRequest = {
  items: CreateItemDto[];
  tag_id?: number;
};

export type Item = {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
  name: string;
  desc: string;
  notes: string;
  value_c: number;
  tag_id: number;
  date: string;
};

export type ItemsResponse = {
  items: Item[];
};

export type GetItemsByDateRequest = {
  start_date: string;
  end_date: string;
};

export type GetItemsByTagAndOrDateRequest = {
  tag_ids?: number[];
  start_date?: string;
  end_date?: string;
};
