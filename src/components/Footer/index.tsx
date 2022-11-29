import "./styles.scss";
import websiteLogo from "../../assets/website-logo2.png";

export default function Footer() {
  return (
    <footer>
      <div className="middle-footer-div">
        <div className="lower-footer-div">
          <div className="contact-info-container">
            <a
              href="mailto:alexandre.cerutti@live.com"
              target="_blank"
              rel="noreferrer"
            >
              <h3>Contact ✉</h3>
            </a>
          </div>
          <div className="logo-container">
            <img src={websiteLogo} alt="logo"></img>
          </div>
        </div>
      </div>
    </footer>
  );
}
