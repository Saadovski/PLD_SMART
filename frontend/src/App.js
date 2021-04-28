import logo from './logo.svg';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Signup_Signin from './component/signup_signin';
import Signup from './component/signup';

function App() {
  return (
    <div className="App">
      <Router>
          <Switch>
            <Route exact path="/" component={Signup_Signin} />
            <Route exact path="/signup" component={Signup} />
          </Switch>
        </Router>
    </div>
  );
}

export default App;
