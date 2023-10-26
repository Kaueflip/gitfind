import React, { useState, useEffect } from "react";
import { Header } from "../../components/Header";

import background from "../../assets/img/background.png";
import "./styles.css";
function App() {
  const [username, setUsername] = useState("");
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (username) {
      // Faz a solicitação à API do GitHub quando o usuário digita o nome do usuário
      setLoading(true);
      fetch(`https://api.github.com/users/${username}/repos`)
        .then((response) => response.json())
        .then((data) => {
          setRepositories(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Erro ao buscar repositórios:", error);
          setLoading(false);
        });
    } else {
      setRepositories([]);
    }
  }, [username]);

  return (
    <div className="App">
      <Header />
      <div className="conteudo">
        <img className="background" src={background} alt="Background app" />
        <div className="info">
          <div className="search">
            <input
              type="text"
              placeholder="Digite o nome de usuário do GitHub"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="repos">
            <h3>Repositórios</h3>

            {loading ? <p>Carregando...</p> : null}
            <div className="item-list">
              <ul>
                {Array.isArray(repositories) ? (
                  repositories.map((repo) => (
                    <li key={repo.id}>
                      <a
                        title={repo.name}
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <strong>{repo.name}</strong>
                      </a>
                      <p>{repo.description}</p>
                    </li>
                  ))
                ) : (
                  <p>Nenhum repositório encontrado.</p>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
