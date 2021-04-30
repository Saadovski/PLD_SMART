import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "../styles/boutons.css";
import "../styles/textes.css";
import "../styles/box.css";

function UserInfos() {
  const [isModifying, setIsModifying] = useState(false);
  const [hasChanged, setHasChanged] = useState(false);
  const [username, setUsername] = useState("user name");
  const [password, setPassword] = useState("password");

  const handleModify = () => {
    setIsModifying(!isModifying);

    if (isModifying && hasChanged) {
      alert("Vos données ont été mises à jour");
    }
  };
  return (
    <div className="container-fluid texte-centre">
      <Form.Group>
        <Form.Label>Nom d'utilisateur</Form.Label>
        <Form.Control
          type="text"
          value={username}
          readOnly={!isModifying}
          onChange={(e) => {
            setHasChanged(true);
            setUsername(e.target.value);
          }}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Mot de passe</Form.Label>
        <Form.Control
          type="password"
          value={password}
          readOnly={!isModifying}
          onChange={(e) => {
            setHasChanged(true);
            setPassword(e.target.value);
          }}
        />
      </Form.Group>

      {isModifying ? (
        <div class="texte-centre">
          <Form.Group>
            <Form.Label>Confirmation du Mot de passe</Form.Label>
            <Form.Control type="password" readOnly={!isModifying} onChange={() => setHasChanged(true)} />
          </Form.Group>
          <div className="bouton-vert-hover">
          <button className="bouton-vert-rempli" onClick={handleModify}>
            Valider
          </button>
          </div>
          <hr></hr>
          <div className="bouton-gris-hover">
          <button className="bouton-gris-rempli" onClick={() => setIsModifying(false)}>
            Annuler
          </button>
          </div>


        </div>
      ) : (
        <div className="bouton-vert-hover">
        <button className="bouton-vert-rempli" onClick={handleModify}>
          Modifier
        </button>
        </div>
      )}
    </div>
  );
}

export default UserInfos;
