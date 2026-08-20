import React from "react";
import FallbackIcon from "../assets/icons/icon-link.svg?react";

type SvgModule = {
  default: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
};

const iconModules = import.meta.glob<SvgModule>("../assets/icons/*.svg", {
  query: "?react",
  eager: true,
});

export const getPlatformIcon = (filename: string) => {
  const exactPath = `../assets/icons/${filename}`;
  return iconModules[exactPath]?.default || FallbackIcon;
};
