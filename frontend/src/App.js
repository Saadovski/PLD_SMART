import { BrowserRouter as Router, Switch, Route, Redirect, useHistory } from "react-router-dom";
import "./App.css";
import Signin from "./component/Signin";
import Signup_container from "./component/signup/Signup_container";
import Navbar from "./component/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./component/Home";
import MonEspace from "./component/MonEspace";
import Simple from "./component/swipe/examples/Simple";
import Mood from "./component/swipe/Mood";
import Advanced from "./component/swipe/examples/Advanced";
import CreateSession from "./component/CreateSession";
import SessionPage from "./component/SessionPage";
import Signup_signin from "./component/Signup_signin";
import { useEffect, useState } from "react";
import { AuthContext } from "./context/authContext";
import { SocketContext } from "./context/socketContext";
import PrivateRoute from "./component/PrivateRoute";

function App() {
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState(null);
  const [userId, setUserId] = useState(null);

  const [socket, setSocket] = useState(null);
  const [socketId, setSocketId] = useState(null);
  const [group, setGroup] = useState(null);
  const [idSession, setIdSession] = useState(null);

  const history = useHistory();

  useEffect(() => {
    const storedToken = JSON.parse(localStorage.getItem("pldsmartToken"));
    const storedUser = JSON.parse(localStorage.getItem("pldsmartUser"));
    console.log("stored token", storedToken);
    if (storedToken && storedToken.token && new Date(storedToken.expiration).getTime() > new Date().getTime()) {
      login(storedToken.token, storedUser.userId, storedUser.username);
    }
  }, []);

  const login = (newToken, userId, username) => {
    localStorage.setItem("pldsmartToken", JSON.stringify({ token: newToken, expiration: new Date().getTime() + 1000 * 60 * 2 }));
    localStorage.setItem("pldsmartUser", JSON.stringify({ userId, username }));
    setToken(newToken);
    setUsername(username);
    setUserId(userId);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("pldsmartToken");
    localStorage.removeItem("pldsmartUser");
    window.location.href = "/";
  };

  const connectToSession = (socketId, socket, idSession) => {
    setSocketId(socketId);
    setSocket(socket);
    setIdSession(idSession);
  };

  const updateGroup = (group) => {
    setGroup(group);
  };

  return (
    <SocketContext.Provider value={{ socket: socket, idSession, connectToSession: connectToSession, updateGroup, group: group }}>
      <AuthContext.Provider value={{ isAuth: !!token, login: login, logout: logout, token: token, username: username, userId: userId }}>
        <div className="App">
          <Router>
            <Navbar />
            <Switch>
              <Route exact path="/home" component={Home} />
              <Route path="/Simple" component={Simple} />
              <Route path="/Avance" component={Advanced} />
              <Route path="/inscription" component={Signup_container} />
              <Route path="/connexion" component={Signin} />
              <Route path="/session/:id" component={SessionPage} />
              <Route path="/monespace" component={MonEspace} />
              <Route path="/creersession" component={CreateSession} />
              <Route path="/ChoisirMood" component={Mood} />
              <Route path="/Initialisation" component={Signup_signin} />
              <Redirect to="/home" />
            </Switch>
          </Router>
        </div>
      </AuthContext.Provider>
    </SocketContext.Provider>
  );
}

export default App;
