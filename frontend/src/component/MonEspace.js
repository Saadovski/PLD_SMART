import { useState } from "react";
import UserInfos from "./UserInfos";

function MonEspace() {
  const [state, setState] = useState(1);

  return (
    <div className="monEspace-container">
      <div>Username ici ...</div>

      <div onClick={() => setState(1)}>
        <i class="fas fa-user"></i> Mes infos
      </div>
      <div onClick={() => setState(2)}>
        <i class="fas fa-heart"></i> Mes préférences
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
