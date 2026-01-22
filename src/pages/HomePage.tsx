import { Container, Title, Stack } from "@mantine/core";
import { BudgetList } from "../components/budget/BudgetList";
import { CreateBudgetForm } from "../components/budget/CreateBudgetForm";

export default function HomePage() {
  return (
    <Container size="lg" mt="xl">
      <Stack gap="xl">
        <Title order={1}>Budget Blocks</Title>
        <CreateBudgetForm />
        <BudgetList />
      </Stack>
    </Container>
  );
}
