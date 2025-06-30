const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
app.use(cors({
  origin: [
    'https://dev-toolbox-ishantripathi-frontend.onrender.com',
    'http://localhost:3000', // for local development
    'http://localhost:5173' // for Vite dev server
  ],
  credentials: true
}));

app.use(bodyParser.json());

const mongoUrl = process.env.MONGO_URI;
const client = new MongoClient(mongoUrl);
let db;

// Health check routes (these should work even before DB connection)
app.get('/', (req, res) => {
  res.json({ message: 'Backend is running!' });
});

app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    dbConnected: !!db 
  });
});

// Database connection
client.connect()
  .then(() => {
    db = client.db("dev_toolbox");
    console.log("Connected to MongoDB");
  })
  .catch(err => {
    console.error("MongoDB connection failed:", err);
  });

// JSON formatting endpoint
app.post("/format-json", async (req, res) => {
  if (!db) return res.status(500).json({ success: false, error: "Database not connected yet" });
  
  const { json } = req.body;
  try {
    const parsed = JSON.parse(json);
    const formatted = JSON.stringify(parsed, null, 4);
    
    await db.collection("json_history").insertOne({
      json: formatted,
      timestamp: new Date()
    });
    
    res.json({ success: true, formatted });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Base64 encoding endpoint
app.post("/encode", (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "Text is required" });
  
  const encoded = Buffer.from(text, "utf-8").toString("base64");
  res.json({ success: true, encoded });
});

// Base64 decoding endpoint
app.post("/decode", (req, res) => {
  const { base64 } = req.body;
  if (!base64) return res.status(400).json({ error: "Base64 string is required" });
  
  try {
    const decoded = Buffer.from(base64, "base64").toString("utf-8");
    res.json({ success: true, decoded });
  } catch (err) {
    res.status(400).json({ success: false, error: "Invalid base64 input" });
  }
});

// JSON history endpoint
app.get("/api/json-history", async (req, res) => {
  if (!db) {
    return res.status(500).json({ 
      success: false, 
      error: "Database not connected yet" 
    });
  }
  
  try {
    const history = await db
      .collection("json_history")
      .find({})
      .sort({ timestamp: -1 })
      .limit(100)
      .toArray();
    
    res.status(200).json(history);
  } catch (err) {
    console.error("Error fetching JSON history:", err);
    res.status(500).json({ success: false, error: "Failed to fetch history." });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ success: false, error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});