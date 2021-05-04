import { AuthContext } from "../../context/authContext";
import { useHistory } from "react-router";
import React, { useContext, useEffect } from "react";
import "../../styles/textes.css";
import "../../styles/box.css";
import { io } from "socket.io-client";
import { SocketContext } from "../../context/socketContext";

function Mood(props) {
  const genres = ["Action", "Adventure", "Anime", "Comedy", "Documentary", "Drama", "Fantasy", "Horror", "Family", "Musical", "Mystery", "Crime", "Romance", "Thriller", "Sci-Fi"];
  const authContext = useContext(AuthContext);
  const history = useHistory();
  const socketContext = useContext(SocketContext);

  useEffect(() => {
    socketContext.socket.on("group", (group) => {
      socketContext.updateGroup(group);
    });
  }, []);

  const addMood = () => {
    let profile = [];
    for (let i = 0; i < genres.length; i++) {
      if (document.querySelector("#" + genres[i]).checked === true) {
        profile.push(genres[i]);
        console.log("i:" + i);
      }
    }
    socketContext.socket.emit("addMood", {
      auth: {
        id: authContext.userId,
        token: authContext.token,
      },
      groupId: socketContext.idSession,
      mood: profile,
    });
    console.log("profile", profile);
  };

  return (
    <div className="box-centre">
      <div className="signup_profile texte-centre">
        <h3>Choisissez les genres du Mood</h3>
        <div className="genres_Container">
          {genres.map((genre, index) => {
            return (
              <div className="genre list-input-vert" key={index}>
                <input type="checkbox" id={genre} name={genre} />
                <label htmlFor="scales">{genre}</label>
              </div>
            );
          })}
        </div>
        <div className="bouton-vert-hover">
          <button
            className="bouton-vert-rempli"
            type="submit"
            onClick={() => {
              addMood();
              history.push("/session/" + socketContext.idSession);
            }}
          >
            Valider les moods
          </button>
        </div>
      </div>
    </div>
  );
}

export default Mood;
