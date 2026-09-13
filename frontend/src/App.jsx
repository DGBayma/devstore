import { useEffect, useState } from 'react';

function App() {
  const [linguagens, setLinguagens] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/linguagens').then(r => r.json()),
      fetch('/api/produtos').then(r => r.json())
    ]).then(([langs, prods]) => {
      setLinguagens(langs);
      setProdutos(prods);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="loading">Carregando DevStore...</div>;

  return (
    <div className="app">
      <header>
        <h1>DevStore</h1>
        <p>A loja feita por devs, para devs</p>
      </header>

      <section className="section">
        <h2>Linguagens mais hypadas do momento</h2>
        <div className="grid">
          {linguagens.map(lang => (
            <div key={lang.id} className="card lang-card">
              <h3>{lang.nome}</h3>
              <div className="hype-bar">
                <div className="hype-fill" style={{ width: lang.hype + '%' }}></div>
              </div>
              <span className="hype-value">{lang.hype}% de hype</span>
              <p>{lang.descricao}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>Produtos em destaque</h2>
        <div className="grid">
          {produtos.map(prod => (
            <div key={prod.id} className="card product-card">
              <span className="categoria">{prod.categoria}</span>
              <h3>{prod.nome}</h3>
              <p>{prod.descricao}</p>
              <div className="preco">R$ {prod.preco.toFixed(2)}</div>
              <button>Comprar</button>
            </div>
          ))}
        </div>
      </section>

      <footer>
        <p>DevStore 2025 - Feito com React + Node + SQLite</p>
      </footer>
    </div>
  );
}

export default App;
