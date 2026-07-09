export type CreateTagRequest = {
  name: string;
};

export type CreateTagsBulkRequest = {
  tags: CreateTagRequest[];
};

export type Tag = {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
  name: string;
  items: unknown[] | null;
};

export type Tags = {
  tags: Tag[];
};
