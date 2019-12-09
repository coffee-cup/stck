export const makeAnchor = (value: any): string =>
  value.replace(/\s+/g, "-").toLowerCase();

export const capitalize = (value: string): string =>
  `${value[0].toUpperCase()}${value.substring(1)}`;
