const express = require('express');
const app = express();

app.get('/health', (req, res) => {
  console.log('Health check hit!');
  res.json({ status: 'working' });
});

app.listen(3003, () => {
  console.log('Test server on port 3003');
});