import { Route, Switch } from "react-router";
import { Home } from "../pages/Home";
import { NotFound } from "../pages/NotFound";

export const AuthRoutes = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="*" component={NotFound} />
  </Switch>
);
