import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import "./styles/AppBis.css";
import Signin from "./component/Signin";
import Signup from "./component/Signup";
import Signup_Signin from "./component/Signup_signin";
import Navbar from "./component/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./component/Home";
import MonEspace from "./component/MonEspace";
import Simple from "./component/swipe/examples/Simple";
import Advanced from "./component/swipe/examples/Advanced";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/Simple" component={Simple} />
          <Route exact path="/Avance" component={Advanced} />
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
