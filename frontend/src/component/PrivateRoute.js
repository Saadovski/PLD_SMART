import { useContext } from "react";
import { Redirect, Route } from "react-router";
import { AuthContext } from "../context/authContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext);
  return (
    <Route {...rest} render={(props) => (authContext.isAuth ? <Component {...props} /> : <Redirect to={{ pathname: "/connexion", state: { from: props.location } }} />)}></Route>
  );
};

export default PrivateRoute;
