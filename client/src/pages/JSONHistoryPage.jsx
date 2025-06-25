import React, { useEffect, useState } from "react";
import { List, Card, Typography, Spin } from "antd";
import NavigationMenu from "../pages/navigation.jsx"; // Adjust path if needed
import DarkModeToggle from "../components/DarkModeToggle.jsx"; // Adjust path if needed

const { Title } = Typography;

function JSONHistoryPage() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/json-history`)
      .then((res) => res.json())
      .then((data) => {
        setHistory(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch JSON history:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div
      style={{
        padding: 40,
        minHeight: "100vh",
        background: "#f4f6f8",
        position: "relative",
        boxSizing: "border-box",
      }}
    >
      {/*  Navigation and Dark Mode Toggle */}
      <div
        style={{
          position: "fixed",
          top: 20,
          left: 20,
          zIndex: 1000,
        }}
      >
        <NavigationMenu />
      </div>

      <div
        style={{
          position: "fixed",
          top: 20,
          right: 20,
          zIndex: 1000,
        }}
      >
        <DarkModeToggle />
      </div>

      {/* Title */}
      <Title level={3} style={{ textAlign: "center", marginBottom: 30 }}>
        🕓 JSON Format History
      </Title>

      <Spin spinning={loading} tip="Loading history..." size="large">
        <List
          grid={{ gutter: 16, column: 1 }}
          dataSource={history}
          renderItem={(item) => (
            <List.Item>
              <Card
                title={new Date(item.timestamp).toLocaleString()}
                style={{
                  borderRadius: "10px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                }}
              >
                <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
                  {item.json}
                </pre>
              </Card>
            </List.Item>
          )}
        />
      </Spin>
    </div>
  );
}

export default JSONHistoryPage;
