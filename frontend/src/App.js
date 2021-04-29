import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Signin from "./component/signin";
import Signup from "./component/signup";
import Signup_Signin from "./component/signup_signin";
import Navbar from "./component/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./component/Home";
import MonEspace from "./component/MonEspace";
import CreateSession from "./component/CreateSession";
import SessionPage from "./component/SessionPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
<<<<<<< HEAD
          <Route path="/inscription" component={Signup} />
          <Route path="/connexion" component={Signin} />
          <Route path="/monespace" component={MonEspace} />
          <Route path="/creersession" component={CreateSession} />
          <Route path="/session/:id" component={SessionPage} />
=======
          <Route exact path="/Initialisation" component={Signup_Signin} />
          <Route exact path="/inscription" component={Signup} />
          <Route exact path="/connexion" component={Signin} />
          <Route exact path="/monespace" component={MonEspace} />
>>>>>>> c2de17b3db8dd379efc75e595795553c7a8e6d47
        </Switch>
      </Router>
    </div>
  );
}

export default App;
