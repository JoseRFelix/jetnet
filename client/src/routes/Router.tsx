import React from "react";
import { Switch, Route, Redirect } from "react-router";
import { routes } from "../constants";
import ModalManager from "components/modals/ModalManager";
import { RootState } from "slices";
import { useSelector } from "react-redux";
import { PrivateRoute } from "components";
import { EditProfile } from ".";

const Landing = React.lazy(() => import("routes/Landing"));
const UserProfile = React.lazy(() => import("routes/UserProfile"));

const Router: React.FC = () => {
  const token = useSelector((state: RootState) => state.auth.token);

  return (
    <>
      <ModalManager />
      <React.Suspense fallback={<h1>Loading...</h1>}>
        <Switch>
          <PrivateRoute
            component={Landing}
            isPermitted={!token}
            redirectTo={routes.user.Profile}
            path={routes.Landing}
            exact
          />
          <PrivateRoute
            component={UserProfile}
            isPermitted={!!token}
            redirectTo={routes.Landing}
            path={routes.user.Profile}
            exact
          />
          <PrivateRoute
            component={EditProfile}
            isPermitted={!!token}
            redirectTo={routes.Landing}
            path={routes.user.EditProfile}
            exact
          />
          <Route
            exact
            path={routes.NotFound}
            render={() => <h1>Not Found</h1>}
          />
          <Redirect to={routes.NotFound} />
        </Switch>
      </React.Suspense>
    </>
  );
};

export default Router;
