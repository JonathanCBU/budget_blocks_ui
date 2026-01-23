import { Typography } from "@mantine/core";
import type { Budget } from "../../types/budget";
export function BudgetCard({ id, name }: Budget) {
  return (
    <>
      <Typography>{id}</Typography>
      <Typography>{name}</Typography>
    </>
  );
}
