import { Link } from "react-router-dom";
import "./styles.scss";
import websiteLogo from "../../assets/website-logo.png";

export default function Header() {
  return (
    <header>
      <Link className="logo" to="/">
        <img src={websiteLogo} alt="logo"></img>
      </Link>
      <Link className="favorites" to="/favorites">
        My list
      </Link>
    </header>
  );
}
