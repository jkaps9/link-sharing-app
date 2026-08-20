import PhoneSVG from "../assets/icons/illustration-phone-mockup.svg?react";
import PreviewLink from "./PreviewLink.jsx";
import styles from "../styles/PhoneMockup.module.css";
import type { ProfileData, UserLink } from "../types.js";
import LogoSmall from "../assets/icons/logo-devlinks-small.svg";

interface PhoneMockupProps {
  userLinks: UserLink[];
  profileData: ProfileData;
}

const PhoneMockup = ({ userLinks, profileData }: PhoneMockupProps) => {
  return (
    <div className={styles.mockupContainer}>
      <PhoneSVG className={styles.phoneImage} aria-hidden="true" />
      <div className={styles.screenOverlay}>
        <div className={styles.profileWrapper}>
          <img
            src={`${profileData.avatar ? profileData.avatar : LogoSmall}`}
            alt="user avatar"
            className={styles.avatar}
          />
          <div className={styles.profileInfo}>
            <p
              style={{
                color: "var(--color-text-header)",
                fontSize: "1.125rem",
                fontWeight: "600",
              }}
            >
              {profileData.first_name} {profileData.last_name}
            </p>
            <p style={{ fontSize: "0.875rem" }}>{profileData.email}</p>
          </div>
        </div>
        <div className={styles.linksWrapper}>
          {userLinks.map((link) => (
            <div className={styles.link} key={link.id}>
              <PreviewLink link={link} isMockup={true}></PreviewLink>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhoneMockup;
