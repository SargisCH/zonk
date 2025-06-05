import { useMemo } from "react";
import {
  SameNumberPoints,
  SingleNumberPoints,
  StraightPoints,
  ThreePairsPoints,
} from "../types";

export const usePointsPerShake = (points: {
  sameNumbers?: SameNumberPoints;
  singleNumbers?: SingleNumberPoints;
  threePairs?: ThreePairsPoints;
  straight?: StraightPoints;
}): number => {
  return useMemo(() => {
    return Object.values(points)
      ?.flat()
      .reduce((acc, { points }) => {
        return points + acc;
      }, 0);
  }, [points]);
};
