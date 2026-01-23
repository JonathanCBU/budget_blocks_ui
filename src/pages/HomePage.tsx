import { Container, Title, Stack } from "@mantine/core";

export default function HomePage() {
  return (
    <Container size="lg" mt="xl">
      <Stack gap="xl">
        <Title order={1}>Welcome To Budget Blocks</Title>
      </Stack>
    </Container>
  );
}
