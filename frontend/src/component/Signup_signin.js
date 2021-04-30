import "../styles/boutons.css";
import "../styles/textes.css";
import "../styles/box.css";

function Signup_signin() {

    return (
      <div class="box-centre">
        <div>
      <div className="bouton-vert-hover">
        <button className="bouton-vert-rempli texte-blanc" onClick={(event) => {window.location.href="/connexion"}}>Connexion</button>
      </div>
      <div></div>
      <div className="bouton-gris-hover">
        <button className="bouton-gris-rempli texte-blanc" onClick={(event) => {window.location.href="/inscription"}}>Inscription</button>
      </div>
      </div>
      </div>
    );
}

export default Signup_signin;
