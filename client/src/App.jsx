import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import JSONFormatter from "../src/components/JSONFormatter.jsx";
import Base64Tool from "../src/components/Base64Tool.jsx";
import Home from "../src/pages/Home.jsx";
import JSONHistoryPage from "../src/pages/JSONHistoryPage.jsx";


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/json-formatter" element={<JSONFormatter />} />
      <Route path="/base64" element={<Base64Tool />} />
      <Route path="/json-history" element={<JSONHistoryPage />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;