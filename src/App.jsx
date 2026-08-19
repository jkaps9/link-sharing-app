import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router";

import { supabase } from "./lib/supabaseClient.js";

import styles from "./App.module.css";
import LogoLarge from "./assets/icons/logo-devlinks-large.svg";
import LogoSmall from "./assets/icons/logo-devlinks-small.svg";
import LinkIcon from "./assets/icons/icon-link.svg?react";
import ProfileIcon from "./assets/icons/icon-profile-details-header.svg?react";
import PreviewIcon from "./assets/icons/icon-preview-header.svg";

function App() {
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

  /**
   * Compares current links against existing userLinks:
   * - Deletes removed items from Supabase
   * - Upserts new/modified items to Supabase
   *
   * @param {Array<Object>} currentLinks - The current state/edited links.
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

    // 1. Identify Removed Links
    const currentIdSet = new Set(
      currentLinks.map((item) => item.id).filter(Boolean),
    );
    const removedLinkIds = userLinks
      .filter((original) => !currentIdSet.has(original.id))
      .map((item) => item.id);

    // 2. Identify Modified or Added Links
    const initialMap = new Map(userLinks.map((item) => [item.id, item]));
    const changedLinks = currentLinks.filter((current) => {
      if (!current.id) return true; // Newly added item

      const original = initialMap.get(current.id);
      if (!original) return true;

      // Compare editable fields
      const isUrlChanged = current.url !== original.url;
      const isPlatformChanged = current.platform !== original.platform;
      const isOrderChanged = current.sort_order !== original.sort_order;

      return isUrlChanged || isPlatformChanged || isOrderChanged;
    });

    // 3. Early return if nothing changed
    if (changedLinks.length === 0 && removedLinkIds.length === 0) {
      console.log("No changes detected. Skipping update.");
      return;
    }

    // 4. Process Deletions (if any)
    if (removedLinkIds.length > 0) {
      const { error: deleteError } = await supabase
        .from("links")
        .delete()
        .in("id", removedLinkIds);

      if (deleteError) {
        console.error("Error deleting links:", deleteError.message);
        return;
      }
    }

    // 5. Process Upserts (if any)
    if (changedLinks.length > 0) {
      const linksWithUserId = changedLinks.map((link) => ({
        ...link,
        user_id: user.id,
      }));

      const { error: upsertError } = await supabase
        .from("links")
        .upsert(linksWithUserId, { onConflict: "id" });

      if (upsertError) {
        console.error("Error upserting links:", upsertError.message);
        return;
      }
    }

    // 6. Refresh state with the complete latest list
    const { data: updatedList, error: fetchError } = await supabase
      .from("links")
      .select("*")
      .eq("user_id", user.id)
      .order("sort_order", { ascending: true });

    if (!fetchError && updatedList) {
      setUserLinks(updatedList);
    }
  }

  const outletProps = {
    userLinks,
    updateLinks,
    profileData,
    updateProfile,
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
