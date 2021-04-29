import { useState } from "react";
import { Container, Button, Form } from "react-bootstrap";
import { Redirect } from "react-router";

function CreateSession() {

  const generateSessionId = () => {
    const randomID = Math.random() * 100;
    <Redirect to={{ pathname: `/session/${randomID}` }} />;
  };

  return (
    <Container>
      <Button onClick={generateSessionId}>Créer une session</Button>
      <div className="separator">ou</div>
      <div>Rejoindre une session</div>
      <Form.Control type="text" placeholder="Numéro de session"></Form.Control>
    </Container>
  );
}

export default CreateSession;
