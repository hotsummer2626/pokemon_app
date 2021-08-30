const breakpoint = {
  xs: 576,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
};

export const mediaQueries = (key) => {
  return (key === "xs"
    ? (style) => `@media (max-width: ${breakpoint[key]}px) { ${style} }`
    : (style) => `@media (min-width: ${breakpoint[key]}px) { ${style} }`);
};

