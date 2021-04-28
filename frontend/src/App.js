import logo from "./logo.svg";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Signup_Signin from "./component/signup_signin";
import Navbar from "./component/Navbar";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />

        <Switch>
          <Route exact path="/" component={Signup_Signin} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
