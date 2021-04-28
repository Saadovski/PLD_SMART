import logo from './logo.svg';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Signup_Signin from './component/signin';

function App() {
  return (
    <div className="App">
      <Router>
          <Switch>
            <Route exact path="/" component={Signup_Signin} />
          </Switch>
        </Router>
    </div>
  );
}

export default App;
