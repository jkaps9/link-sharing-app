import { Link } from "react-router";
import { platforms } from "../data/platforms";
import { getPlatformIcon } from "../utils/iconLoader";
import ArrowIcon from "../assets/icons/icon-arrow-right.svg?react";
import styles from "../styles/PreviewLink.module.css";

const PreviewLink = ({ link, isMockup = false }) => {
  const platform = platforms.find((item) => item.id === link.platform);
  if (!platform) return null;
  const PlatformIcon = getPlatformIcon(platform.iconFilename);
  return (
    <Link
      to={link.url}
      className={`${styles.previewLink} ${isMockup ? styles.mockupModifier : ""}`}
      style={{
        backgroundColor: platform.color,
        borderColor:
          platform.id === "frontendmentor"
            ? "var(--color-border)"
            : "transparent",

        color:
          platform.id === "frontendmentor"
            ? "var(--colors-black)"
            : "var(--colors-white)",
      }}
    >
      <div className={styles.previewPlatform}>
        {PlatformIcon && (
          <PlatformIcon
            width="16"
            height="16"
            fill="currentColor"
          ></PlatformIcon>
        )}
        <span>{platform.name}</span>
      </div>
      <ArrowIcon aria-hidden="true" width="12" height="12" />
    </Link>
  );
};

export default PreviewLink;
