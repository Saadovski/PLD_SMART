import { useHistory, useParams } from "react-router";
import "../styles/boutons.css";
import "../styles/textes.css";
import "../styles/box.css";
import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../context/socketContext";
import { io } from "socket.io-client";
import { AuthContext } from "../context/authContext";

function SessionPage() {
  const { id } = useParams();
  const socketContext = useContext(SocketContext);
  const authContext = useContext(AuthContext);
  const history = useHistory();
  const owner = socketContext.group.owner;
  const username = authContext.username;
  const userId = authContext.userId;
  const token = authContext.token;
  const [socket, setSocket] = useState(socketContext.socket);
  const [group, setGroup] = useState(socketContext.group);

  const ready = () => {
    socket.emit("ready", {
      auth: {
        id: userId,
        token: token,
      },
    });
  };

  useEffect(() => {
    setGroup(socketContext.group);
    console.log("Socket context", socketContext);
    socketContext.socket.on("group", (group) => {
      setGroup(group);
      socketContext.updateGroup(group);
      console.log("Nouveau message group", group);
    });

    socketContext.socket.on("test", (test) => {
      console.log("test message", test);
    });
  }, []);

  return (
    <div class="box-centre">
      <div class="box-en-haut">Session {id}</div>
      <div class="texte-centre">
        <h3>Chef du groupe : {owner.username}</h3>
        <div className="users">
          <h3>Utilisateurs connectés : </h3>
          {socketContext.group.users.map((u, index) => {
            return (
              <div className="userElement" key={index}>
                {u}
              </div>
            );
          })}
        </div>

        {owner === username && (
          <div className="bouton-vert-hover">
            <button className="bouton-vert-rempli" onClick={() => history.push("/choisirMood")}>
              Choisir le mood
            </button>
          </div>
        )}
        <hr></hr>
        {owner === username && (
          <div className="bouton-gris-hover">
            <button
              className="bouton-gris-rempli texte-blanc"
              onClick={() => {
                ready();
                history.push("/Avance");
              }}
            >
              Ready
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SessionPage;
