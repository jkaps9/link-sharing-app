import { Link } from "react-router";
import { useLocalStorage } from "../hooks/useLocalStorage.js";
import PreviewLink from "../components/PreviewLink.jsx";
import styles from "../styles/Preview.module.css";

const Preview = () => {
  const [userLinks, setUserLinks] = useLocalStorage("userLinks", []);
  const [profileData, setProfileData] = useLocalStorage("profileData", {});

  return (
    <>
      <div className={styles.backgroundShape}></div>
      <header
        className="card"
        style={{
          flexDirection: "row",
          gap: "1rem",
          justifyContent: "space-between",
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
                  {profileData.firstName} {profileData.lastName}
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
      </main>
    </>
  );
};

export default Preview;
