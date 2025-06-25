import React from "react";
import { Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import NavigationMenu from "./navigation";
import DarkModeToggle from "../components/DarkModeToggle";
import { ToolOutlined, CodeOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

const Home = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "var(--page-background)",
        color: "var(--text-color)",
        fontFamily: "'Inter', sans-serif",
        position: "relative",
        padding: "20px",
        textAlign: "center"
      }}
    >
      {/* Top left navigation */}
      <div style={{ position: "absolute", top: 20, left: 20, zIndex: 10 }}>
        <NavigationMenu />
      </div>

      {/* Top right dark mode toggle */}
      <div style={{ position: "absolute", top: 20, right: 20, zIndex: 10 }}>
        <DarkModeToggle />
      </div>

      {/* Welcome message */}
      <Title
        level={2}
        style={{
          textAlign: "center",
          marginBottom: 10,
          textShadow: "0px 3px 8px rgba(0, 0, 0, 0.2)",
          color: "var(--text-color)"
        }}
      >
        Welcome to Dev Toolbox
      </Title>
      <Paragraph style={{ maxWidth: "700px", fontSize: "16px", color: "var(--text-color)", marginBottom: "30px" }}>
        Boost your productivity with a suite of powerful developer utilities — instantly format JSON, seamlessly encode and decode Base64, use intuitive copy features, and switch between light and dark modes to match your style and comfort.
       </Paragraph>

      {/* Hero image */}
      <img
        src="https://cdn-icons-png.flaticon.com/512/2721/2721286.png"
        alt="Toolbox"
        style={{ width: "150px", height: "150px", marginBottom: "30px" }}
      />

      {/* Buttons */}
      <div style={{ display: "flex", gap: "40px" }}>
        <Button
          size="large"
          type="primary"
          icon={<CodeOutlined />}
          onClick={() => navigate("/json-formatter")}
          style={{
            padding: "20px 40px",
            fontSize: "18px",
            borderRadius: "12px",
            background: "linear-gradient(to right, #00c6ff, #0072ff)",
            fontWeight: 600,
          }}
        >
          JSON Formatter
        </Button>

        <Button
          size="large"
          type="primary"
          icon={<ToolOutlined />}
          onClick={() => navigate("/base64")}
          style={{
            padding: "20px 40px",
            fontSize: "18px",
            borderRadius: "12px",
            background: "linear-gradient(to right, #ff7e5f, #feb47b)",
            fontWeight: 600,
          }}
        >
          Base64 Encoder/Decoder
        </Button>
      </div>
    </div>
  );
};

export default Home;