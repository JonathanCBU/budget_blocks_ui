import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ConfigProvider, theme } from "antd";
import AppLayout from "./layouts/AppLayout";
import { TagsPage } from "./pages";
import { DEFAULT_PATH } from "./routes";

export default function App() {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: "#1677ff",
          borderRadius: 8,
        },
      }}
    >
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/tags" element={<TagsPage />} />
            {/* Add new routes here as you add pages */}
            {/* <Route path="/dashboard" element={<DashboardPage />} /> */}
            <Route path="*" element={<Navigate to={DEFAULT_PATH} replace />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </ConfigProvider>
  );
}
