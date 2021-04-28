import logo from './logo.svg';
import './App.css';

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
