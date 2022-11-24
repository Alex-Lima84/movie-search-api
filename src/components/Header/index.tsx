import { Link } from "react-router-dom";
import "./styles.scss";
import websiteLogo from "../../assets/website-logo2.png";

export default function Header() {
  return (
    <header>
      <div className="middle-div">
        <div className="bottom-div">
          <Link className="logo" to="/">
            <img src={websiteLogo} alt="logo"></img>
          </Link>
          <Link className="favorites" to="/favorites">
            My list
          </Link>
        </div>
      </div>
    </header>
  );
}
