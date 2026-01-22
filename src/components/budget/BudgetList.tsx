import { useEffect, useState } from "react";
import { Stack, Title, Loader, Text, Alert } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";
import { budgetApi } from "../../services/api";
import type { Budget } from "../../types/budget";
import { BudgetCard } from "./BudgetCard";

export function BudgetList() {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadBudgets = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await budgetApi.getAll();
      setBudgets(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load budgets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBudgets();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <Alert icon={<IconAlertCircle size={16} />} title="Error" color="red">
        {error}
      </Alert>
    );
  }

  if (budgets.length === 0) {
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
        <BudgetCard key={budget.id} budget={budget} />
      ))}
    </Stack>
  );
}
