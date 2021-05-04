import { useHistory, useParams } from "react-router";
import "../styles/boutons.css";
import "../styles/textes.css";
import "../styles/box.css";
import { useContext, useEffect } from "react";
import { SocketContext } from "../context/socketContext";
import { io } from "socket.io-client";

function SessionPage() {
  const { id } = useParams();
  const socketContext = useContext(SocketContext);
  const history = useHistory();

  useEffect(() => {
    const socket = io(`/${id}`);
    socket.on("connect", () => {
      console.log("connected to server socket");
    });
    socketContext.connectToSession(socket.id, socket, id);
  }, []);

  return (
    <div class="box-centre">
      <div class="box-en-haut">Session {id}</div>
      <div class="bouton-gris-hover">
        <button
          className="bouton-gris-rempli texte-blanc"
          onClick={() => {
            history.push("/Swipe");
          }}
        >
          Swiper
        </button>
      </div>
    </div>
  );
}

export default SessionPage;
