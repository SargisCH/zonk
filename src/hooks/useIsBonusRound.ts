import { useMemo } from "react";
import { IDice } from "../types";

export const useIsBonusRound = (dices: IDice[]) => {
  return useMemo(
    () => dices.filter((dice) => !dice.removed).length === 0,
    [dices],
  );
};
