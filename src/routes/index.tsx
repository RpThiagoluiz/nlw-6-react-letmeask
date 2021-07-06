import { BrowserRouter } from "react-router-dom";
//import { useAuth } from "../hooks/useAuth";
//import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";

export const Routes = () => {
  // const { user } = useAuth();
  // return <BrowserRouter>{user ? <AppRoutes /> : <AuthRoutes />}</BrowserRouter>;
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};
