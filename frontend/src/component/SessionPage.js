import { useHistory, useParams } from "react-router";
import "../styles/boutons.css";
import "../styles/textes.css";
import "../styles/box.css";
import { useContext, useEffect } from "react";
import { SocketContext } from "../context/socketContext";
import { io } from "socket.io-client";
import { AuthContext } from "../context/authContext";

function SessionPage() {
  const { id } = useParams();
  const socketContext = useContext(SocketContext);
  const history = useHistory();
  const owner = socketContext.group.owner;
  const username = AuthContext.username;
  const userId = AuthContext.userId;
  const token = AuthContext.token;
  const socket = socketContext.socket;

  const ready = () =>{
    socket.emit('ready', 
    {
      auth: {
        id: userId,
        token: token,
        },
    })
}

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
      <div class="texte-centre">

      {owner === username && 
      <div className="bouton-vert-hover">
      <button 
      className="bouton-vert-rempli"
      onClick={()=>history.push("/ChoisirMood")}>
        Choisir le mood</button>
        </div>}
        <hr></hr>
      {owner === username && 
        <div className="bouton-gris-hover">
          <button
          className="bouton-gris-rempli texte-blanc"
          onClick={() => {
            //ready();
            history.push("/Avance");
          }}
        >
          Ready
        </button></div>
        }
      </div>
    </div>
  );
}

export default SessionPage;
