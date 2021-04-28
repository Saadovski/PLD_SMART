import { Link } from "react-router-dom";
import React, { useState } from "react";
import { Form, Button } from 'react-bootstrap';

function Signup() {
	const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");

  const handleSubmit = (e) => {
    if(password !== passwordConf) {
      console.log("pas meme mdp");
    }
    else {
      console.log("signin up");
      e.preventDefault();
      fetch('users/login', {
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
          console.log("Data success");
        }
      });
    }
  };

  return (
    <div className="signin-container">
      <Form>
        <Form.Group controlId="UsernameForm">
          <Form.Label>Nom d'utilisateur</Form.Label>
          <Form.Control type="username" placeholder="Nom d'utilisateur..." onChange={(event) => {setUsername(event.target.value)} }/>
        </Form.Group>
        <Form.Group controlId="PasswordForm">
          <Form.Label>Mot de passe</Form.Label>
          <Form.Control type="password" placeholder="Mot de passe..." onChange={(event) => {setPassword(event.target.value)} }/>
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
          <Link to="/" className="btn btn-primary">Retour</Link>
        </div>
      </div>
  );
}

export default Signup;