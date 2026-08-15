const iconModules = import.meta.glob("../assets/icons/*.svg", {
  query: "?react",
  eager: true,
});

export const getPlatformIcon = (filename) => {
  const exactPath = `../assets/icons/${filename}`;
  return iconModules[exactPath]?.default || null;
};
