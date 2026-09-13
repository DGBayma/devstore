const express = require('express');
const cors = require('cors');
const db = require('./database');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'API DevStore rodando' });
});

app.get('/api/linguagens', (req, res) => {
  const linguagens = db.prepare('SELECT * FROM linguagens ORDER BY hype DESC').all();
  res.json(linguagens);
});

app.get('/api/produtos', (req, res) => {
  const produtos = db.prepare('SELECT * FROM produtos').all();
  res.json(produtos);
});

app.get('/api/produtos/:id', (req, res) => {
  const produto = db.prepare('SELECT * FROM produtos WHERE id = ?').get(req.params.id);
  if (!produto) return res.status(404).json({ error: 'Produto nao encontrado' });
  res.json(produto);
});

app.listen(PORT, () => {
  console.log('Backend rodando em http://localhost:' + PORT);
});
