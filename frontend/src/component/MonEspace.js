import { useState } from "react";
import UserInfos from "./UserInfos";
import "../styles/monEspace.css";

function MonEspace() {
  const [state, setState] = useState(1);

  return (
    <div className="monEspace-container">
      <div>
        <div>Username ici ...</div>
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
  );
}

export default MonEspace;
