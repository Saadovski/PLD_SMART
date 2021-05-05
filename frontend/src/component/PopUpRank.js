import GoldMedal from "../images/gold-medal.svg";
import SilverMedal from "../images/silver-medal.svg";
import BronzeMedal from "../images/bronze-medal.svg";
import "../styles/popUpRank.css";
import { Button } from "react-bootstrap";
import { useEffect } from "react";

function PopUpRank(props) {
  useEffect(() => {
    setTimeout(() => {
      const pop = document.querySelector(".popUpRank");
      pop.style.transform = "translate(0%)";
    }, 1000);
  }, []);

  return (
    <div className="popUpRank-container">
      <div className="popUpRank">
        <h2>Classement</h2>

        <div className="medalsBox">
          <div>
            <img src={SilverMedal} alt="silver"></img>
            <div>Titre</div>
            <Button>Voir</Button>
          </div>
          <div>
            <img src={GoldMedal} alt="gold"></img>
            <div>Titre</div>
            <Button>Voir</Button>
          </div>
          <div>
            <img src={BronzeMedal} alt="bronze"></img>
            <div>Titre</div>
            <Button>Voir</Button>
          </div>
        </div>
        <Button variant="danger" className="mt-5">Quitter la session</Button>
      </div>
      <div className="backgroundRank"></div>
    </div>
  );
}

export default PopUpRank;
