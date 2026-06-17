import React, { useState } from "react";
import {
  Layout,
  Menu,
  Button,
  Input,
  Table,
  Form,
  Card,
  Space,
  message,
} from "antd";
import { HomeOutlined, UserOutlined, SettingOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";

const { Header, Sider, Content } = Layout;

interface DataItem {
  key: string;
  name: string;
  age: number;
  email: string;
}

const initialData: DataItem[] = [
  { key: "1", name: "Alice Johnson", age: 28, email: "alice@example.com" },
  { key: "2", name: "Bob Smith", age: 34, email: "bob@example.com" },
  { key: "3", name: "Carla Diaz", age: 22, email: "carla@example.com" },
];

const columns: ColumnsType<DataItem> = [
  { title: "Name", dataIndex: "name", key: "name" },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
    sorter: (a, b) => a.age - b.age,
  },
  { title: "Email", dataIndex: "email", key: "email" },
];

const App: React.FC = () => {
  const [data, setData] = useState<DataItem[]>(initialData);
  const [form] = Form.useForm();

  const handleAdd = (values: { name: string; age: number; email: string }) => {
    const newItem: DataItem = {
      key: String(data.length + 1),
      name: values.name,
      age: Number(values.age),
      email: values.email,
    };
    setData([...data, newItem]);
    form.resetFields();
    message.success(`${values.name} added`);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider breakpoint="lg" collapsedWidth="0">
        <div
          style={{
            height: 32,
            margin: 16,
            color: "#fff",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          My App
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            { key: "1", icon: <HomeOutlined />, label: "Home" },
            { key: "2", icon: <UserOutlined />, label: "Users" },
            { key: "3", icon: <SettingOutlined />, label: "Settings" },
          ]}
        />
      </Sider>

      <Layout>
        <Header style={{ background: "#fff", padding: "0 16px" }}>
          <h2 style={{ margin: 0 }}>Dashboard</h2>
        </Header>

        <Content style={{ margin: 16 }}>
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            <Card title="Add a new user">
              <Form
                form={form}
                layout="inline"
                onFinish={handleAdd}
                style={{ flexWrap: "wrap", gap: 8 }}
              >
                <Form.Item
                  name="name"
                  rules={[{ required: true, message: "Name is required" }]}
                >
                  <Input placeholder="Name" />
                </Form.Item>
                <Form.Item
                  name="age"
                  rules={[{ required: true, message: "Age is required" }]}
                >
                  <Input placeholder="Age" type="number" />
                </Form.Item>
                <Form.Item
                  name="email"
                  rules={[
                    { required: true, message: "Email is required" },
                    { type: "email", message: "Enter a valid email" },
                  ]}
                >
                  <Input placeholder="Email" />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Add User
                  </Button>
                </Form.Item>
              </Form>
            </Card>

            <Card title="Users">
              <Table
                columns={columns}
                dataSource={data}
                pagination={{ pageSize: 5 }}
              />
            </Card>
          </Space>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
