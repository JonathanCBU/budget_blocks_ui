import { useEffect, useState } from "react";
import {
  Container,
  Title,
  TextInput,
  Button,
  Stack,
  Paper,
  Notification,
} from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";

function App() {
  const [budgetName, setBudgetName] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCreateBudget = async () => {
    setLoading(true);
    setSuccess(null);
    setError(null);

    try {
      const response = await fetch("http://127.0.0.1:8080/budget/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: budgetName }),
      });

      if (!response.ok) {
        throw new Error("Failed to create budget");
      }

      const data = await response.json();
      setSuccess(`Budget created successfully! ID: ${data.data}`);
      setBudgetName("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleLoadBudgets = async () => {
    setLoading(true);
    setSuccess(null);
    setError(null);

    try {
      const response = await fetch("http://127.0.0.1:8080/budget/get-all", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to get all budgets");
      }

      const data = await response.json();
      setSuccess(`Budget created successfully! ID: ${data.data}`);
      setBudgetName("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleLoadBudgets();
  }, []);

  return (
    <Container size="sm" mt="xl">
      <Title order={1} mb="xl">
        Budget Blocks
      </Title>

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
    </Container>
  );
}

export default App;
