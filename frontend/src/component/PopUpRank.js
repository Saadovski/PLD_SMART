import GoldMedal from "../images/gold-medal.svg";
import SilverMedal from "../images/silver-medal.svg";
import BronzeMedal from "../images/bronze-medal.svg";
import "../styles/popUpRank.css";
import { Button } from "react-bootstrap";

function PopUpRank(props) {
  // useEffect(() => {
  //   setTimeout(() => {
  //     const pop = document.querySelector(".popUpRank");
  //     pop.style.transform = "translate(0%)";
  //   }, 1000);
  // }, []);

  return (
    <div className="popUpRank-container hideRank">
      <div className="popUpRank">
        <h2>Classement</h2>

        <div className="medalsBox">
          {props.films.length >= 3 && (
            <div>
              <img src={SilverMedal} alt="silver"></img>
              <div>{props.films.length >= 3 ? props.films[1].title : ""}</div>
              <a href={`https://netflix.com/watch/${props.films[1].netflixid}`} target="_blank" className="btn btn-primary">
                Voir
              </a>
            </div>
          )}
          {props.films.length >= 3 && (
            <div>
              {/* <div>
                <img src={props.films[0].img} alt="imgGold" className="imgFilmRank"></img>
              </div> */}
              <img src={GoldMedal} alt="gold"></img>
              <div>{props.films.length >= 3 ? props.films[0].title : ""}</div>
              <a href={`https://netflix.com/watch/${props.films[0].netflixid}`} target="_blank" className="btn btn-primary">
                Voir
              </a>
            </div>
          )}

          {props.films.length >= 3 && (
            <div>
              <img src={BronzeMedal} alt="bronze"></img>
              <div>{props.films.length >= 3 ? props.films[2].title : ""}</div>
              <a href={`https://netflix.com/watch/${props.films[2].netflixid}`} target="_blank" className="btn btn-primary">
                Voir
              </a>
            </div>
          )}
        </div>

        <Button variant="danger" className="mt-5" onClick={() => (window.location.href = "/")}>
          Quitter la session
        </Button>
      </div>
      <div className="backgroundRank hideRank"></div>
    </div>
  );
}

export default PopUpRank;
