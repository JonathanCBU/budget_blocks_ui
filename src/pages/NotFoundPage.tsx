import { Container, Title, Text, Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Container size="sm" style={{ textAlign: "center", marginTop: "100px" }}>
      <Title order={1} mb="md">
        404 - Page Not Found
      </Title>
      <Text mb="xl">The page you're looking for doesn't exist.</Text>
      <Button onClick={() => navigate("/")}>Go Home</Button>
    </Container>
  );
}
