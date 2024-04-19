import { getNumberFromName } from "./getNumberFromName";
import { seeds } from "./constants";

export const getSeed = (name: string) => {
  const number = getNumberFromName(name);
  return seeds[number];
};

