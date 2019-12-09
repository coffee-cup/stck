import * as dayjs from "dayjs";

export const makeAnchor = (value: any): string =>
  value.replace(/\s+/g, "-").toLowerCase();

export const capitalize = (value: string): string =>
  `${value[0].toUpperCase()}${value.substring(1)}`;

export const formatDate = (dateString: string): string =>
  dayjs(dateString).format("MMMM D, YYYY");
