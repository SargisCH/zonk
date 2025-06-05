import { useMemo } from "react";

export const useIsZonkRound = (
  dicesLength: number,
  combinations: number[],
  animationStarted: boolean,
  slideAnimationEnded: boolean,
  gameStarted: boolean,
) => {
  return useMemo(() => {
    return (
      combinations.length === 0 &&
      !animationStarted &&
      dicesLength > 0 &&
      slideAnimationEnded &&
      gameStarted
    );
  }, [
    combinations.length,
    animationStarted,
    dicesLength,
    slideAnimationEnded,
    gameStarted,
  ]);
};
