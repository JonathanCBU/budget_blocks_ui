import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { budgetApi } from '../services/api';
import type { Budget, CreateBudgetRequest } from '../types/budget';

// Query keys - centralized for consistency
export const budgetKeys = {
  all: ['budgets'] as const,
  detail: (id: string) => ['budgets', id] as const,
};

// Hook to fetch all budgets
export function useBudgets() {
  return useQuery({
    queryKey: budgetKeys.all,
    queryFn: budgetApi.getAll,
  });
}

// Hook to fetch a single budget
export function useBudget(id: string) {
  return useQuery({
    queryKey: budgetKeys.detail(id),
    queryFn: () => budgetApi.getById(id),
    enabled: !!id, // Only run if id exists
  });
}

// Hook to create a budget
export function useCreateBudget() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: CreateBudgetRequest) => budgetApi.create(request),
    onSuccess: () => {
      // Invalidate and refetch budgets after creating
      queryClient.invalidateQueries({ queryKey: budgetKeys.all });
    },
  });
}

// Hook to delete a budget (for future use)
export function useDeleteBudget() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => budgetApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: budgetKeys.all });
    },
  });
}
