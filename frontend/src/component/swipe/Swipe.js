import React, { useState, useContext, useMemo, useEffect } from "react";
import { SocketContext } from "../../context/socketContext";
import MovieCard from "./index";
import { AuthContext } from "../../context/authContext";
import { useHistory } from "react-router";
import Match from "./Match";

import "../../styles/textes.css";
import "../../styles/box.css";
import "../../styles/swipe.css";
import "../../styles/boutons.css";

const alreadyRemoved = [];

function Swipe() {
  const history = useHistory();
  const [MovieIndex, setMovieIndex] = useState(0);
  const [lastDirection, setLastDirection] = useState(null);
  const socketContext = useContext(SocketContext);
  const authContext = useContext(AuthContext);
  const owner = socketContext.group.owner;
  const username = authContext.username;
  const userId = authContext.userId;
  const token = authContext.token;
  const groupId = socketContext.group.groupId;
  const socket = socketContext.socket;
  const Movies = socketContext.group.films;
  const [selectedMovie,setSelectedMovie] = useState(Movies[0]);

  useEffect(() => {
    socket.on("group", (group) => {
      socketContext.updateGroup(group);
      window.addEventListener("beforeunload", () => {
        socket.disconnect();
        history.push("/");
      });
    });

    socketContext.socket.on("printRanking", (ranking) => {
      console.log("Ranking", ranking);
    });
  }, []);

  const swipeMovie = (avis) => {
    const filmId = Movies[MovieIndex].netflixid;
    socket.emit("swipe", {
      auth: {
        id: userId,
        token: token,
      },
      groupId,
      filmId,
      avis,
    });
  };

  const interrompreSwipe = () => {
    socket.emit("interruptSwipe", {
      auth: {
        id: userId,
        token: token,
      },
      groupId,
    });
  };

  const swiped = (direction, nameToDelete) => {
    console.log("removing: " + nameToDelete);
    setLastDirection(direction);
    alreadyRemoved.push(nameToDelete);
    if (direction === "left") {
      swipeMovie(false)
    }
    else {
      swipeMovie(true)
    }
  };

  socket.on('printMatch', (data) =>{
    console.log("received a match");
    console.log(data);
//    const movie = Movies.find((m) => m.netflixid === data.filmId);
    var indiceMovie;
    for (var i=0; i<Movies.length;i++){
      console.log(i);
      console.log(Movies[i].netflixid);
      if(Movies[i].netflixid == data.filmId){
        indiceMovie = i;
      }
    }
    console.log("movies:");
    console.log(Movies);
    
    console.log("indicemovie:");
    console.log(indiceMovie);

    setSelectedMovie(Movies[indiceMovie]);
    const match = document.getElementById('match');
    match.classList.remove('hide');
  })

  const outOfFrame = (name) => {
    console.log(name + " left the screen!");
  };

  const swipe = (dir) => {
    setMovieIndex(MovieIndex + 1);
    if (dir === "left") {
      swipeMovie(false)
    }
    else {
      swipeMovie(true)
    }
  }

  socketContext.socket.on("printRanking", (ranking) => {
    //socketContext.updateGroup(group);
    console.log("received a ranking");
    console.log(ranking);
  });
  

  return (
    <div className="box-ecran swipe-color">
      <hr></hr>

      <div className="cardContainer">
        <div>
          <div className=" background-vide">
            <h3>
              {Movies[MovieIndex].title}, {Movies[MovieIndex].year} ({Movies[MovieIndex].runtime})
            </h3>
          </div>
          <hr></hr>

          <MovieCard
            className="swipe"
            key={Movies[MovieIndex].title}
            onSwipe={(dir) => {
              setMovieIndex(MovieIndex + 1);
              swiped(dir, Movies[MovieIndex].name);
            }}
            onCardLeftScreen={() => outOfFrame(Movies[MovieIndex].title)}
          >
            <div style={{ backgroundImage: "url(" + Movies[MovieIndex].img + ")" }} className="card"></div>
          </MovieCard>
          <hr></hr>

          <div className="buttons bouton-swipe box-horizontal">
            <div className="bouton-swipe-non-hover">
              <button className="bouton-swipe-non" onClick={() => swipe("left")}>
                non
              </button>
            </div>
            <h4> {Movies[MovieIndex].genre.join(" ")} </h4>
            <div>{Movies[MovieIndex].synopsis}
            </div>
            {owner === username &&
        <div className="bouton-rouge-hover">
          <button
            className="bouton-rouge-rempli"
            onClick={() => {
            interrompreSwipe();
            }
            }>
            Interrompre le swipe</button>
        </div>}
          </div>
          <h4> {Movies[MovieIndex].genre}, </h4>
          <div>{Movies[MovieIndex].synopsis}</div>
          {owner === username && (
            <div className="bouton-rouge-hover">
              <button
                className="bouton-rouge-rempli"
                onClick={() => {
                  interrompreSwipe();
                  history.push("/");
                }}
              >
                Interrompre le swipe
              </button>
            </div>
          )}
        </div>
      </div>



{lastDirection==="left" ? <div key={lastDirection} className='non'><i class="img-swipe fas fa-no float-left"></i></div> : <h2></h2>}
{lastDirection==="right" ? <div key={lastDirection} className='oui'><i class="img-swipe fas fa-heart float-left"></i></div> : <h2></h2>}


<Match 
title={selectedMovie.title}
url={selectedMovie.img}
genre={selectedMovie.genre}
runtime={selectedMovie.runtime}
synopsis={selectedMovie.synopsis}
year={selectedMovie.year}
/>

</div>
  )
}

export default Swipe;
