import { useMemo } from "react";
import {
  SameNumberPoints,
  SingleNumberPoints,
  StraightPoints,
  ThreePairsPoints,
} from "../types";

export const useSameNumberCombinationIndexes = (
  currentShakeDices: number[],
  points: {
    sameNumbers?: SameNumberPoints;
    singleNumbers?: SingleNumberPoints;
    threePairs?: ThreePairsPoints;
    straight?: StraightPoints;
  },
) => {
  return useMemo(() => {
    if (points.sameNumbers?.length) {
      return points.sameNumbers.map((sameNumberComb) => {
        const combDice = sameNumberComb.dices?.[0];
        const startIndex = currentShakeDices.indexOf(combDice);
        const lastIndex = currentShakeDices.lastIndexOf(combDice);
        return {
          dice: combDice,
          startIndex,
          lastIndex,
          points: sameNumberComb.points,
        };
      });
    }
    return [];
  }, [points, currentShakeDices]);
};
