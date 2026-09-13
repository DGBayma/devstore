const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, 'devstore.db'));

db.exec(`
  CREATE TABLE IF NOT EXISTS linguagens (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    hype INTEGER NOT NULL,
    descricao TEXT
  );

  CREATE TABLE IF NOT EXISTS produtos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    preco REAL NOT NULL,
    categoria TEXT,
    descricao TEXT
  );
`);

const count = db.prepare('SELECT COUNT(*) as total FROM linguagens').get();
if (count.total === 0) {
  const insertLang = db.prepare('INSERT INTO linguagens (nome, hype, descricao) VALUES (?, ?, ?)');
  insertLang.run('TypeScript', 95, 'O queridinho do mercado, tipagem forte e cada vez mais adotado.');
  insertLang.run('Rust', 92, 'A linguagem mais amada pelos devs, focada em performance e seguranca.');
  insertLang.run('Python', 90, 'Rainha da IA e ciencia de dados, sempre no topo.');
  insertLang.run('Go', 85, 'Simples, rapida e perfeita para microsservicos.');
  insertLang.run('JavaScript', 88, 'Onipresente na web, base de tudo no frontend.');

  const insertProd = db.prepare('INSERT INTO produtos (nome, preco, categoria, descricao) VALUES (?, ?, ?, ?)');
  insertProd.run('Curso Completo de TypeScript', 199.90, 'Curso', 'Do zero ao avancado com projetos reais.');
  insertProd.run('E-book Rust para Iniciantes', 49.90, 'Livro', 'Aprenda a linguagem mais amada do momento.');
  insertProd.run('Teclado Mecanico Dev', 450.00, 'Hardware', 'Switch azul, RGB e layout ABNT2.');
  insertProd.run('Assinatura Copilot Pro', 99.90, 'Ferramenta', 'IA que escreve codigo com voce.');
  insertProd.run('Camiseta Hello World', 79.90, 'Vestuario', 'Algodao premium, estampa minimalista.');
}

module.exports = db;
