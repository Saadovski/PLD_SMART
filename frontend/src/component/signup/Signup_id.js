import React, { useState } from "react";
import { Form } from 'react-bootstrap';
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
          e.target.style.border = "1px solid red";
        }
      });
    }
  };

  return (
    <div class="box-centre">
      <form class="texte-centre">
      <label>
          <input
            class="box-sans-contour texte-vert texte-centre"
            type="text"
            name="username"
            onChange={(event) => {props.setUsername(event.target.value)}}
            placeholder="Entrez votre nom d'utilisateur ici"
          />
        </label>
        <label>
          <input
            class="box-sans-contour texte-vert texte-centre"
            type="password"
            name="password"
            onChange={(event) => {props.setPassword(event.target.value)} } placeholder="Entrez votre mot de passe ici" />
        </label>
        <label>
          <input
            class="box-sans-contour texte-vert texte-centre"
            type="password"
            name="password"
            onChange={(event) => {setPasswordConf(event.target.value)} } placeholder="Confirmez votre mot de passe ici" />
        </label>
        <div class="bouton-vert-hover">
        <button className="bouton-vert-rempli texte-blanc" type="submit" onClick={handleSubmit}>
          Valider
        </button>
        </div>
      </form>
      <div class="bouton-gris-hover box-en-bas">
        <button className="bouton-gris-rempli texte-blanc" onClick={(event) => {window.location.href="/connection"}}>
          Retour
        </button>
      </div>
    </div>
  );
}

export default Signup_id;