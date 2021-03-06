import React, { useState, useContext, useMemo, useEffect } from "react";
import { SocketContext } from "../../context/socketContext";
import MovieCard from "./Index";
import { AuthContext } from "../../context/authContext";
import { useHistory } from "react-router";
import Match from "./Match";

import "../../styles/textes.css";
import "../../styles/box.css";
import "../../styles/swipe.css";
import "../../styles/boutons.css";
import PopUpSpinner from "../PopUpSpinner";
import PopUpRank from "../PopUpRank";

const alreadyRemoved = [];

function Swipe() {
  const REACT_APP_API_URL = process.env.REACT_APP_API_URL || "http://localhost:1024/api/";
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
  const [Movies, setMovies] = useState(socketContext.group.films);
  const [selectedMovie, setSelectedMovie] = useState(Movies[0]);
  const [isFinished, setIsFinished] = useState(false);
  const [topFilm, setTopFilm] = useState([]);
  var shuffled = socketContext.group.films;

  

  useEffect(() => {
    shuffle(Movies);

    document.getElementById("btnLeaveSession").addEventListener("click", () => {
      history.push("/");
    });

    socket.on("group", (group) => {
      console.log("swipe group");
      socketContext.updateGroup(group);
    });

    function shuffle(array) {
      var movie = [...array];
      var shuffledArray = [];
      var nbFilms = movie.length;
      while (movie.length != 0) {
        var random = Math.floor(Math.random() * movie.length);
        shuffledArray[nbFilms - movie.length] = movie[random];
        movie.splice(random, 1);
      }
      setMovies(shuffledArray);
    }

    socketContext.socket.on("printRanking", (ranking) => {
      const filmToDisplay = [];
      if (ranking.length >= 3) {
        shuffled.forEach((film) => {
          if (film.netflixid === ranking[0].filmId || film.netflixid === ranking[1].filmId || film.netflixid === ranking[2].filmId) {
            filmToDisplay.push(film);
          }
        });
        console.log("filmtodisplay", filmToDisplay);
      }

      document.getElementById("waitingPopUp").classList.add("hide");
      const popUpRank = document.querySelector(".popUpRank-container");
      const medalsBox = document.querySelector(".popUpRank-container .popUpRank");
      const blackBackground = document.querySelector(".popUpRank-container .backgroundRank");
      blackBackground.classList.remove("hideRank");
      popUpRank.classList.remove("hideRank");
      medalsBox.style.transform = "translateY(0vh)";
      setTopFilm(filmToDisplay);
    });
  }, []);

  const swipeMovie = (avis) => {
    const filmId = Movies[MovieIndex].netflixid;
    fetch(REACT_APP_API_URL + "film/updatePreference", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + authContext.token,
      },
      body: JSON.stringify({
        userId: authContext.userId,
        filmId: filmId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.status);
      });

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
      swipeMovie(false);
    } else {
      swipeMovie(true);
    }
  };

  socket.on("printMatch", (data) => {
    console.log("received a match");
    //    const movie = Movies.find((m) => m.netflixid === data.filmId);
    var indiceMovie;
    for (var i = 0; i < Movies.length; i++) {
      if (Movies[i].netflixid === data.filmId) {
        indiceMovie = i;
      }
    }

    setSelectedMovie(Movies[indiceMovie]);
    const match = document.getElementById("match");
    //match.style.display = "flex";
    match.classList.remove("matchOut");
    match.classList.remove("hide");
    match.classList.add("matchIn");
  });

  const outOfFrame = (name) => {
    console.log(name + " left the screen!");
  };

  const swipe = (dir) => {
    if (!(MovieIndex + 1 >= Movies.length)) {
      setMovieIndex(MovieIndex + 1);
    } else {
      setIsFinished(true);
      const waitingPopUp = document.getElementById("waitingPopUp");
      waitingPopUp.classList.toggle("hide");
    }

    if (dir === "left") {
      swipeMovie(false);
    } else {
      swipeMovie(true);
    }
  };

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
          <div className="box-horizontal">
            <div className="bouton-swipe-non-hover">
              <button className="bouton-swipe-non" onClick={() => swipe("left")}>
                non
              </button>
            </div>
            <hr></hr>
            <div className="bouton-swipe-oui-hover">
              <button className="bouton-swipe-oui" onClick={() => swipe("right")}>
                oui
              </button>
            </div>
          </div>
          <h4> {Movies[MovieIndex].genre.join(" ")} </h4>
          <div>
            {Movies[MovieIndex].synopsis}
            {owner === username && (
              <div className="bouton-rouge-hover">
                <button
                  className="bouton-rouge-rempli"
                  onClick={() => {
                    interrompreSwipe();
                  }}
                >
                  Afficher le classement
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {lastDirection === "left" ? (
        <div key={lastDirection} className="non">
          <i class="img-swipe fas fa-no float-left"></i>
        </div>
      ) : (
        <h2></h2>
      )}
      {lastDirection === "right" ? (
        <div key={lastDirection} className="oui">
          <i class="img-swipe fas fa-heart float-left"></i>
        </div>
      ) : (
        <h2></h2>
      )}

      <Match
        title={selectedMovie.title}
        url={selectedMovie.img}
        genre={selectedMovie.genre}
        runtime={selectedMovie.runtime}
        synopsis={selectedMovie.synopsis}
        year={selectedMovie.year}
        id={selectedMovie.netflixid}
      ></Match>

      <PopUpSpinner id="waitingPopUp" text="En attente des autres participants" />

      <PopUpRank films={topFilm} />
    </div>
  );
}

export default Swipe;
