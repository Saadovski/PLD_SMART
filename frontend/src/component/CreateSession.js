import { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useHistory } from "react-router";
import { io } from "socket.io-client";
import { AuthContext } from "../context/authContext";
import { SocketContext } from "../context/socketContext";

function CreateSession() {
  const [joinSessionId, setJoinSessionId] = useState(null);
  const [socket, setSocket] = useState(null);
  const history = useHistory();
  const authContext = useContext(AuthContext);
  const socketContext = useContext(SocketContext);

  useEffect(() => {
    let socket = io();
    setSocket(socket);
    socket.on("group", (group) => {
      setSocket(io(`/${group.id}`));
      history.push(`/session/${group.id}`);
    });
  }, []);

  const generateSessionId = () => {
    socket.emit("createGroup", { userId: authContext.userId, token: authContext.token });

    const randomID = Math.floor(Math.random() * 100);
    history.push(`/session/${randomID}`);
  };

  const getSessionId = () => {
    window.location.href = `/session/${joinSessionId}`;
  };

  return (
    <div class="box-centre">
      <Container className="texte-centre">
        <h2>Créer une session</h2>

        <div class="bouton-vert-hover">
          <button className="bouton-vert-rempli" onClick={generateSessionId}>
            Créer une session
          </button>
        </div>
        <div className="separator">ou</div>
        <hr></hr>
        <h2>Rejoindre une session</h2>
        <form class="texte-centre">
          <label>
            <input class="box-sans-contour texte-vert texte-centre" type="text" onChange={(e) => setJoinSessionId(e.target.value)} placeholder="Numéro de session" />
          </label>
        </form>
        <div class="bouton-vert-hover">
          <button className="bouton-vert-rempli" onClick={getSessionId}>
            Rejoindre une session
          </button>
        </div>
      </Container>
    </div>
  );
}

export default CreateSession;
