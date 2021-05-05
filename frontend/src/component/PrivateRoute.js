import { useContext } from "react";
import { Redirect, Route } from "react-router";
import { AuthContext } from "../context/authContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext);
  console.log("AuthContext", authContext.isAuth);

  return (
    <Route
      {...rest}
      render={(props) =>
        !!localStorage.getItem("pldsmartToken") || authContext.isAuth ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect to={{ pathname: "/connexion", state: { from: props.location } }} />
        )
      }
    ></Route>
  );
};

export default PrivateRoute;
