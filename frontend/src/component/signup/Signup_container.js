import { useState } from "react";
import Signup_id from "./Signup_id";
import Signup_profile from "./Signup_profile";

function Signup_container() {

    const [state, setState] = useState(1);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="signup-container">
            {state === 1 && <Signup_id setState={setState} username={username} setUsername={setUsername} setPassword={setPassword} />}
            {state === 2 && <Signup_profile setState={setState} username={username} password={password} />}
        </div>
    )
}

export default Signup_container;