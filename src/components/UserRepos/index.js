import React, { useState, useEffect } from "react";

const UserRepos = ({ username }) => {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    const fetchRepos = async () => {
      const response = await fetch(
        `https://api.github.com/users/${username}/repos`
      );
      const data = await response.json();
      setRepos(data);
    };

    fetchRepos();
  }, [username]);

  return (
    <div>
      <h3>Repositórios</h3>
      {repos.map((repo) => (
        <div key={repo.id}>
          <h4>{repo.name}</h4>
          <p>{repo.description}</p>
        </div>
      ))}
    </div>
  );
};

export default UserRepos;
