import { useContext } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import "../styles/navbar.css";

function Navbar() {
  const authContext = useContext(AuthContext);

  const open = () => {
    var x = document.getElementById("myLinks");
    var bg = document.querySelector(".blackBackground");
    console.log("open", x);
    if (x.style.left !== 0) {
      console.log("diff de -600px");
      x.style.left = 0;
      bg.style.display = "block";
    } else {
      x.style.left = "-80vw";
      bg.style.display = "none";
    }

    const links = document.querySelectorAll("#myLinks > a");
    links.forEach((link) => {
      link.addEventListener("click", () => {
        x.style.left = "-80vw";
        var bg = document.querySelector(".blackBackground");
        bg.style.display = "none";
      });
    });
  };

  const closeNavBar = () => {
    console.log("close navbar");
    var x = document.getElementById("myLinks");
    var bg = document.querySelector(".blackBackground");
    console.log(x);
    x.style.left = "-80vw";
    bg.style.display = "none";
  };

  return (
    <div>
      <div className="navbar-container">
        <button href="" className="icon" onClick={open}>
          <i className="fa fa-bars"></i>
        </button>
        <Link to="/" className="active" id="logo">
          Logo
        </Link>
      </div>
      <div id="myLinks">
        <div className="box-horizontal">
        <Button className="icon" onClick={closeNavBar}>
          <i className="fas fa-times"></i>
        </Button>
        <h3> {authContext.username} </h3>
        </div>
        <Link to="/">Accueil</Link>
        {!authContext.isAuth && <Link to="/connexion">Connexion</Link>}
        {!authContext.isAuth && <Link to="/inscription">Inscription</Link>}
        {authContext.isAuth && <Link to="/monespace">Mon Espace</Link>}
        <Link to="/creersession">Rejoindre ou créer une session</Link>
        {authContext.isAuth && (
          <div className="bouton-gris-hover">
          <button
            className="bouton-gris-rempli"
            onClick={() => {
              authContext.logout();
              // closeNavBar();
            }}
          >
            Deconnexion
          </button>
          </div>
        )}
      </div>
      <div className="blackBackground"></div>
    </div>
  );
}

export default Navbar;
