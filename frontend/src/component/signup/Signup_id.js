import React, { useState } from "react";
import "../../styles/boutons.css";
import "../../styles/textes.css";
import "../../styles/box.css";

function Signup_id(props) {
  const [passwordConf, setPasswordConf] = useState("");
  const REACT_APP_API_URL = process.env.REACT_APP_API_URL || 'http://localhost:1024/api/';

  const handleSubmit = (e) => {
    e.preventDefault();
    if(props.password !== passwordConf) {
      //TODO Changer la target
      e.target.style.border = "1px solid red";
    }
    else {
      e.target.style.border = "";
      fetch(REACT_APP_API_URL+'user/check_username', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: props.username,
        }),
      })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.success);
        if (data.success === "true") {
          e.target.style.border = "";
          props.setState(2);
        }
        else {
          document.getElementById("username").style.border = "1px solid red";
        }
      });
    }
  };

  return (
    <div class="box-centre">
      <form class="texte-centre">
        <h3> Inscription </h3>
      <label>
          <input
            id="username"
            class="box-sans-contour texte-vert texte-centre"
            type="text"
            name="username"
            onChange={(event) => {props.setUsername(event.target.value)}}
            placeholder="Nom d'utilisateur"
          />
        </label>
        <label>
          <input
            class="box-sans-contour texte-vert texte-centre"
            type="password"
            name="password"
            onChange={(event) => {props.setPassword(event.target.value)} }
            placeholder="Mot de passe" />
        </label>
        <label>
          <input
            class="box-sans-contour texte-vert texte-centre"
            type="password"
            name="password"
            onChange={(event) => {setPasswordConf(event.target.value)} }
            placeholder="Confirmez votre mot de passe ici" />
        </label>
        <hr></hr>

        <div class="bouton-vert-hover">
        <button className="bouton-vert-rempli" type="submit" onClick={handleSubmit}>
          Valider
        </button>
        </div>

      <hr></hr>

      <div class="bouton-gris-hover box-en-bas">
        <button className="bouton-gris-rempli" onClick={(event) => {window.location.href="/connection"}}>
          Retour
        </button>
      </div>
      </form>

    </div>
  );
}

export default Signup_id;