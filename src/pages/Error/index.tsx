import { Link } from "react-router-dom";
import "./styles.scss";

export default function Error() {
  return (
    <div className="not-found-container">
      <h1>Error 404</h1>
      <h2>Page not found 😢</h2>
      <Link to="/">Please visit our Home Page</Link>
    </div>
  );
}
