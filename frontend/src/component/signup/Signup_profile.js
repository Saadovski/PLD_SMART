import { AuthContext } from "../../context/authContext";
import { useHistory } from "react-router";
import React, { useContext } from "react";

function Signup_profile(props) {
    const REACT_APP_API_URL = process.env.REACT_APP_API_URL || 'http://localhost:1024/api/';
    const genres = ["Action","Thriller","Science-Fiction"];
    const authContext = useContext(AuthContext);
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();

        let profile = [];
        for(let i=0; i<genres.length; i++) {
          if(document.querySelector("#"+genres[i]).checked === true){
            profile.push(genres[i]);
          }
        }

        fetch(REACT_APP_API_URL+'user/inscription', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: props.username,
              password: props.password,
              profil: profile,
            }),
          })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              console.log("Success");
              authContext.login(data.token, data.userId, props.username);
              history.push("/monespace");
            }
            else {
              console.log("Failed");
            }
          });
    }

    return (
        <div className="signup_profile">
            <h1>Choisissez les genres qui vous attirent</h1>
            <div className="genres_Container">
                {genres.map((genre, index) => {
                  return (
                    <div className="genre" key={index} >
                      <input type="checkbox" id={genre} name={genre}/>
                      <label htmlFor="scales">{genre}</label>
                    </div>
                  );
                })}
            </div>
            <div>
                <button type="submit" onClick={handleSubmit}>Valider</button>
            </div>
        </div>

    );

}

export default Signup_profile;