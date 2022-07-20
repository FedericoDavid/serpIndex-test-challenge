import { useState, useEffect } from "react";
import { Button, Col, Row, Table } from "antd";
import message from "antd/lib/message";

import { useIndexAPIClient } from "./hooks/api/indexAPIClient";
import { Index, Entries } from "./hooks/api/indexTypes";
import { useDateFormatter } from "./hooks/utils/useDateFormatter";
import AddIndexDrawer from "./components/AddIndexDrawer";

import "./App.css";
import "antd/dist/antd.css";

export interface NewIndexProps {
  category: string;
  url: string;
  validUntil: string;
}

const App = () => {
  const [data, setData] = useState<Array<Index>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDrawerVisible, setIsDrawerVisible] = useState<boolean>(false);

  const { toLocalShortDate } = useDateFormatter();

  const indexAPICLient = useIndexAPIClient();

  const getData = async (): Promise<void> => {
    const res = await indexAPICLient.get();

    if (!res) {
      message.error(`Ups! ${res}!`);
      return;
    }

    setData(res);
  };

  useEffect(() => {
    getData();
  }, []);

  const onSubmit = (data: NewIndexProps) => {
    if (!data) return;
    setIsLoading(true);

    try {
      indexAPICLient.post(data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      message.error("Ups! something went wrong");
    }
  };

  const getDiffDaysUntilExpired = (validUntilDate: any) => {
    if (!validUntilDate) return;

    const singleDay = 1000 * 60 * 60 * 24;
    const currentDay = new Date();
    const validUntil = new Date(validUntilDate);

    const difference = currentDay.getTime() - validUntil.getTime();

    return Math.round(difference / singleDay);
  };

  const expandableRowRender = (selectedRow: Entries[]) => {
    const expandableColumns = [
      {
        title: "Created On",
        dataIndex: "createdOn",
        key: "createdOn",
        width: "11%",
        render: (text: any) => <span>{toLocalShortDate(text)}</span>,
      },
      {
        title: "Language",
        dataIndex: "language",
        key: "language",
        width: "9%",
        render: (text: string) => <span>{text}</span>,
      },
      {
        title: "Url",
        dataIndex: "url",
        key: "url",
        width: "45%",
        render: (text: string) => <a>{text}</a>,
      },
      {
        title: "Title",
        dataIndex: "title",
        key: "title",
        width: "30%",
        render: (text: string) => <span>{text}</span>,
      },
      {
        key: "indexCount",
        render: (entries: any) => (
          <span>{`${entries?.indexedCount} / ${entries?.indexedValidCount} / ${entries?.indexedTotal}`}</span>
        ),
      },
    ];

    return (
      <Table
        columns={expandableColumns}
        dataSource={selectedRow}
        pagination={false}
        size="small"
        scroll={{
          y: 120,
        }}
      />
    );
  };

  const columns = [
    {
      title: "Created On",
      dataIndex: "createdOn",
      key: "createdOn",
      render: (text: string) => <span>{toLocalShortDate(text)}</span>,
      sorter: {
        compare: (a: any, b: any) => a.createdOn.localeCompare(b.createdOn),
        multiple: 1,
      },
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text: string) => <span>{text}</span>,
      sorter: {
        compare: (a: any, b: any) => a.title.localeCompare(b.title),
        multiple: 2,
      },
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (text: string) => <span>{text}</span>,
      sorter: {
        compare: (a: any, b: any) => a.category.localeCompare(b.category),
        multiple: 3,
      },
    },
    {
      title: "Domain",
      dataIndex: "domain",
      key: "domain",
      render: (text: string) => <span>{text}</span>,
      sorter: {
        compare: (a: any, b: any) => a.domain.localeCompare(b.domain),
        multiple: 4,
      },
    },
    {
      title: "Valid Until",
      dataIndex: "validUntil",
      key: "validUntil",
      render: (text: string) => <span>{toLocalShortDate(text)}</span>,
    },
    {
      title: "Days Left",
      dataIndex: "validUntil",
      key: "validUntil",
      render: (text: string) => <span>{getDiffDaysUntilExpired(text)}</span>,
    },
    {
      dataIndex: "validUntil",
      key: "validUntil",
      render: (serp: Entries) =>
        serp?.indexedCount &&
        serp?.indexedValidCount &&
        serp?.indexedTotal && (
          <span>{`${serp?.indexedCount} / ${serp?.indexedValidCount} / ${serp?.indexedTotal}`}</span>
        ),
    },
  ];

  return (
    <div className="table-container">
      <Row className="action-btn-container">
        <Col span={20} style={{ textAlign: "center" }}>
          <h2>SerpIndex Test</h2>
        </Col>
        <Col span={4} style={{ textAlign: "right" }}>
          <Button type="primary" onClick={() => setIsDrawerVisible(true)}>
            Add Index
          </Button>
        </Col>
      </Row>
      <Table
        columns={columns}
        dataSource={data}
        rowKey={(record) => record.id}
        expandedRowRender={(record) => expandableRowRender(record.entries)}
        size="large"
        scroll={{
          x: 980,
        }}
      />
      <AddIndexDrawer
        isOpen={isDrawerVisible}
        onClose={() => setIsDrawerVisible(false)}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default App;
