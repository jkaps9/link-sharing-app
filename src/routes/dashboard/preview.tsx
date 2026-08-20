import { Link, useOutletContext } from "react-router";
import type { OutletContextType } from "../../types.js";
import PreviewLink from "../../components/PreviewLink.js";
import styles from "../../styles/Preview.module.css";
import { toast } from "react-hot-toast";

import LinkCopiedIcon from "../../assets/icons/icon-link-copied-to-clipboard.svg?react";
import LogoSmall from "../../assets/icons/logo-devlinks-small.svg";

const notify = () =>
  toast("The link has been copied to your clipboard!", {
    icon: <LinkCopiedIcon />,
  });

const Preview = () => {
  const { userLinks, profileData } = useOutletContext<OutletContextType>();

  return (
    <div className={styles.previewContainer}>
      <div className={styles.backgroundShape}></div>
      <header
        className={`card ${styles.previewHeader}`}
        style={{
          flexDirection: "row",
          gap: "1rem",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Link
          to={`${import.meta.env.BASE_URL}dashboard/links`}
          className="btn btn--secondary"
        >
          <span>Back to Editor</span>
        </Link>
        <button type="button" className="btn btn--primary" onClick={notify}>
          <span>Share Link</span>
        </button>
      </header>
      <main style={{ display: "flex", marginInline: "auto" }}>
        <section>
          <div className={`${styles.previewCard} card`}>
            <div className={styles.profileWrapper}>
              <img
                src={`${profileData.avatar ? profileData.avatar : LogoSmall}`}
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
                  <PreviewLink link={link} isMockup={false}></PreviewLink>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Preview;
