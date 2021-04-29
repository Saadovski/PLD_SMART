import { Container, Button, Form } from "react-bootstrap";

function CreateSession() {

  const generateSessionId = () => {
    const randomID = Math.floor(Math.random() * 100);
    window.location.href=`/session/${randomID}`;
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
