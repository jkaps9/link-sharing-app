import { NavLink, Outlet, useOutletContext } from "react-router";
import { supabase } from "./lib/supabaseClient.js";

import styles from "./App.module.css";
import LogoLarge from "./assets/icons/logo-devlinks-large.svg";
import LogoSmall from "./assets/icons/logo-devlinks-small.svg";
import LinkIcon from "./assets/icons/icon-link.svg?react";
import ProfileIcon from "./assets/icons/icon-profile-details-header.svg?react";
import PreviewIcon from "./assets/icons/icon-preview-header.svg";

function Dashboard() {
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) alert(error.message);
  };

  return (
    <>
      <div className={styles.app}>
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
              <LinkIcon aria-hidden="true" width="16" height="16"></LinkIcon>
              <span className={styles.hideOnMobile}>Links</span>
            </NavLink>
            <NavLink to="profile" className={`row ${styles.navLink}`}>
              <ProfileIcon
                aria-hidden="true"
                width="16"
                height="16"
              ></ProfileIcon>
              <span className={styles.hideOnMobile}>Profile Details</span>
            </NavLink>
          </nav>
          <div style={{ display: "flex", gap: "1rem" }}>
            <button className="btn btn--text" onClick={signOut}>
              Sign out
            </button>
            <NavLink to="../preview" className="btn btn--secondary">
              <span className={styles.hideOnMobile}>Preview</span>
              <img src={PreviewIcon} alt="" className={styles.mobileOnly} />
            </NavLink>
          </div>
        </header>
        <main className={styles.main}>
          <Outlet context={useOutletContext()} />
        </main>
      </div>
    </>
  );
}

export default Dashboard;
