import { Container, Title } from "@mantine/core";
import { BudgetList } from "../components/budget/BudgetList";
import { CreateBudgetForm } from "../components/budget/CreateBudgetForm";

export default function BudgetsPage() {
  return (
    <Container size="lg">
      <Title order={1} mb="xl">
        Budgets
      </Title>
      <CreateBudgetForm />
      <BudgetList />
    </Container>
  );
}
