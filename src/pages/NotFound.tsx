import { Link } from "react-router-dom";
import "../styles/notFound.scss";

export const NotFound = () => (
  <div id="not-FoundPage">
    <h1>404 | Not Found</h1>
    <Link to="/"> Back to Home</Link>
  </div>
);
