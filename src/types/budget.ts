export interface Budget {
  id: string;
  name: string;
  createdAt?: string;
  // Add other fields as needed
}

export interface CreateBudgetRequest {
  name: string;
}

export interface ApiResponse<T> {
  data: T;
  error?: string;
}
