import React from "react";
import { Button, Col, DatePicker, Drawer, Form, Input, Row } from "antd";
import { NewIndexProps } from "../App";

interface AddIndexDrawerProps {
  isOpen: boolean;
  onSubmit: (data: NewIndexProps) => void;
  onClose: (e: any) => void;
}

const AddIndexDrawer: React.FC<AddIndexDrawerProps> = ({
  isOpen,
  onSubmit,
  onClose,
}) => {
  return (
    <>
      <Drawer
        title="Add new Serp Index entry"
        width={450}
        onClose={onClose}
        visible={isOpen}
        bodyStyle={{ paddingBottom: 50 }}
      >
        <Form layout="vertical" hideRequiredMark onFinish={onSubmit}>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="category"
                label="Category"
                rules={[
                  {
                    required: true,
                    message: "Please enter a category name",
                  },
                ]}
              >
                <Input placeholder="Enter category name" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="url"
                label="Url"
                rules={[
                  {
                    required: true,
                    message: "Please enter url",
                  },
                ]}
              >
                <Input
                  style={{ width: "100%" }}
                  addonBefore="http://"
                  addonAfter=".com"
                  placeholder="Please enter url"
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="validUntil"
                label="Valid Until"
                rules={[
                  {
                    required: true,
                    message: "Please choose valid until date",
                  },
                ]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Form.Item
              style={{
                display: "flex",
                width: "100%",
                textAlign: "right",
                marginTop: "10px",
              }}
            >
              <Button type="primary" htmlType="submit">
                Send
              </Button>
            </Form.Item>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

export default AddIndexDrawer;
