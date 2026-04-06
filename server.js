// server.js
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public')); // where your HTML/CSS/JS/images live

let cart = [];

app.get('/cart', (req, res) => res.json(cart));

app.post('/cart/add', (req, res) => {
  const item = req.body;
  cart.push(item);
  return res.sendStatus(200);
});

app.delete('/cart/remove/:index', (req, res) => {
  const idx = parseInt(req.params.index, 10);
  if (idx >= 0 && idx < cart.length) {
    cart.splice(idx, 1);
    return res.sendStatus(200);
  }
  return res.sendStatus(404);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
