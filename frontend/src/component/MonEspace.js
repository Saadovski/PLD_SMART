import { useContext, useState } from "react";
import UserInfos from "./UserInfos";
import "../styles/monEspace.css";
import { AuthContext } from "../context/authContext";

function MonEspace() {
  const [state, setState] = useState(1);
  const authContext = useContext(AuthContext);

  return (
    <div className="box-centre">
      <div className="monEspace-container">
        <div>
          <div>{authContext.username}</div>
          <div className="nav">
            <div onClick={() => setState(1)}>
              <i className="fas fa-user float-left"></i> Mes infos
            </div>
            <div onClick={() => setState(2)}>
              <i className="fas fa-heart float-left"></i> Mes préférences
            </div>
          </div>
        </div>
        <hr />
        <div className="dynamic-container">
          {state === 1 && <UserInfos />}
          {state === 2 && <div>state2</div>}
        </div>
      </div>
    </div>
  );
}

export default MonEspace;
