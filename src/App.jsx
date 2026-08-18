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

  useEffect(() => {
    async function fetchData() {
      try {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError || !user) {
          console.error("User is not authenticated");
          return;
        }

        // Fetch both simultaneously and wait for both to finish
        const [linksRes, profileRes] = await Promise.all([
          supabase.from("links").select("*"),
          supabase.from("users").select("*").limit(1).single(),
        ]);

        if (linksRes.error) {
          console.error("Error fetching links:", linksRes.error.message);
        } else {
          setUserLinks(linksRes.data);
        }

        if (profileRes.error) {
          console.error("Error fetching profile:", profileRes.error.message);
        } else {
          setProfileData(profileRes.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const updateProfile = async (newData) => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error("User is not authenticated");
      return;
    }

    console.log(newData);

    const { data, error } = await supabase
      .from("users")
      .update({
        email: newData.email,
        avatar: newData.avatar,
        first_name: newData.firstName,
        last_name: newData.lastName,
      })
      .eq("id", user.id)
      .select();

    if (error) {
      alert(error.message);
    } else {
      setProfileData(data[0]);
      console.log(data);
    }
  };

  async function createLink(newLink) {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error("User is not authenticated");
      return;
    }

    const { data, error } = await supabase.from("links").insert({
      id: newLink.id,
      sort_order: newLink.order,
      platform: newLink.platform,
      url: newLink.url,
      user_id: user.id, // Must match auth.uid() or the DB rejects it
    });

    if (error) {
      console.error("Error posting data:", error.message);
      return;
    }
    return data;
  }

  const outletProps = {
    userLinks,
    setUserLinks,
    profileData,
    updateProfile,
  };

  return (
    <>
      <ul>
        {userLinks.map((link) => (
          <li key={link.id}>{link.url}</li>
        ))}
      </ul>
      {/* <p>{profileData.email}</p> */}
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
          {loading ? <p>Loading...</p> : <Outlet context={outletProps} />}
        </main>
      </div>
    </>
  );
}

export default App;
