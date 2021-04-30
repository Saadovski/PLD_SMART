import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {
  const open = () => {
    var x = document.getElementById("myLinks");
    var bg = document.querySelector(".blackBackground");
    console.log("open", x);
    if (x.style.left !== 0) {
      console.log("diff de -600px")
      x.style.left = 0;
      bg.style.display = "block";
    } else {
      x.style.left = "-80vw";
      bg.style.display = "none";
    }
    

    const links = document.querySelectorAll("#myLinks > a");
    links.forEach((link) => {
      link.addEventListener("click", () => (x.style.left = "-80vw"));
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
        <a href="javascript:void(0);" className="icon" onClick={open}>
          <i class="fa fa-bars"></i>
        </a>
        <Link to="/" className="active" id="logo">
          Logo
        </Link>
      </div>
      <div id="myLinks">
        <Button className="icon" onClick={closeNavBar}>
          <i class="fas fa-times"></i>
        </Button>
        <Link to="/">Home</Link>
        <Link to="/connexion">Connexion</Link>
        <Link to="/inscription">Inscription</Link>
        <Link to="/monespace">Mon Espace</Link>
        <Link to="/creersession">Rejoindre ou créer une session</Link>
      </div>
      <div className="blackBackground"></div>
    </div>
  );
}

export default Navbar;
