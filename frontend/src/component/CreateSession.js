import { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useHistory } from "react-router";
import { io } from "socket.io-client";
import { AuthContext } from "../context/authContext";
import { SocketContext } from "../context/socketContext";
import "../styles/createSession.css";

function CreateSession() {
  const [joinSessionId, setJoinSessionId] = useState(null);
  const [socket, setSocket] = useState(null);
  const history = useHistory();
  const authContext = useContext(AuthContext);
  const socketContext = useContext(SocketContext);
  const URL = process.env.REACT_APP_SESSION_URL || "http://localhost:1024";

  useEffect(() => {
    let newSocket = io(URL);
    setSocket(newSocket);

    newSocket.on("error", (error) => {
      alert(error.message);
    });

    newSocket.on("group", (group) => {
      socketContext.updateGroup(group);
      socketContext.connectToSession(newSocket.id, newSocket, group.groupId);
      history.push(`/session/${group.groupId}`);
    });
  }, []);

  const createASession = () => {
    socket.emit("openGroup", {
      auth: { id: authContext.userId, token: authContext.token },
    });

    // const randomID = Math.floor(Math.random() * 100);
    // history.push(`/session/${randomID}`);
  };

  const joinASession = () => {
    socket.emit("joinGroup", {
      auth: { id: authContext.userId, token: authContext.token },
      groupId: joinSessionId,
    });
  };

  return (
    <div class="box-centre">
      <Container className="texte-centre createSessionBox">
        <h2>Créer une session</h2>

        <div class="bouton-gris-hover">
          <button className="bouton-gris-rempli" onClick={createASession}>
            Créer une session
          </button>
        </div>
        <hr></hr>
        <h2>Rejoindre une session</h2>
        <form class="texte-centre">
          <label>
            <input class="box-sans-contour texte-vert texte-centre" type="text" onChange={(e) => setJoinSessionId(e.target.value)} placeholder="Numéro de session" />
          </label>
        </form>
        <div class="bouton-vert-hover">
          <button className="bouton-vert-rempli" onClick={joinASession}>
            Rejoindre une session
          </button>
        </div>
      </Container>
    </div>
  );
}

export default CreateSession;
