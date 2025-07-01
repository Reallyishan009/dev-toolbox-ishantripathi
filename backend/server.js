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
  res.json({ message: 'API is working' });
  res.send('API is working');
});




const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

