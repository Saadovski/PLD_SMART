import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import Signin from "./component/Signin";
import Signup_container from "./component/signup/Signup_container";
import Navbar from "./component/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./component/Home";
import MonEspace from "./component/MonEspace";
import Simple from "./component/swipe/examples/Simple";
import Advanced from "./component/swipe/examples/Advanced";
import CreateSession from "./component/CreateSession";
import SessionPage from "./component/SessionPage";
import Signup_signin from "./component/Signup_signin";
import { useEffect, useState } from "react";
import { AuthContext } from "./context/authContext";
import PrivateRoute from "./component/PrivateRoute";

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = JSON.parse(localStorage.getItem("pldsmartToken"));
    console.log("stored token", storedToken);
    if (storedToken && storedToken.token && new Date(storedToken.expiration).getTime() > new Date().getTime()) {
      login(storedToken.token);
    }
  }, []);

  const login = (newToken) => {
    localStorage.setItem("pldsmartToken", JSON.stringify({ token: newToken, expiration: new Date().getTime() + 1000 * 60 * 2 }));
    setToken(newToken);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("pldsmartToken");
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider value={{ isAuth: !!token, login: login, logout: logout, token: token }}>
      <div className="App">
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/Simple" component={Simple} />
            <Route path="/Avance" component={Advanced} />
            <Route path="/inscription" component={Signup_container} />
            <Route path="/connexion" component={Signin} />
            <Route path="/monespace" component={MonEspace} />
            <Route path="/creersession" component={CreateSession} />
            <Route path="/session/:id" component={SessionPage} />
            <Route path="/Initialisation" component={Signup_signin} />
            <Redirect to="/" />
          </Switch>
        </Router>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
