const express = require('express');
const app = express();



//connection to database
require('dotenv').config();
require('./configuration/Db.js');



//this is basic setup of express server
app.get('/', (req, res) => {
  res.send('Server is running');
});




app.get('/api/', (req, res) => {
  res.send('API is working');
});

app.get('/api/json-history', (req, res) => {
  res.json([
    { _id: '1', json: '{"name": "John", "age": 30}' },
    { _id: '2', json: '{"name": "Jane", "age": 25}' },
    { _id: '3', json: '{"name": "Doe", "age": 40}' }
  ]);
});

app.delete('/api/json-history/:id', (req, res) => {
  const { id } = req.params;
  res.status(200).json({ message: `Item with id ${id} deleted successfully` });
});



const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

