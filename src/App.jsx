import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router";
import { useLocalStorage } from "./hooks/useLocalStorage.js";
import { supabase } from "./lib/supabaseClient.js";

import styles from "./App.module.css";
import LogoLarge from "./assets/icons/logo-devlinks-large.svg";
import LogoSmall from "./assets/icons/logo-devlinks-small.svg";
import LinkIcon from "./assets/icons/icon-link.svg?react";
import ProfileIcon from "./assets/icons/icon-profile-details-header.svg?react";
import PreviewIcon from "./assets/icons/icon-preview-header.svg";

function App() {
  // const [userLinks, setUserLinks] = useLocalStorage("userLinks", []);
  // const [profileData, setProfileData] = useLocalStorage("profileData", {});
  const [userLinks, setUserLinks] = useState([]);
  const [profileData, setProfileData] = useState({});
  const [loading, setLoading] = useState(true);

  const outletProps = {
    userLinks,
    setUserLinks,
    profileData,
    setProfileData,
  };

  useEffect(() => {
    async function fetchLinks() {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        console.error("User is not authenticated");
        return;
      }

      const { data, error } = await supabase.from("links").select("*");

      if (error) {
        console.error("Error fetching data:", error.message);
      } else {
        setUserLinks(data);
      }
      setLoading(false);
    }

    fetchLinks();

    async function fetchProfile() {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        console.error("User is not authenticated");
        return;
      }

      const { data, error } = await supabase
        .from("users")
        .select("*")
        .limit(1)
        .single();

      if (error) {
        console.error("Error fetching data:", error.message);
      } else {
        // console.log(data);
        setProfileData(data);
      }
      setLoading(false);
    }

    fetchProfile();
  }, []);

  return (
    <>
      <ul>
        {userLinks.map((link) => (
          <li key={link.id}>{link.url}</li>
        ))}
      </ul>
      <p>{profileData.email}</p>
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

          <NavLink to="preview" className="btn btn--secondary">
            <span className={styles.hideOnMobile}>Preview</span>
            <img src={PreviewIcon} alt="" className={styles.mobileOnly} />
          </NavLink>
        </header>
        <main className={styles.main}>
          <Outlet context={outletProps} />
        </main>
      </div>
    </>
  );
}

export default App;
