import { Link } from "react-router";
import { platforms } from "../data/platforms";
import ArrowIcon from "../assets/icons/icon-arrow-right.svg?react";
import styles from "../styles/PreviewLink.module.css";
const PreviewLink = ({ link }) => {
  const platform = platforms.find((item) => item.id === link.platform);
  return (
    <Link
      to={link.url}
      className={styles.previewLink}
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
        <img
          src={platform.iconPath}
          alt={`${platform.name} icon`}
          width="16"
          height="16"
        />
        <span>{platform.name}</span>
      </div>
      <ArrowIcon aria-hidden="true" width="12" height="12" />
    </Link>
  );
};

export default PreviewLink;
