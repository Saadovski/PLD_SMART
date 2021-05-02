import React, { useState } from "react";
import "../styles/boutons.css";
import "../styles/textes.css";
import "../styles/box.css";

function Signin() {

  const REACT_APP_API_URL = process.env.REACT_APP_API_URL || "http://localhost:1024/api/v1/";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting form...');
    console.log(`%c${username} ${password}`, 'color: #cc0000');

    fetch(REACT_APP_API_URL + 'users/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log('successfully logged');
          //const newToken = { token: data.token, expiration: new Date().getTime() + 1000 * 60 * 2 };
          //localStorage.setItem('projetpmToken', JSON.stringify({ token: newToken.token, expiration: newToken.expiration })); // 2h
          //authContext.login(newToken);
          document.querySelector('.connection-info').innerHTML = 'Connexion réussie !';
          //window.location.href = "/";
        } else {
          document.querySelector('.connection-info').innerHTML = 'La connexion a échoué';
        }
      });
  };

    return (
      <div class="box-centre">
      <form class="texte-centre">
      <label>
      <input class="box-sans-contour texte-vert texte-centre" type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Entrez votre nom d'utilisateur ici"/>
      </label>
      <label>
      <input class="box-sans-contour texte-vert texte-centre" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Entrez votre mot de passe ici"/>
      </label>
      <div>

      </div>
      <div class="bouton-vert-hover">
      <button class="bouton-vert-rempli texte-blanc" onClick={handleSubmit}>Connexion</button>
      </div>
      </form>
      </div>
    );
}

export default Signin;