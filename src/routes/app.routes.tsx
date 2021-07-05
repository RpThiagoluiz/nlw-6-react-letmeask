import { Route, Switch } from "react-router";
import { Home } from "../pages/Home";
import { NewRoom } from "../pages/NewRoom";
import { NotFound } from "../pages/NotFound";

export const AppRoutes = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/rooms/new" exact component={NewRoom} />
    <Route path="*" component={NotFound} />
  </Switch>
);
