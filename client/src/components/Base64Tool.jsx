import React, { useState } from "react";
import {
  Typography,
  Input,
  Button,
  Tooltip,
  Alert
} from "antd";
import {
  CopyOutlined,
  CheckOutlined,
  ClearOutlined,
  LockOutlined,
  UnlockOutlined,
  FileTextOutlined
} from "@ant-design/icons";
import toast, { Toaster } from "react-hot-toast";
import NavigationMenu from "../pages/navigation.jsx";
import DarkModeToggle from "../components/DarkModeToggle.jsx";

const { Title } = Typography;
const { TextArea } = Input;

function Base64Tool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const encode = async () => {
    if (!input) {
      toast.error("Please enter text to encode");
      return;
    }

    try {
      setLoading(true);
      setError("");
      
      const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
      console.log('API URL:', apiUrl); // Debug log
      
      const res = await fetch(`${apiUrl}/encode`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: input }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();

      if (data.success) {
        setOutput(data.encoded);
        toast.success("Encoded successfully!");
      } else {
        throw new Error(data.error || "Encoding failed");
      }
    } catch (err) {
      console.error("Encoding error:", err);
      setError(err.message);
      toast.error(`Encoding failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const decode = async () => {
    if (!input) {
      toast.error("Please enter Base64 text to decode");
      return;
    }

    try {
      setLoading(true);
      setError("");
      
      const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
      console.log('API URL:', apiUrl); // Debug log
      
      const res = await fetch(`${apiUrl}/decode`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ base64: input }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      
      if (data.success) {
        setOutput(data.decoded);
        toast.success("Decoded successfully!");
      } else {
        throw new Error(data.error || "Decoding failed");
      }
    } catch (err) {
      console.error("Decoding error:", err);
      setError(err.message);
      toast.error(`Decoding failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setInput("");
    setOutput("");
    setError("");
    toast.success("Input reset successfully!");
  };

  const handleCopy = async () => {
    if (!output) {
      toast.error("Nothing to copy!");
      return;
    }
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
      toast.success("Output copied to clipboard!");
    } catch (err) {
      console.error("Copy failed:", err);
      toast.error("Failed to copy to clipboard.");
    }
  };

  const sampleEncode = "Hello, World!";
  const sampleDecode = "SGVsbG8sIFdvcmxkIQ==";

  const loadSampleEncode = () => {
    setInput(sampleEncode);
    setError("");
    toast.success("Sample input for encoding loaded!");
  };

  const loadSampleDecode = () => {
    setInput(sampleDecode);
    setError("");
    toast.success("Sample input for decoding loaded!");
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        background: "var(--page-background)",
        color: "var(--text-color)",
        fontFamily: "'Inter', sans-serif",
        position: "relative"
      }}
    >
      <Toaster />

      <div style={{ position: "absolute", top: 20, left: 20, zIndex: 10 }}>
        <NavigationMenu />
      </div>
      
      <div style={{ position: "absolute", top: 20, right: 20, zIndex: 10 }}>
        <DarkModeToggle />
      </div>

      <div
        style={{
          textAlign: "center",
          textShadow: "0px 3px 8px rgba(0, 0, 0, 0.2)",
          fontSize: "32px",
          fontWeight: "bold",
          color: "var(--text-color)",
          background: "var(--box-background)",
          padding: "10px 30px",
          borderRadius: "16px",
          boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.15)",
          marginTop: "10px"
        }}
      >
        <LockOutlined style={{ marginRight: 10 }} /> Base64 Encoder / Decoder
      </div>

      <div
        style={{
          display: "flex",
          gap: "20px",
          height: "65%",
          width: "100%",
          padding: "0 40px",
          boxSizing: "border-box"
        }}
      >
        <div
          style={{
            flex: 1,
            backgroundColor: "var(--box-background)",
            borderRadius: "16px",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 6px 16px rgba(0, 0, 0, 0.1)"
          }}
        >
          <Title level={5} style={{ marginBottom: 12, color: "var(--text-color)" }}>
            Input Text / Base64
          </Title>
          <TextArea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text or Base64 here..."
            autoSize={{ minRows: 14, maxRows: 14 }}
            style={{
              fontFamily: "'Fira Code', monospace",
              fontSize: "14px",
              border: "1px solid #ccc",
              borderRadius: "10px",
              background: "var(--box-background)",
              boxShadow: "inset 2px 2px 6px rgba(0,0,0,0.03)",
              flex: 1,
              color: "var(--text-color)"
            }}
          />
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "12px" }}>
            <Button icon={<FileTextOutlined />} onClick={loadSampleEncode}>
              Sample Encode
            </Button>
            <Button icon={<FileTextOutlined />} onClick={loadSampleDecode}>
              Sample Decode
            </Button>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "12px" }}>
            <Button
              icon={<LockOutlined />}
              onClick={encode}
              loading={loading}
              style={{
                backgroundColor: "#e6f7ff",
                color: "#1890ff",
                borderRadius: "8px",
                fontWeight: "bold"
              }}
            >
              Encode
            </Button>
            <Button
              icon={<UnlockOutlined />}
              onClick={decode}
              loading={loading}
              style={{
                backgroundColor: "#fffbe6",
                color: "#faad14",
                borderRadius: "8px",
                fontWeight: "bold"
              }}
            >
              Decode
            </Button>
            <Button
              icon={<ClearOutlined />}
              onClick={handleReset}
              style={{
                backgroundColor: "#fff1f0",
                color: "#ff4d4f",
                borderRadius: "8px",
                fontWeight: "bold"
              }}
            >
              Clear
            </Button>
          </div>
        </div>

        <div
          style={{
            flex: 1,
            backgroundColor: "var(--box-background)",
            borderRadius: "16px",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 6px 16px rgba(0, 0, 0, 0.1)"
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
            <Title level={5} style={{ margin: 0, color: "var(--text-color)" }}>Result</Title>
            {output && (
              <Tooltip title={copied ? "Copied!" : "Copy to clipboard"}>
                <Button
                  type="link"
                  icon={copied ? <CheckOutlined /> : <CopyOutlined />}
                  onClick={handleCopy}
                  style={{ color: "#52c41a" }}
                >
                  Copy
                </Button>
              </Tooltip>
            )}
          </div>

          {error && (
            <Alert
              message="Error"
              description={error}
              type="error"
              showIcon
              style={{
                marginBottom: 12,
                borderRadius: "8px",
                backgroundColor: "#fff1f0",
                border: "1px solid #ffa39e"
              }}
            />
          )}

          <TextArea
            value={output}
            placeholder="Your result will appear here..."
            readOnly
            autoSize={{ minRows: 14, maxRows: 14 }}
            style={{
              fontFamily: "'Fira Code', monospace",
              fontSize: "14px",
              borderRadius: "10px",
              background: "var(--box-background)",
              border: "1px solid #ccc",
              boxShadow: "inset 2px 2px 6px rgba(0,0,0,0.03)",
              flex: 1,
              color: "var(--text-color)"
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Base64Tool;