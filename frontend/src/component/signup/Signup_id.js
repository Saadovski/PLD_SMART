import React, { useState } from "react";
import { Form } from 'react-bootstrap';
import "../../styles/boutons.css";
import "../../styles/textes.css";
import "../../styles/box.css";

function Signup_id(props) {
  const [passwordConf, setPasswordConf] = useState("");
  const REACT_APP_API_URL = process.env.REACT_APP_API_URL || 'http://localhost:1024/api/';

  const handleOnChangeUser = (e) => {
		e.preventDefault();
    props.setUsername(e.target.value);

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
      if (data.success) {
        e.target.style.border = "";
      }
      else {
        e.target.style.border = "1px solid red";
      }
    });
	};

  const handleSubmit = (e) => {
    if(props.password !== passwordConf) {
      //TODO Changer la target
      e.target.style.border = "1px solid red";
    }
    else {
      e.target.style.border = "";
      e.preventDefault();
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
        if (data.success) {
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
      <Form class="texte-centre">
        <Form.Group controlId="UsernameForm">
          <Form.Label>Nom d'utilisateur</Form.Label>
          <Form.Control class="box-sans-contour texte-vert texte-centre"  type="username" placeholder="Nom d'utilisateur..." onChange={(event) => {props.setUsername(event.target.value)}} />
        </Form.Group>
        <Form.Group controlId="PasswordForm">
          <Form.Label>Mot de passe</Form.Label>
          <Form.Control class="box-sans-contour texte-vert texte-centre"  type="password" placeholder="Mot de passe..." onChange={(event) => {props.setPassword(event.target.value)} }/>
        </Form.Group>
        <Form.Group controlId="PasswordConfForm">
          <Form.Label>Confirmation du mot de passe</Form.Label>
          <Form.Control class="box-sans-contour texte-vert texte-centre"  type="password" placeholder="Confirmation..." onChange={(event) => {setPasswordConf(event.target.value)} }/>
        </Form.Group>
        <div class="bouton-vert-hover">
        <button className="bouton-vert-rempli texte-blanc" type="submit" onClick={handleSubmit}>
          Valider
        </button>
        </div>
      </Form>
      <div class="bouton-gris-hover box-en-bas">
        <button className="bouton-gris-rempli texte-blanc" onClick={(event) => {window.location.href="/connection"}}>
          Retour
        </button>
      </div>
    </div>
  );
}

export default Signup_id;