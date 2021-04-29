import React, { useState } from "react";
import { Form, Button } from 'react-bootstrap';

function Signup_id(props) {
  const [passwordConf, setPasswordConf] = useState("");

  const handleSubmit = (e) => {
    if(props.password !== passwordConf) {
      console.log("pas meme mdp");
      props.setState(2);
    }
    else {
      console.log("signin up");
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
          console.log("Success");
          props.setState(2);
        }
        else {
          console.log("Failed");
        }
      });
    }
  };

  return (
    <div className="signin-container">
      <Form>
        <Form.Group controlId="UsernameForm">
          <Form.Label>Nom d'utilisateur</Form.Label>
          <Form.Control type="username" placeholder="Nom d'utilisateur..." onChange={(event) => {props.setUsername(event.target.value)} }/>
        </Form.Group>
        <Form.Group controlId="PasswordForm">
          <Form.Label>Mot de passe</Form.Label>
          <Form.Control type="password" placeholder="Mot de passe..." onChange={(event) => {props.setPassword(event.target.value)} }/>
        </Form.Group>
        <Form.Group controlId="PasswordConfForm">
          <Form.Label>Confirmation du mot de passe</Form.Label>
          <Form.Control type="password" placeholder="Confirmation..." onChange={(event) => {setPasswordConf(event.target.value)} }/>
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Valider
        </Button>
      </Form>
      <div>
        <Button className="btn btn-primary" onClick={(event) => {window.location.href="/connexion"}}>Retour</Button>
      </div>
    </div>
  );
}

export default Signup_id;