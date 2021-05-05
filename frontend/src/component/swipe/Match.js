import { useHistory, useParams } from "react-router";
import React, { useState, useContext, useMemo, useEffect } from 'react'
import { SocketContext } from '../../context/socketContext'
import MovieCard from './index'
import { AuthContext } from "../../context/authContext";

import "../../styles/textes.css";
import "../../styles/box.css";
import "../../styles/swipe.css";
import "../../styles/boutons.css";


function Match() {
    const { id } = useParams();
    const socketContext = useContext(SocketContext);
    const Movies = socketContext.group.films;
    var indexMovie;
    var Movie;
    useEffect(() => {
        console.log(Movies);
        for (var i = 0; i < Movies.length; i++) {
            console.log(Movies[i]);
            if (Movies[i].netflixid == id) {
                console.log("c bon");
                indexMovie = i;
                Movie = Movies[indexMovie];
                console.log(Movie);
            }
          }
      }, []);



    return (
        <div className="box-ecran swipe-color" >
            <h1> Ceci est un match !</h1>
            <hr></hr>
            <div className=' background-vide'><h3>{Movie.title}, {Movie.year} ({Movie.runtime})</h3></div>
            <hr></hr>
        </div>
    )
}

export default Match