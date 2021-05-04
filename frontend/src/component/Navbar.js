import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
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
        
        <Link to="/" className="logo  " id="logo">
          Logo
        </Link>
      </div>
      <div className="texte-centre" id="myLinks">
        <div className="box-horizontal  list-button-vert texte-centre">
        <button className="icon float-left" onClick={closeNavBar}>
        </button>
        <div className="texte-centre texte-username"> Connecté en tant que : {authContext.username} </div>
      </div>
      <NavLink to="/home" activeClassName="selected">Accueil</NavLink>
        {!authContext.isAuth && <NavLink to="/connexion" activeClassName="selected">Connexion</NavLink>}
        {!authContext.isAuth && <NavLink to="/inscription" activeClassName="selected">Inscription</NavLink>}
        {authContext.isAuth && <NavLink to="/monespace" activeClassName="selected">Mon Espace</NavLink>}
        <NavLink activeClassName="selected" to="/creersession">Rejoindre ou créer une session</NavLink>
        {authContext.isAuth && (
        <div className="texte-centre box-en-bas-deconnexion bouton-gris-hover">
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
