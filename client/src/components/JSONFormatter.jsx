import React, { useState } from "react";
import {
  Typography,
  Input,
  Button,
  Alert,
  Tooltip
} from "antd";
import {
  CopyOutlined,
  CheckOutlined,
  ClearOutlined,
  FileTextOutlined,
  FormatPainterOutlined
} from "@ant-design/icons";
import toast, { Toaster } from "react-hot-toast";
import NavigationMenu from "../pages/navigation.jsx"; 
import DarkModeToggle from "../components/DarkModeToggle.jsx";

const { Title } = Typography;
const { TextArea } = Input;

function JSONFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fixed API call function
  const handleFormatJson = async (jsonText) => {
    try {
      setLoading(true);
      setError("");
      
      const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
      console.log('API URL:', apiUrl); // Debug log
      
      const response = await fetch(`${apiUrl}/json-formatter`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ json: jsonText })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success) {
        setOutput(data.formatted);
        toast.success("JSON formatted successfully!");
        return data;
      } else {
        throw new Error(data.error || 'Failed to format JSON');
      }
    } catch (error) {
      console.error('Error formatting JSON:', error);
      setError(error.message);
      toast.error(`Error formatting JSON: ${error.message}`);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Fixed format function - this was missing!
  const handleFormat = async () => {
    if (!input.trim()) {
      toast.error("Please enter JSON to format!");
      return;
    }

    try {
      // First validate JSON locally
      JSON.parse(input);
      await handleFormatJson(input);
    } catch (error) {
      if (error instanceof SyntaxError) {
        setError("Invalid JSON syntax");
        toast.error("Invalid JSON syntax");
      }
    }
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
      toast.success("Formatted JSON copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy:", err);
      toast.error("Failed to copy formatted JSON. Please try again.");
    }
  };

  const handleReset = () => {
    setInput("");
    setOutput("");
    setError("");
    toast.success("Input reset successfully!");
  };

  const sampleJson = `{"name":"John Doe","age":30,"city":"New York","hobbies":["reading","coding","gaming"],"address":{"street":"123 Main St","zipCode":"10001"}}`;

  const loadSample = () => {
    setInput(sampleJson);
    toast.success("Sample JSON loaded!");
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        maxWidth: "100vw",
        maxHeight: "100vh",
        overflow: "hidden",
        overflowX: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        background: "var(--page-background)",
        color: "var(--text-color)",
        fontFamily: "'Inter', sans-serif",
        padding: 0,
        boxSizing: "border-box",
        position: "relative"
      }}
    >
      <Toaster />

      {/* Navigation */}
      <div style={{ position: "absolute", top: 20, left: 20, zIndex: 10 }}>
        <NavigationMenu />
      </div>

      <div style={{ position: "absolute", top: 20, right: 20, zIndex: 10 }}>
        <DarkModeToggle />
      </div>

      {/* Header */}
      <div
        style={{
          textAlign: "center",
          textShadow: "0px 3px 8px rgba(0, 0, 0, 0.2)",
          fontSize: "32px",
          fontWeight: "bold",
          color: "var(--text-color)",
          backgroundColor: "var(--box-background)",
          padding: "10px 30px",
          borderRadius: "16px",
          boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.15)",
          marginTop: "10px"
        }}
      >
        <FormatPainterOutlined style={{ marginRight: 10 }} /> JSON Formatter
      </div>

      {/* Input and Output Side by Side */}
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
        {/* Input Section */}
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
            Raw JSON Input
          </Title>
          <TextArea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your JSON here..."
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
            <Button
              icon={<FileTextOutlined />}
              onClick={loadSample}
              style={{
                backgroundColor: "#e6f7ff",
                color: "#1890ff",
                borderRadius: "8px",
                fontWeight: "bold"
              }}
            >
              Load Sample
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

        {/* Output Section */}
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
            <Title level={5} style={{ margin: 0, color: "var(--text-color)" }}>Formatted Output</Title>
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
              message="Formatting Error"
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
            placeholder="Formatted JSON will appear here..."
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

      {/* Format Button */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <Button
          type="primary"
          icon={<FormatPainterOutlined />}
          onClick={handleFormat}
          loading={loading}
          size="large"
          style={{
            padding: "0 36px",
            height: "45px",
            fontSize: "16px",
            borderRadius: "12px",
            background: "linear-gradient(to right, #00c6ff, #0072ff)",
            boxShadow: "0 4px 14px rgba(0, 114, 255, 0.3)",
            fontWeight: 600
          }}
        >
          {loading ? "Formatting..." : "Format JSON"}
        </Button>
      </div>
    </div>
  );
}

export default JSONFormatter;