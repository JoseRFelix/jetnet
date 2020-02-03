import React from "react";
import {
  Route,
  Redirect,
  RouteProps,
  RouteComponentProps
} from "react-router-dom";

interface Props extends RouteProps {
  component:
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>;
  isPermitted: boolean;
  redirectTo?: string;
}

const PrivateRoute: React.FC<Props> = ({
  component: Component,
  isPermitted,
  redirectTo = "/",
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      isPermitted === true ? (
        <Component {...props} />
      ) : (
        <Redirect to={redirectTo} />
      )
    }
  />
);

export default PrivateRoute;
