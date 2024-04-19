import { twins, triplets, quadruplets } from "./constants";
import { getNumberFromName } from "./getNumberFromName";

export const checkSiblings = (name: string) => {
  const number = getNumberFromName(name);
  if (twins.includes(number)) return 2;
  if (triplets.includes(number)) return 3;
  if (quadruplets.includes(number)) return 4;
  return 1;
};
