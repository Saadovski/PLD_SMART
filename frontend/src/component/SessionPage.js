import { useHistory, useParams } from "react-router";
import "../styles/boutons.css";
import "../styles/textes.css";
import "../styles/box.css";
import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../context/socketContext";
import { AuthContext } from "../context/authContext";
import PopUpSpinner from "./PopUpSpinner";
import { Button } from "react-bootstrap";

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
    const spinner = document.getElementsByClassName("PopUp")[0];
    spinner.classList.toggle("hide");
    socket.emit("ready", {
      auth: {
        id: userId,
        token: token,
      },
    });
  };

  useEffect(() => {
    setGroup(socketContext.group);
    socketContext.socket.on("group", (group) => {
      setGroup(group);
      socketContext.updateGroup(group);
    });

    socketContext.socket.on("start", (group) => {
      socketContext.updateGroup(group);
      history.push("/swipe");
    });

    socketContext.socket.on("ready", (group) => {
      const spinner = document.getElementsByClassName("PopUp")[0];
      spinner.classList.toggle("hide");
    });
  }, []);

  return (
    <div class="box-centre">
      <div><h4 class="box-en-haut">Session <span className="texte-vert">{id}</span></h4></div>
      <div class="texte-centre">
        <h4>Chef du groupe : {owner}</h4>
        <h4>Mood selectionnés : {socketContext.group.mood.length > 0 ? socketContext.group.mood.map((e) => {
          return <div className="texte-vert">{e}</div>
        }) : "Aucun mood selectionné"}</h4>
        <div className="users">
          <h4>Utilisateurs connectés : </h4>
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
              }}
            >
              Ready
            </button>
          </div>
        )}
      </div>
      <PopUpSpinner text="Chargement de la session ..." />
    </div>
  );
}

export default SessionPage;
