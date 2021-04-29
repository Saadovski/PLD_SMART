import { Button } from "react-bootstrap";

function Home() {
  return (
    <div>
      <h1>Walou</h1>
      <div>Slogan ...</div>

      <div>Explication de l'app ...</div>
      <div>Connecte-toi pour utiliser Walou</div>

      <div>
        <h2>Rejoins tes amis pour choisir ton film !</h2>
        <Button onClick={() => (window.location.href = "/creersession")}>Lancer une session !</Button>
      </div>
    </div>
  );
}

export default Home;
