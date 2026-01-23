// src/components/budget/CreateBudgetForm.tsx
import { useState } from "react";
import { TextInput, Button, Paper, Stack, Notification } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useCreateBudget } from "../../hooks/useBudget";

export function CreateBudgetForm() {
  const [budgetName, setBudgetName] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const createBudget = useCreateBudget();

  const handleCreateBudget = async () => {
    try {
      await createBudget.mutateAsync({ name: budgetName });
      setBudgetName("");
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      // Error is handled by React Query
    }
  };

  return (
    <Paper shadow="sm" p="xl" withBorder>
      <Stack>
        <TextInput
          label="Budget Name"
          placeholder="Enter budget name"
          value={budgetName}
          onChange={(e) => setBudgetName(e.currentTarget.value)}
        />

        <Button
          onClick={handleCreateBudget}
          loading={createBudget.isPending}
          disabled={!budgetName.trim()}
        >
          Create Budget
        </Button>

        {showSuccess && (
          <Notification
            icon={<IconCheck size={18} />}
            color="green"
            onClose={() => setShowSuccess(false)}
          >
            Budget created successfully!
          </Notification>
        )}

        {createBudget.isError && (
          <Notification
            icon={<IconX size={18} />}
            color="red"
            onClose={() => createBudget.reset()}
          >
            {createBudget.error instanceof Error
              ? createBudget.error.message
              : "An error occurred"}
          </Notification>
        )}
      </Stack>
    </Paper>
  );
}
