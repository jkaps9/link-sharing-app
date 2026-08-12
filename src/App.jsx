import { NavLink, Link, Outlet } from "react-router";
import styles from "./App.module.css";
import LogoLarge from "./assets/icons/logo-devlinks-large.svg";
import LogoSmall from "./assets/icons/logo-devlinks-small.svg";
import LinkIcon from "./assets/icons/icon-link.svg";
import ProfileIcon from "./assets/icons/icon-profile-details-header.svg";

import PreviewIcon from "./assets/icons/icon-preview-header.svg";

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
          <NavLink to="links" className={`row ${styles.navLink}`}>
            <img src={LinkIcon} alt="" aria-hidden="true" />
            <span className={styles.hideOnMobile}>Links</span>
          </NavLink>
          <NavLink to="profile" className={`row ${styles.navLink}`}>
            <img src={ProfileIcon} alt="" aria-hidden="true" />
            <span className={styles.hideOnMobile}>Profile Details</span>
          </NavLink>
        </nav>
        <button className="btn btn--secondary">
          <span className={styles.hideOnMobile}>Preview</span>
          <img src={PreviewIcon} alt="" className={styles.mobileOnly} />
        </button>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
