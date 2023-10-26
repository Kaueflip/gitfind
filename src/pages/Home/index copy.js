import { useState } from "react";
import { Header } from "../../components/Header";
import { Button } from "../../components/Button";
import ItemList from "../../components/ItemList";

import background from "../../assets/img/background.png";
import "./styles.css";

function App() {
  const [user, setUser] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [repos, setRepos] = useState(null);

  const handleGetData = async () => {
    const userData = await fetch(`https://api.github.com/users/${user}`);
    const newUser = await userData.json();

    if (newUser.name) {
      const { avatar_url, name, bio } = newUser;
      setCurrentUser({ avatar_url, name, bio });

      const reposData = await fetch(
        `https://api.github.com/users/repos/${user}/repos`
      );
      const newRepos = await reposData.json();

      if (newRepos.lenght) {
        setRepos(newRepos);
      }
    }
  };
  return (
    <div className="App">
      <Header />
      <div className="conteudo">
        <img className="background" src={background} alt="Background app" />
        <div className="info">
          <div className="search">
            <input
              name="usuario"
              value={user}
              onChange={(event) => setUser(event.target.value)}
              placeholder="@username"
            />
            <Button onClick={handleGetData}></Button>
          </div>
          <div className="user-header">
            <img
              className="profile-img"
              src="https://avatars.githubusercontent.com/u/68357077?v=4"
              alt="Imagem de perfil"
            ></img>
            <div className="user-infos">
              <h2>Kauê Felipe</h2>
              <span>@Kaueflip</span>
              <p>Descrição</p>
            </div>
          </div>
          <hr />
          <div className="repos">
            <h3>Repositórios</h3>
            <ItemList
              title="testeTitle"
              description="Teste Descripion"
            ></ItemList>
            <ItemList
              title="testeTitle"
              description="Teste Descripion"
            ></ItemList>
            <ItemList
              title="testeTitle"
              description="Teste Descripion"
            ></ItemList>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
