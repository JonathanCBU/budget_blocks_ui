import { apiClient } from "./client";

export interface Tag {
  id?: number;
  name: string;
}

export interface CreateTagResponse {
  message: string;
}

export const tagsApi = {
  create: (name: string) =>
    apiClient.post<CreateTagResponse>("/api/budget/tag/create", { name }),

  // Placeholder — add endpoint path when available
  list: () => apiClient.get<Tag[]>("/api/budget/tag/list"),

  delete: (id: number) => apiClient.delete(`/api/budget/tag/${id}`),
};
