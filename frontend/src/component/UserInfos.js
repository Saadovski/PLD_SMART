import { useState } from "react";
import { Form, Button } from "react-bootstrap";

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
    <div className="container-fluid">
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
        <div>
          <Form.Group>
            <Form.Label>Confirmation du Mot de passe</Form.Label>
            <Form.Control type="password" readOnly={!isModifying} onChange={() => setHasChanged(true)} />
          </Form.Group>
          <Button variant="danger" className="float-left mt-3" onClick={() => setIsModifying(false)}>
            Annulé
          </Button>
          <Button className="float-left mt-3" onClick={handleModify}>
            Valider
          </Button>
        </div>
      ) : (
        <Button className="float-left mt-3" onClick={handleModify}>
          Modifier
        </Button>
      )}
    </div>
  );
}

export default UserInfos;
