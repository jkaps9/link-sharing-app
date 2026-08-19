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
      sort_order: newLink.sort_order,
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

  /**
   * Compares local links against initial links and updates changed records in Supabase.
   *
   * @param {Array<Object>} currentLinks - The current state/edited links.
   * @param {Array<Object>} initialLinks - The original state/links fetched from the DB.
   * @returns {Promise<{ updatedCount: number, data: Array | null, error: any }>}
   */
  async function updateLinks(currentLinks) {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error("User is not authenticated");
      return;
    }

    // 1. Create a fast lookup map for original records by their ID
    const initialMap = new Map(userLinks.map((item) => [item.id, item]));

    // 2. Filter for items that are new or have modified fields
    const changedLinks = currentLinks.filter((current) => {
      // If there is no ID, it's a newly added link
      if (!current.id) return true;

      const original = initialMap.get(current.id);

      // If ID not found in original list, consider it changed/new
      if (!original) return true;

      // Compare editable fields
      const isUrlChanged = current.url !== original.url;
      const isPlatformChanged = current.platform !== original.platform;
      const isOrderChanged = current.sort_order !== original.sort_order;

      return isUrlChanged || isPlatformChanged || isOrderChanged;
    });

    // 3. Skip DB call if nothing has changed
    if (changedLinks.length === 0) {
      console.log("No changes detected. Skipping update.");
      return { updatedCount: 0, data: [], error: null };
    }

    const linksWithUserId = changedLinks.map((link) => ({
      ...link,
      user_id: user.id,
    }));

    // 4. Batch upsert only the modified/new records
    const { data, error } = await supabase
      .from("links")
      .upsert(linksWithUserId, { onConflict: "id" })
      .select();

    if (error) {
      console.error("Error updating links:", error.message);
      return { updatedCount: 0, data: null, error };
    }

    console.log(`Successfully updated ${data.length} link(s):`, data);
    setUserLinks(data);
    return { updatedCount: data.length, data, error: null };
  }

  const outletProps = {
    userLinks,
    updateLinks,
    profileData,
    updateProfile,
  };

  return (
    <>
      {/* <ul>
        {userLinks.map((link) => (
          <li key={link.id}>{link.url}</li>
        ))}
      </ul> */}
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
