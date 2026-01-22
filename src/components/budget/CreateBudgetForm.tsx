import { useState } from "react";
import { TextInput, Button, Paper, Stack, Notification } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";
import { budgetApi } from "../../services/api";

interface CreateBudgetFormProps {
  onBudgetCreated?: () => void;
}

export function CreateBudgetForm({ onBudgetCreated }: CreateBudgetFormProps) {
  const [budgetName, setBudgetName] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCreateBudget = async () => {
    setLoading(true);
    setSuccess(null);
    setError(null);

    try {
      const id = await budgetApi.create({ name: budgetName });
      setSuccess(`Budget created successfully! ID: ${id}`);
      setBudgetName("");
      onBudgetCreated?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
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
          loading={loading}
          disabled={!budgetName.trim()}
        >
          Create Budget
        </Button>

        {success && (
          <Notification
            icon={<IconCheck size={18} />}
            color="green"
            onClose={() => setSuccess(null)}
          >
            {success}
          </Notification>
        )}

        {error && (
          <Notification
            icon={<IconX size={18} />}
            color="red"
            onClose={() => setError(null)}
          >
            {error}
          </Notification>
        )}
      </Stack>
    </Paper>
  );
}
