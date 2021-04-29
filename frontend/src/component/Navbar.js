import { Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  const open = () => {
    var x = document.getElementById("myLinks");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }

    const links = document.querySelectorAll("#myLinks > a");
    links.forEach((link) => {
      link.addEventListener("click", () => (x.style.display = "none"));
    });
  };

  return (
    <div className="navbar-container">
      <Link to="/" class="active">
        Logo
      </Link>
      <div id="myLinks">
        <Link to="/">Home</Link>
        <Link to="/connexion">Connexion</Link>
        <Link to="/inscription">Inscription</Link>
        <Link to="/monespace">Mon Espace</Link>
        <Link to="/creersession">Rejoindre ou créer une session</Link>
      </div>
      <a href="javascript:void(0);" class="icon" onClick={open}>
        <i class="fa fa-bars"></i>
      </a>
    </div>
  );
}

export default Navbar;
