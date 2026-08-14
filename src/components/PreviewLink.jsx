import { Link } from "react-router";
import { platforms } from "../data/platforms";
import ArrowIcon from "../assets/icons/icon-arrow-right.svg";

const PreviewLink = ({ link }) => {
  const platform = platforms.find((item) => item.id === link.platform);
  return (
    <Link to={link.url}>
      <img
        src={platform.iconPath}
        alt={`${platform.name} icon`}
        width="16"
        height="16"
      />
      <span>{platform.name}</span>
      <img src={ArrowIcon} alt="" aria-hidden="true" width="12" height="12" />
    </Link>
  );
};

export default PreviewLink;
