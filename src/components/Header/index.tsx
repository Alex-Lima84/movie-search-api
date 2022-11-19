import { Link } from "react-router-dom";
import "./styles.scss";

export default function Header() {
  return (
    <header>
      <Link className="logo" to="/">
        Movies DB
      </Link>
      <Link className="favorites" to="/favorites">
        My list
      </Link>
    </header>
  );
}
