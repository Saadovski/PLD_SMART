import "../styles/home.css";
import PeopleWatchingFilm from "../images/home-cinema-amico.svg";
import Popcorn from "../images/popcorn.svg";
import Glasses from "../images/glasses.svg";
import Arrow from "../images/next.svg";
import { withRouter } from "react-router";

function Home() {
  return (
    <div className="home-container">
      <div className="header">
        <div>
          <div className="text-header">
            <h1>Walou</h1>
            <div>Slogan ...</div>
          </div>
          <img src={PeopleWatchingFilm} alt="film-amico" id="PeopleWatchingFilm"></img>
          <img src={Popcorn} alt="popcorn" id="Popcorn"></img>
          <img src={Glasses} alt="glasses" id="Glasses"></img>
          <img src={Arrow} alt="arrow" id="Arrow"></img>
        </div>
      </div>

      <section className="presentation-container texte-centre">
        <h2 className="texte-centre">Comment ça fonctionne ?</h2>
        <div>Un problème pour choisir un film avec tes potes ? N'en dis pas plus Walou est là pour toi</div>
        <br />
        <div>Connecte toi et swipe pour trouver LE film qui animera ta soirée entre potes</div>
      </section>

      <section className="join-container bouton-vert-hover box-en-bas">
        <h2>Rejoins tes amis !</h2>
        <button className="bouton-vert-rempli" onClick={() => (window.location.href = "/creersession")}>
          Lancer une session
        </button>
      </section>
      {/* <button
        className="bouton-gris-rempli texte-blanc"
        onClick={(event) => {
          window.location.href = "/initialisation";
        }}
      >
        Cliquez ici
      </button> */}
    </div>
  );
}

export default withRouter(Home);
