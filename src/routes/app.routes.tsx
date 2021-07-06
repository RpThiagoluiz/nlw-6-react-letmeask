import { Route, Switch } from "react-router";
import { Home } from "../pages/Home";
import { NewRoom } from "../pages/NewRoom";
import { NotFound } from "../pages/NotFound";
import { Room } from "../pages/Room";
import { AdminRoom } from "../pages/AdminRoom";

export const AppRoutes = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/rooms/new" component={NewRoom} />
    <Route path="/rooms/:id" component={Room} />
    <Route path="/admin/rooms/:id" component={AdminRoom} />
    <Route path="*" component={NotFound} />
  </Switch>
);
