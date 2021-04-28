import logo from './logo.svg';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Signin from './component/signin';
import Signup from './component/signup';
import Signup_Signin from './component/signup_signin';


function App() {
  return (
    <div className="App">
      <Router>
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
