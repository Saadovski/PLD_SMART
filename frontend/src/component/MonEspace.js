import { useContext, useState } from "react";
import UserInfos from "./UserInfos";
import "../styles/monEspace.css";
import { AuthContext } from "../context/authContext";
import UserHistory from "./UserHistory";

function MonEspace() {
  const [state, setState] = useState(1);
  const authContext = useContext(AuthContext);

  return (
    <div className="box-centre">
      <div className="monEspace-container">
        <div>
          <div> Connecté en tant que : {authContext.username}</div>
          <div className="nav">
            <div className="box-arrondie" onClick={() => setState(1)}>
              <i className="fas fa-user float-left"></i> Mes infos
            </div>
            <div className="box-arrondie" onClick={() => setState(2)}>
              <i className="fas fa-heart float-left"></i> Mon historique
            </div>
          </div>
        </div>
        <hr />
        <div className="dynamic-container">
          {state === 1 && <UserInfos />}
          {state === 2 && <UserHistory />}
        </div>
      </div>
    </div>
  );
}

export default MonEspace;
