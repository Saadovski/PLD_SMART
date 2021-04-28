import { Link } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {
  const open = () => {
    var x = document.getElementById("myLinks");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  };

  return (
    <div className="navbar-container">
      <Link to="/" class="active">
        Logo
      </Link>
      <div id="myLinks">
        <Link to="">Home</Link>
        <Link to="">Contact</Link>
        <Link to="">About</Link>
      </div>
      <a href="javascript:void(0);" class="icon" onClick={open}>
        <i class="fa fa-bars"></i>
      </a>
    </div>
  );
}

export default Navbar;
