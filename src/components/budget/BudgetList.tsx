// src/components/budget/BudgetList.tsx
import { Stack, Title, Loader, Text, Alert } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";
import { useBudgets } from "../../hooks/useBudget";
import { BudgetCard } from "./BudgetCard";

export function BudgetList() {
  const { data: budgets, isLoading, error } = useBudgets();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <Alert icon={<IconAlertCircle size={16} />} title="Error" color="red">
        {error instanceof Error ? error.message : "Failed to load budgets"}
      </Alert>
    );
  }

  if (!budgets || budgets.length === 0) {
    return (
      <Text c="dimmed" ta="center" mt="xl">
        No budgets yet. Create one to get started!
      </Text>
    );
  }

  return (
    <Stack gap="md">
      <Title order={2}>Your Budgets</Title>
      {budgets.map((budget) => (
        <BudgetCard key={budget.id} id={budget.id} name={budget.name} />
      ))}
    </Stack>
  );
}
