import { useState, useContext } from "react";
import { Form } from "react-bootstrap";
import "../styles/boutons.css";
import "../styles/textes.css";
import "../styles/box.css";
import { AuthContext } from "../context/authContext";


function UserInfos() {
  const [isModifying, setIsModifying] = useState(false);
  const [hasChanged, setHasChanged] = useState(false);
  const [username, setUsername] = useState("username");
  const [password, setPassword] = useState("password");
  const REACT_APP_API_URL = process.env.REACT_APP_API_URL || "http://localhost:1024/api/";
  const authContext = useContext(AuthContext);

  const handleModify = (e) => {
    setIsModifying(!isModifying);

    if (isModifying && hasChanged) {
    
    e.preventDefault();
    console.log("Submitting form...");
    console.log(`%c${username} ${password}`, "color: #cc0000");

    fetch(REACT_APP_API_URL + "user/modification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: authContext.userId,
        password: password,
        token: authContext.token, 
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log("successfully modified the password");
          
        } else {
          document.querySelector(".connection-info").innerHTML = "La modification a échoué";
        }
      });
    }
  };

  /*const handleModify = () => {
    setIsModifying(!isModifying);

    if (isModifying && hasChanged) {
      alert("Vos données ont été mises à jour");
    }
  };*/

  return (
    <div className="container-fluid texte-centre">
      <form>
      <label>
          <input
            class="box-sans-contour texte-vert texte-centre"
            type="text"
            value={username}
            readOnly={!isModifying}
            onChange={(e) => {
              setHasChanged(true);
              setUsername(e.target.value);
            }}
            placeholder="Entrez votre nom d'utilisateur ici"

            />
        </label>
      
      <label>
          <input
            class="box-sans-contour texte-vert texte-centre"
            type="password"
            value={password}
            readOnly={!isModifying}
            onChange={(e) => {
              setHasChanged(true);
              setPassword(e.target.value);
            }}
            placeholder="Entrez votre mot de passe ici"

            />
        </label>


      {isModifying ? (
        <div class="texte-centre">
          <label>
          <input
            class="box-sans-contour texte-vert texte-centre"
            type="password"
            name="username"
            value={password}
            readOnly={!isModifying} 
            onChange={() => setHasChanged(true)}
            placeholder="Confirmez votre mot de passe ici"
          />
        </label>
        <hr></hr>
          <div className="bouton-vert-hover">
          <button className="bouton-vert-rempli" onClick={handleModify}>
            Valider
          </button>
          </div>
          <hr></hr>
          <div className="bouton-gris-hover">
          <button className="bouton-gris-rempli" onClick={() => setIsModifying(false)}>
            Annuler
          </button>
          </div>


        </div>
      ) : (
        <div>
        <hr></hr>
        <div className="bouton-vert-hover">
        <button className="bouton-vert-rempli" onClick={handleModify}>
          Modifier
        </button>
        </div>
        </div>
      )}
      </form>
    </div>
  );
}

export default UserInfos;
