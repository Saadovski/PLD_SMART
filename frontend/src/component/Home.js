import { Button } from "react-bootstrap";
import "../styles/home.css";

function Home() {
  return (
    <div className="home-container box-centre">
            <div className="box-en-haut"><h1>Walou</h1>Slogan ...</div>


      <div className="presentation-container">
        <h2>Comment ça fonctionne ?</h2>
        <div>Un problème pour choisir un film avec tes potes ? N'en dis pas plus Walou est là pour toi</div>
        <br />
        <div>Connecte toi et swipe pour trouver LE film qui animera ta soirée film entre potes</div>
      </div>

      <div className="join-container bouton-vert-hover box-en-bas">
        <h2>Rejoins tes amis !</h2>
        <button className="bouton-vert-rempli" onClick={() => (window.location.href = "/creersession")}>Lancer une session</button>
      </div>
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

export default Home;
