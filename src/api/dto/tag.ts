export type CreateTagRequest = {
  name: string;
  color: string;
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
  color: string;
};

export type Tags = {
  tags: Tag[];
};

export type DeleteTagsBulkRequest = {
  ids: number[];
};

export type DeleteTagsBulkResponse = {
  deleted_count: number;
};
