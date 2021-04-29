import { Button } from "react-bootstrap";
import "../styles/home.css";

function Home() {
  return (
    <div className="home-container">
      <h1>Walou</h1>
      <div>Slogan ...</div>

      <div className="presentation-container">
        <h2>Comment ça fonctionne ?</h2>
        <div>Un problème pour choisir un film avec tes potes ? N'en dis pas plus Walou est là pour toi</div>
        <br />
        <div>Connecte toi et swipe pour trouver LE film qui animera ta soirée film entre potes</div>
      </div>

      <div className="join-container">
        <h2>Rejoins tes amis !</h2>
        <Button onClick={() => (window.location.href = "/creersession")}>Lancer une session</Button>
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
