import React, { useState, useContext, useMemo } from 'react'
import { SocketContext } from '../../context/socketContext'
import MovieCard from './index'
import { AuthContext } from "../../context/authContext";
import { useHistory } from "react-router";

import "../../styles/textes.css";
import "../../styles/box.css";
import "../../styles/swipe.css";
import "../../styles/boutons.css";

function Ranking() {

    return (
        <div className="box-ecran swipe-color" >

        </div>
    )
}

export default Ranking