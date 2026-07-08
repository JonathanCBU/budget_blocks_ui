import { useState } from "react";
import { Form, Input, Button, Tag, Alert, Typography, Space, Card } from "antd";
import { PlusOutlined, TagOutlined } from "@ant-design/icons";
import { tagsApi } from "../../api";

const { Title, Text } = Typography;

interface CreatedTag {
  name: string;
}

export default function TagsPage() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [createdTags, setCreatedTags] = useState<CreatedTag[]>([]);

  const handleSubmit = async (values: { name: string }) => {
    setLoading(true);
    setError(null);

    const { data, error: apiError } = await tagsApi.create(values.name.trim());

    if (apiError) {
      setError(apiError);
    } else if (data?.message === "success") {
      setCreatedTags((prev) => [...prev, { name: values.name.trim() }]);
      form.resetFields();
    } else {
      setError("Unexpected response from server.");
    }

    setLoading(false);
  };

  return (
    <Space
      direction="vertical"
      size="large"
      style={{ width: "100%", maxWidth: 520 }}
    >
      <div>
        <Title level={4} style={{ margin: 0 }}>
          Create a tag
        </Title>
        <Text type="secondary" style={{ fontSize: 13 }}>
          Tags categorize your transactions. Give each one a clear, short name.
        </Text>
      </div>

      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="name"
          label="Tag name"
          rules={[
            { required: true, message: "Tag name is required." },
            { min: 1, whitespace: true, message: "Tag name cannot be blank." },
          ]}
        >
          <Input
            prefix={<TagOutlined style={{ color: "#aaa" }} />}
            placeholder="e.g. groceries, rent, subscriptions"
            allowClear
            onPressEnter={() => form.submit()}
          />
        </Form.Item>

        {error && (
          <Form.Item>
            <Alert
              type="error"
              message={error}
              showIcon
              closable
              onClose={() => setError(null)}
            />
          </Form.Item>
        )}

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            icon={<PlusOutlined />}
            loading={loading}
            block
          >
            Create tag
          </Button>
        </Form.Item>
      </Form>

      {createdTags.length > 0 && (
        <Card
          size="small"
          title={
            <Text style={{ fontSize: 13 }}>Tags created this session</Text>
          }
        >
          <Space wrap>
            {createdTags.map((tag) => (
              <Tag key={tag.name} icon={<TagOutlined />} color="blue">
                {tag.name}
              </Tag>
            ))}
          </Space>
        </Card>
      )}
    </Space>
  );
}
