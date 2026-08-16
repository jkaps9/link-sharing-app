import PhoneSVG from "../assets/icons/illustration-phone-mockup.svg?react";
import PreviewLink from "../components/PreviewLink.jsx";
import styles from "../styles/PhoneMockup.module.css";

const PhoneMockup = ({ userLinks }) => {
  return (
    <div className={styles.mockupContainer}>
      <PhoneSVG className={styles.phoneImage} aria-hidden="true" />
      <div className={styles.screenOverlay}>
        <div className={styles.linksWrapper}>
          {userLinks.map((link) => (
            <PreviewLink key={link.id} link={link}></PreviewLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhoneMockup;
