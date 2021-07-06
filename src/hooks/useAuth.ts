import { useContext } from "react";
import { AuthContext } from "../context/authContext";

export const useAuth = () => useContext(AuthContext);

//Other away

// export function useAuth(){
//   const value = useContext(AuthContext)
//   return value
// }
