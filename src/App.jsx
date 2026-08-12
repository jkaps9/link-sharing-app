import { Link } from "react-router";
import styles from "./App.module.css";
import LogoLarge from "./assets/icons/logo-devlinks-large.svg";
import LogoSmall from "./assets/icons/logo-devlinks-small.svg";
import LinkIcon from "./assets/icons/icon-link.svg";
import ProfileIcon from "./assets/icons/icon-profile-details-header.svg";

function App() {
  return (
    <>
      <header className={`row ${styles.header}`}>
        <div>
          <img
            src={LogoLarge}
            alt="Dev Links Logo"
            className={styles.hideOnMobile}
          />
          <img
            src={LogoSmall}
            alt="Dev Links Logo"
            className={styles.mobileOnly}
          />
        </div>
        <nav className={styles.navList}>
          <Link to="preview" className={`row ${styles.navLink}`}>
            <img src={LinkIcon} alt="" aria-hidden="true" />
            <span className={styles.hideOnMobile}>Links</span>
          </Link>
          <Link to="profile" className={`row ${styles.navLink}`}>
            <img src={ProfileIcon} alt="" aria-hidden="true" />
            <span className={styles.hideOnMobile}>View Profile</span>
          </Link>
        </nav>

        <button>Preview</button>
      </header>
      <main></main>
    </>
  );
}

export default App;
