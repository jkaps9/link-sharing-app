import { Link } from "react-router";
import { useLocalStorage } from "../hooks/useLocalStorage.js";
import PreviewLink from "../components/PreviewLink.jsx";
import styles from "../styles/Preview.module.css";

const Preview = () => {
  const [userLinks, setUserLinks] = useLocalStorage("userLinks", []);
  const [profileData, setProfileData] = useLocalStorage("profileData", {});

  return (
    <>
      <header className="row card">
        <button type="button" className="btn btn--secondary">
          <Link to={`${import.meta.env.BASE_URL}links`}>
            <span>Back to Editor</span>
          </Link>
        </button>
        <button type="button" className="btn btn--primary">
          <span>Share Link</span>
        </button>
      </header>
      <main>
        <section>
          <div className={`${styles.previewCard} card`}>
            <img
              src={`${profileData.avatar}`}
              alt="user avatar"
              className="avatar"
            />
            <p>
              {profileData.firstName} {profileData.lastName}
            </p>
            <p>{profileData.email}</p>

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
