import React from "react";

import { Switch, Route, Redirect } from "react-router";
import { routes } from "../constants";
import ModalManager from "components/modals/ModalManager";

const Landing = React.lazy(() => import("routes/Landing"));
const UserProfile = React.lazy(() => import("routes/UserProfile"));

interface Props {}

const Router: React.FC<Props> = () => {
  return (
    <>
      <ModalManager />
      <Switch>
        <React.Suspense fallback={<h1>Loading...</h1>}>
          <Route component={Landing} exact path={routes.Landing} />
          <Route component={UserProfile} exact path={routes.user.Profile} />
        </React.Suspense>
      </Switch>
    </>
  );
};

export default Router;
