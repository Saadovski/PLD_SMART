import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Signin from "./component/signin";
import Signup_container from "./component/signup/Signup_container";
import Navbar from "./component/Navbar";
import Home from "./component/Home";
import MonEspace from "./component/MonEspace";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/inscription" component={Signup_container} />
          <Route exact path="/connexion" component={Signin} />
          <Route exact path="/monespace" component={MonEspace} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
