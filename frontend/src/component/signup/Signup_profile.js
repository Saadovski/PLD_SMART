import { AuthContext } from "../../context/authContext";
import { useHistory } from "react-router";
import React, { useContext } from "react";
import "../../styles/textes.css";
import "../../styles/box.css";
import PopUpSpinner from "../PopUpSpinner";

function Signup_profile(props) {
  const REACT_APP_API_URL = process.env.REACT_APP_API_URL || "http://localhost:1024/api/";
  const genres = ["Action", "Adventure", "Anime", "Comedy", "Documentary", "Drama", "Fantasy", "Horror", "Family", "Musical", "Mystery", "Crime", "Romance", "Thriller", "Sci-Fi"];
  const authContext = useContext(AuthContext);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const spinner = document.getElementsByClassName('PopUp')[0];
    spinner.classList.toggle('hide');

    let profile = [];
    for (let i = 0; i < genres.length; i++) {
      if (document.querySelector("#" + genres[i]).checked === true) {
        profile.push(genres[i]);
      }
    }

    fetch(REACT_APP_API_URL + "user/inscription", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
         
          spinner.classList.toggle('hide');
          console.log("Success");
          authContext.login(data.token, data.userId, props.username);
          history.push("/monespace");
        } else {
          console.log("Failed");
        }
      });
  };

  return (
    <div className="box-centre">
      <div className="signup_profile texte-centre">
        <h3>Choisissez les genres qui vous attirent</h3>
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
          <button className="bouton-vert-rempli" type="submit" onClick={handleSubmit}>
            Valider
          </button>
        </div>
      </div>
      <PopUpSpinner text="Inscription en cours ..."/>
    </div>
  );
}

export default Signup_profile;
