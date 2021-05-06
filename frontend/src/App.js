import { BrowserRouter as Router, Switch, Route, Redirect, useHistory } from "react-router-dom";
import "./App.css";
import Signin from "./component/Signin";
import Signup_container from "./component/signup/Signup_container";
import Navbar from "./component/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./component/Home";
import MonEspace from "./component/MonEspace";
import Mood from "./component/swipe/Mood";
import Swipe from "./component/swipe/Swipe";
import Match from "./component/swipe/Match";
import CreateSession from "./component/CreateSession";
import SessionPage from "./component/SessionPage";
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
    console.log("UseEffect in app.js");
    const storedToken = JSON.parse(localStorage.getItem("pldsmartToken"));
    const storedUser = JSON.parse(localStorage.getItem("pldsmartUser"));
    console.log("stored token", storedToken);
    if (storedToken && storedToken.token && new Date(storedToken.expiration).getTime() > new Date().getTime()) {
      console.log("login launched");
      login(storedToken.token, storedUser.userId, storedUser.username);
    }
  }, []);

  const login = (newToken, userId, username) => {
    localStorage.setItem("pldsmartToken", JSON.stringify({ token: newToken, expiration: new Date().getTime() + 1000 * 60 * 60 * 24 }));
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
              <Route path="/swipe" component={Swipe} />
              <Route path="/inscription" component={Signup_container} />
              <Route path="/connexion" component={Signin} />
              <PrivateRoute path="/session/:id" component={SessionPage} />
              <PrivateRoute path="/match/:id" component={Match} />
              <PrivateRoute path="/monespace" component={MonEspace} />
              <PrivateRoute path="/creersession" component={CreateSession} />
              <PrivateRoute path="/choisirmood" component={Mood} />
              <Redirect to="/home" />
            </Switch>
          </Router>
        </div>
      </AuthContext.Provider>
    </SocketContext.Provider>
  );
}

export default App;
