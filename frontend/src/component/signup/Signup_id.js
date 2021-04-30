import React, { useState } from "react";
import { Form, Button } from 'react-bootstrap';
import "../../styles/Boutons.css";
import "../../styles/Textes.css";
import "../../styles/Box.css";

function Signup_id(props) {
  const [passwordConf, setPasswordConf] = useState("");

  const handleOnChangeUser = (e) => {
		e.preventDefault();
    props.setUsername(e.target.value);

    fetch('check_username', {
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
    console.log(props.password);
    console.log(passwordConf);
    if(props.password !== passwordConf) {
      //TODO Changer la target
      e.target.style.border = "1px solid red";
    }
    else {
      e.target.style.border = "";
      props.setState(2);
      e.preventDefault();
      fetch('check_username', {
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
          <Form.Control class="box-sans-contour texte-vert texte-centre"  type="username" placeholder="Nom d'utilisateur..." onChange={handleOnChangeUser}/>
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
        <button className="bouton-gris-rempli texte-blanc" onClick={(event) => {window.location.href="/connection"}}>Retour</button>
      </div>
    </div>
  );
}

export default Signup_id;