import { useParams } from "react-router";
import "../styles/boutons.css";
import "../styles/textes.css";
import "../styles/box.css";


function SessionPage() {
  const { id } = useParams();

  return (
  <div class="box-centre">
  <div class="box-en-haut">Session {id}</div>
  <div class="bouton-gris-hover">
  <button className="bouton-gris-rempli texte-blanc" onClick={(event) => {window.location.href="/Simple"}}>Swiper</button>
  </div>
  </div>
  );
}

export default SessionPage;
