import { Routes } from "./routes";
import { AuthContextProvider } from "./context/authContext";
export const App = () => (
  <AuthContextProvider>
    <Routes />
  </AuthContextProvider>
);
