import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Signin from "./component/Signin";
import Signup_container from "./component/signup/Signup_container";
import Navbar from "./component/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./component/Home";
import MonEspace from "./component/MonEspace";
import Simple from "./component/swipe/examples/Simple";
import Advanced from "./component/swipe/examples/Advanced";
import CreateSession from "./component/CreateSession";
import SessionPage from "./component/SessionPage";
import Signup_signin from "./component/Signup_signin";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/Simple" component={Simple} />
          <Route exact path="/Avance" component={Advanced} />
          <Route exact path="/inscription" component={Signup_container} />
          <Route exact path="/connexion" component={Signin} />
          <Route exact path="/monespace" component={MonEspace} />
          <Route exact path="/creersession" component={CreateSession} />
          <Route exact path="/session/:id" component={SessionPage} />
          <Route exact path="/Initialisation" component={Signup_signin} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
