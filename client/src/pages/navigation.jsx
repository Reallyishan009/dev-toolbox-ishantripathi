import React from "react";
import { Dropdown, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const NavigationMenu = () => {
  const navigate = useNavigate();

  const items = [
    {
        key: "home",
        label: <span onClick={() => navigate("/")}>Home</span>,
    },
    {
        key: "json-formatter",
        label: <span onClick={() => navigate("/json-formatter")}>JSON Formatter</span>,
    },  
    {
        key: "base64",
        label: <span onClick={() => navigate("/base64")}>BASE64 Encoder/Decoder</span>,
    },
    {
    key: "json-history",
    label: <span onClick={() => navigate("/json-history")}>JSON History</span>,
    },
  ];


  return (
    <Dropdown menu={{ items }} placement="bottomLeft" arrow>
      <Button icon={<MenuOutlined />} />
    </Dropdown>
  );
};

export default NavigationMenu;
