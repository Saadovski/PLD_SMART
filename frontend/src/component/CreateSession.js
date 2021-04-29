import { Container, Button, Form } from "react-bootstrap";

function CreateSession() {

  const generateSessionId = () => {
    const randomID = Math.floor(Math.random() * 100);
    window.location.href=`/session/${randomID}`;
  };

  return (
    <div class="box-centre">
    <Container className="texte-centre bouton-vert-hover">
      <button className="bouton-vert-rempli" onClick={generateSessionId}>Créer une session</button>
      <div className="separator">ou</div>
      <div>Rejoindre une session</div>
      <Form.Control type="text" placeholder="Numéro de session"></Form.Control>
    </Container>
    </div>
  );
}

export default CreateSession;
