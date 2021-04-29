import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Signin from "./component/signin";
import Signup from "./component/signup";
import Signup_Signin from "./component/signup_signin";
import Navbar from "./component/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./component/Home";
import MonEspace from "./component/MonEspace";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/Initialisation" component={Signup_Signin} />
          <Route exact path="/inscription" component={Signup} />
          <Route exact path="/connexion" component={Signin} />
          <Route exact path="/monespace" component={MonEspace} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
