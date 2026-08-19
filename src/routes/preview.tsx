import { useEffect, useState } from "react";
import { Link } from "react-router";
import type { ProfileData, UserLink } from "../types.js";
import PreviewLink from "../components/PreviewLink.js";
import styles from "../styles/Preview.module.css";

import { supabase } from "../lib/supabaseClient.js";
const Preview = () => {
  const [userLinks, setUserLinks] = useState<UserLink[]>([]);
  const [profileData, setProfileData] = useState<ProfileData>({
    avatar: null,
    first_name: "",
    last_name: "",
    email: "",
  });
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

  return (
    <div className={styles.previewContainer}>
      <div className={styles.backgroundShape}></div>
      <header
        className="card"
        style={{
          flexDirection: "row",
          gap: "1rem",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Link
          to={`${import.meta.env.BASE_URL}links`}
          className="btn btn--secondary"
        >
          <span>Back to Editor</span>
        </Link>
        <button type="button" className="btn btn--primary">
          <span>Share Link</span>
        </button>
      </header>
      <main style={{ display: "flex", marginInline: "auto" }}>
        {loading ? (
          <p style={{ marginInline: "auto" }}>Loading...</p>
        ) : (
          <section>
            <div className={`${styles.previewCard} card`}>
              <div className={styles.profileWrapper}>
                <img
                  src={`${profileData.avatar}`}
                  alt="user avatar"
                  className="avatar"
                />
                <div className={styles.profileInfo}>
                  <p
                    style={{
                      color: "var(--color-text-header)",
                      fontSize: "2rem",
                      fontWeight: "600",
                    }}
                  >
                    {profileData.first_name} {profileData.last_name}
                  </p>
                  <p>{profileData.email}</p>
                </div>
              </div>
              <ul className={styles.linkList}>
                {userLinks.map((link) => (
                  <li key={link.id}>
                    <PreviewLink link={link}></PreviewLink>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default Preview;
