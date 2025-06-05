import { useMemo } from "react";
import { AllCombinations } from "../types";

export const useFlatCombinations = (
  combinations: AllCombinations,
): number[] => {
  return useMemo(() => {
    return Object.values(combinations)
      .map((comb) => (Array.isArray(comb) ? comb.flat() : comb))
      .flat();
  }, [combinations]);
};
