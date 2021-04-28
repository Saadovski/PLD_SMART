import { useState } from "react";
import { Form, Button } from "react-bootstrap";

function UserInfos() {
  const [isModifying, setIsModifying] = useState(false);
  const [hasChanged, setHasChanged] = useState(false);
  const [email, setEmail] = useState("user email");
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
      <Form.Control
        type="text"
        value={email}
        readOnly={!isModifying}
        onChange={(e) => {
          setHasChanged(true);
          setEmail(e.target.value);
        }}
      />
      <Form.Control
        type="text"
        value={username}
        readOnly={!isModifying}
        onChange={(e) => {
          setHasChanged(true);
          setUsername(e.target.value);
        }}
      />
      <Form.Control
        type="password"
        value={password}
        readOnly={!isModifying}
        onChange={(e) => {
          setHasChanged(true);
          setPassword(e.target.value);
        }}
      />
      <Form.Control type="password" readOnly={!isModifying} onChange={() => setHasChanged(true)} />
      {isModifying ? (
        <div>
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
