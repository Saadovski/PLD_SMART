import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Signin from "./component/signin";
import Signup_container from "./component/signup/Signup_container";
import Navbar from "./component/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./component/Home";
import MonEspace from "./component/MonEspace";
import CreateSession from "./component/CreateSession";
import SessionPage from "./component/SessionPage";
import Signup_Signin from "./component/signup_signin";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/inscription" component={Signup_container} />
          <Route path="/connexion" component={Signin} />
          <Route path="/monespace" component={MonEspace} />
          <Route path="/creersession" component={CreateSession} />
          <Route path="/session/:id" component={SessionPage} />
          <Route path="/Initialisation" component={Signup_Signin} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
