import { useState } from "react";
import { Container, Button, Form } from "react-bootstrap";

function CreateSession() {

  const [joinSessionId, setJoinSessionId] = useState(null);

  const generateSessionId = () => {
    const randomID = Math.floor(Math.random() * 100);
    window.location.href = `/session/${randomID}`;
  };

  const getSessionId = () => {
    window.location.href = `/session/${joinSessionId}`;
  }

  return (
    <div class="box-centre">
      <Container className="texte-centre">
        <h2>Créer une session</h2>

        <div class="bouton-vert-hover">
          <button className="bouton-vert-rempli" onClick={generateSessionId}>Créer une session</button>
        </div>
        <div className="separator">ou</div>
        <hr>
        </hr>
        <h2>Rejoindre une session</h2>
        <form class="texte-centre">
          <label>
            <input class="box-sans-contour texte-vert texte-centre" type="text" onChange={(e) => setJoinSessionId(e.target.value)} placeholder="Numéro de session" />
          </label>
        </form>
        <div class="bouton-vert-hover">
          <button className="bouton-vert-rempli" onClick={getSessionId}>Rejoindre une session</button>
        </div>
      </Container>
    </div>
  );
}

export default CreateSession;
