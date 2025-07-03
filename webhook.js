// webhook.js
const express = require('express');
const app = express();
app.use(express.json());

app.post('/webhook', (req, res) => {
  console.log('Webhook received:', req.body);
  res.send('OK');
});

app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});
