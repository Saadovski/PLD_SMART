import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/authContext";

function UserHistory() {

    const [sessionsNb, setSessionsNb] = useState(0);
    const [moviesNb, setMoviesNb] = useState(0);
    const REACT_APP_API_URL = process.env.REACT_APP_API_URL || "http://localhost:1024/api/";
    const authContext = useContext(AuthContext);

    useEffect(() => {
        console.log(authContext.token);
        console.log(authContext.token.split(' ')[1]);
        fetch(REACT_APP_API_URL + "user/check_infouser", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "authorization": "Bearer "+authContext.token,
            },
            body: JSON.stringify({
              userId: authContext.userId,
            }),
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                setSessionsNb(data.nb_sessions);
                setMoviesNb(data.nb_films);
            } else {
                
            }
        });
    }, []);

    return (
        <div className="UserHistory-container">
            <div>
                Nombre de sessions : {sessionsNb}
            </div>
            <div>
                Nombre de films : {moviesNb}
            </div>
        </div>
    )
}
export default UserHistory;