import { Link } from "react-router-dom";
import "./styles.scss";

export default function Header() {
  return (
    <header>
      <Link className="logo" to="/">
        Prime Flix
      </Link>
      <Link className="favorites" to="/favorites">
        Minha seleção
      </Link>
    </header>
  );
}
