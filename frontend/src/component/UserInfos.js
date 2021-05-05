import { useState, useContext, useEffect } from "react";
import "../styles/boutons.css";
import "../styles/textes.css";
import "../styles/box.css";
import { AuthContext } from "../context/authContext";

function UserInfos() {
  const [isModifying, setIsModifying] = useState(false);
  const [hasChanged, setHasChanged] = useState(false);
  const [password, setPassword] = useState("password");
  const [username, setUsername] = useState();
  const [oldPassword, setOldPassword] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [newPasswordConf, setNewPasswordConf] = useState(null);
  const REACT_APP_API_URL = process.env.REACT_APP_API_URL || "http://localhost:1024/api/";
  const authContext = useContext(AuthContext);

  useEffect(() => {
    setUsername(authContext.username);
  }, [authContext.username]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword === newPasswordConf && newPassword) {
      fetch(REACT_APP_API_URL + "user/modification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + authContext.token,
        },
        body: JSON.stringify({
          userId: authContext.userId,
          password: newPassword,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            
          } else {
            document.getElementById("nouveau").style.border = "1px solid red";
            document.getElementById("confirmernouveau").style.border = "1px solid red";
          }
        });
    } else {
      setIsModifying(true);
      document.getElementById("nouveau").style.border = "1px solid red";
      document.getElementById("confirmernouveau").style.border = "1px solid red";
      alert("Confirmation du mot de passe incorrect");
    }
  };

  const handleModify = (e) => {
    setIsModifying(!isModifying);

    if (isModifying) {
      document.querySelector("#samplePassword").classList.remove("hide");
    } else {
      document.querySelector("#samplePassword").classList.add("hide");
    }

    if (isModifying && hasChanged) {
      e.preventDefault();
    }
  };

  return (
    <div className="container-fluid texte-centre">
      <form>
        <label>
          <input
            class="box-sans-contour texte-vert texte-centre"
            type="text"
            value={username}
            readOnly
            onChange={() => {
              setHasChanged(true);
            }}
            placeholder="Entrez votre nom d'utilisateur ici"
          />
        </label>

        <label>
          <input
            class="box-sans-contour texte-vert texte-centre"
            name="samplePassword"
            id="samplePassword"
            type="password"
            value={password}
            readOnly
            onChange={(e) => {
              setHasChanged(true);
              setPassword(e.target.value);
            }}
          />
        </label>

        {isModifying ? (
          <div class="texte-centre">
            <label>
              <label>
                <input
                  class="box-sans-contour texte-vert texte-centre"
                  type="password"
                  name="oldPassword"
                  value={oldPassword}
                  placeholder="Ancien mot de passe ..."
                  onChange={(e) => {
                    setHasChanged(true);
                    setOldPassword(e.target.value);
                  }}
                />
              </label>
              <input
                class="box-sans-contour texte-vert texte-centre"
                type="password"
                name="newPassword"
                id="nouveau"
                value={newPassword}
                placeholder="Nouveau mot de passe ..."
                onChange={(e) => {
                  setHasChanged(true);
                  setNewPassword(e.target.value);
                }}
              />
            </label>
            <label>
              <input
                class="box-sans-contour texte-vert texte-centre"
                type="password"
                name="newPasswordConf"
                id="confirmernouveau"
                value={newPasswordConf}
                placeholder="Confirmer le nouveau mot de passe ..."
                onChange={(e) => {
                  setHasChanged(true);
                  setNewPasswordConf(e.target.value);
                }}
              />
            </label>
            <hr></hr>
            <div className="bouton-vert-hover">
              <button className="bouton-vert-rempli" onClick={handleSubmit}>
                Valider
              </button>
            </div>
            <hr></hr>
            <div className="bouton-gris-hover">
              <button className="bouton-gris-rempli" onClick={handleModify}>
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
