import { Link } from "react-router-dom";
import "../styles/noAdmin.scss";

export const NotAdmin = () => (
  <div id="not-Admin">
    <h1>Just For Admilsons 😔</h1>
    <Link to="/"> Back to Home</Link>
  </div>
);
