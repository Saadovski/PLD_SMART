import React, { useContext, useEffect, useState } from "react";
import "../styles/boutons.css";
import "../styles/textes.css";
import "../styles/box.css";
import { AuthContext } from "../context/authContext";
import { useHistory } from "react-router";

function Signin(props) {
  const REACT_APP_API_URL = process.env.REACT_APP_API_URL || "http://localhost:1024/api/";

  const [username, setUsername] = useState("nom d'utilisateur");
  const [password, setPassword] = useState("password");

  const authContext = useContext(AuthContext);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting form...");
    console.log(`%c${username} ${password}`, "color: #cc0000");

    fetch(REACT_APP_API_URL + "user/connexion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log("successfully logged");
          authContext.login(data.token, data.userId, username);
          history.push("/monespace");

        } else {
          alert('La connexion a échouée');
        }
      });
  };

  return (
    <div class="box-centre">
      {props.location.state?.from && (
        <div className="texte-centre isRedirected">
          <h2>Pour accéder à cette page, veuillez vous connecter</h2>
        </div>
      )}
              <h3> Connexion </h3>

      <form className="texte-centre">
        <label>
          <input
            className="box-sans-contour texte-vert texte-centre"
            type="text"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Nom d'utilisateur"
          />
        </label>
        <label>
          <input
            className="box-sans-contour texte-vert texte-centre"
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de passe"
          />
        </label>
        <hr></hr>
        <div className="bouton-vert-hover">
          <button className="bouton-vert-rempli" onClick={handleSubmit}>
            Connexion
          </button>
        </div>
      <hr></hr>
      <div className="bouton-gris-hover box-en-bas">
        <button className="bouton-gris-rempli" onClick={(event) => {window.location.href="/connection"}}>
          Retour
        </button>
      </div>
      </form>

    </div>
  );
}

export default Signin;
