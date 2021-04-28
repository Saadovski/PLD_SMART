import logo from "./logo.svg";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Signin from "./component/signin";
import Signup from "./component/signup";
import Signup_Signin from "./component/signup_signin";
import Navbar from "./component/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Signup_Signin} />
          <Route exact path="/inscription" component={Signup} />
          <Route exact path="/connexion" component={Signin} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
