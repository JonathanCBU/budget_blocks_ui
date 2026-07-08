import { useState } from "react";
import { Layout, Menu, Typography, theme } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { navItems } from "../routes";

const { Sider, Content, Header } = Layout;
const { Text } = Typography;

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = theme.useToken();

  const activeKey =
    navItems.find((item) => location.pathname.startsWith(item.path))?.key ??
    navItems[0].key;

  const menuItems = navItems.map((item) => ({
    key: item.key,
    icon: <item.icon />,
    label: item.label,
  }));

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        style={{
          background: token.colorBgContainer,
          borderRight: `1px solid ${token.colorBorderSecondary}`,
        }}
      >
        <div
          style={{
            height: 56,
            display: "flex",
            alignItems: "center",
            padding: collapsed ? "0 24px" : "0 20px",
            borderBottom: `1px solid ${token.colorBorderSecondary}`,
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          <Text
            strong
            style={{
              fontSize: collapsed ? 0 : 15,
              transition: "font-size 0.2s",
            }}
          >
            💰 Budget Blocks
          </Text>
        </div>

        <Menu
          mode="inline"
          selectedKeys={[activeKey]}
          items={menuItems}
          style={{ border: "none", marginTop: 8 }}
          onClick={({ key }) => {
            const item = navItems.find((n) => n.key === key);
            if (item) navigate(item.path);
          }}
        />
      </Sider>

      <Layout>
        <Header
          style={{
            background: token.colorBgContainer,
            borderBottom: `1px solid ${token.colorBorderSecondary}`,
            padding: "0 24px",
            height: 56,
            lineHeight: "56px",
          }}
        >
          <Text strong style={{ fontSize: 15 }}>
            {navItems.find((n) => n.key === activeKey)?.label ?? ""}
          </Text>
        </Header>

        <Content
          style={{
            margin: 24,
            padding: 24,
            background: token.colorBgContainer,
            borderRadius: token.borderRadiusLG,
            border: `1px solid ${token.colorBorderSecondary}`,
            minHeight: "calc(100vh - 56px - 48px)",
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
