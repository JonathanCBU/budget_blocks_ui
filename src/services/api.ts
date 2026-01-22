import type { Budget, CreateBudgetRequest, ApiResponse } from "../types/budget";

const API_BASE = "http://127.0.0.1:8080";

export const budgetApi = {
  getAll: async (): Promise<Budget[]> => {
    const response = await fetch(`${API_BASE}/budget/get-all`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) throw new Error("Failed to fetch budgets");
    const data: ApiResponse<Budget[]> = await response.json();
    return data.data;
  },

  create: async (request: CreateBudgetRequest): Promise<string> => {
    const response = await fetch(`${API_BASE}/budget/post`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    });
    if (!response.ok) throw new Error("Failed to create budget");
    const data: ApiResponse<string> = await response.json();
    return data.data;
  },

  getById: async (id: string): Promise<Budget> => {
    // Implement when you have this endpoint
    const response = await fetch(`${API_BASE}/budget/${id}`);
    if (!response.ok) throw new Error("Failed to fetch budget");
    const data: ApiResponse<Budget> = await response.json();
    return data.data;
  },
};
