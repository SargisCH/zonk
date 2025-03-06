import { useEffect, useMemo, useState } from "react";
import Shaker from "../services/shaker";
import { useParams } from "react-router";
const defaultShakes: Array<{ dices: number[]; points: number }> = [
  ...Array(6).fill({ dices: [], combinations: [], points: 0 }),
];

import clsx from "clsx";
import Dice from "../components/Dice";
const DICE_CONTAINER_WIDTH = 60;
const DICE_CONTAINERS_GAP = 16;
const shaker = new Shaker();
export default function Game() {
  const [dices, setDices] = useState<number[]>([]);
  const [dicesCountForThrow, setDicesCountForThrow] = useState<number>();
  const [combinations, setCombinations] = useState({});
  const { gameId } = useParams();
  const [shakes, setShakes] = useState(defaultShakes);
  const [animationGenerated, setAnimationGenereated] = useState(false);
  const [animationStarted, setAnimationStarted] = useState(false);
  const [shakeNumber, setShakeNumber] = useState(0);
  const [slideAnimationEnded, setSlideAnimationEnded] = useState(false);
  const shake = () => {
    // substracting from all dice count (6) the already thrown dices count (last rounds count)
    const alreadyThrownDiceCount = shakes.reduce(
      (acc, prev) => acc + prev.dices.length,
      0,
    );
    const dicesLeft = 6 - alreadyThrownDiceCount;
    const dicesThrown = shaker.shake(dicesLeft);
    setAnimationStarted(false);
    setAnimationGenereated(false);
    setDices(dicesThrown);
    setCombinations(shaker.getAllCombinations());
    setShakeNumber(shakeNumber + 1);
    setDicesCountForThrow(dicesLeft);
  };
  useEffect(() => {
    const styleSheet = document.styleSheets[0]; // Get the first stylesheet (you could create a new one too)

    // Define the keyframe animation in a style block
    [...Array(dicesCountForThrow)].forEach((_, index) => {
      const keyframes = `
      @keyframes slideDice${index} {
        0% {
          bottom: 90px;
          right: 30px;
        }
        100% {
          bottom: ${index % 2 === 0 ? "600px" : "500px"};
          right: ${(index + 1) * 70}px;
        }
      }
    `;

      // Add the keyframes to the stylesheet
      styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
    });
    setAnimationGenereated(true);

    // Cleanup function to remove keyframes when the component unmounts
    return () => {
      styleSheet.deleteRule(styleSheet.cssRules.length - 1);
    };
  }, [dicesCountForThrow]);

  const combinationsFlat = Object.values(combinations)
    .map((comb) => (Array.isArray(comb) ? comb.flat() : comb))
    .flat();

  const { sameNumberIndexes, pointsPerShake } = useMemo(() => {
    const currentShakeDices = (
      shakes[shakes.length - shakeNumber]?.dices ?? []
    ).sort((a, b) => a - b);
    const points = shaker.getPoints(currentShakeDices);
    let sameNumbersIndexesTemp: Array<{
      dice: number;
      startIndex: number;
      lastIndex: number;
      points: number;
    }> = [];
    if (points.sameNumbers?.length) {
      sameNumbersIndexesTemp = points.sameNumbers.map((sameNumberComb) => {
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
    const pointsPerShake = Object.values(points)
      ?.flat()
      .reduce((acc, { points }) => {
        return points + acc;
      }, 0);
    return { pointsPerShake, sameNumberIndexes: sameNumbersIndexesTemp };
  }, [shakes, shakeNumber]);
  const shakeRound = shakes[shakes.length - shakeNumber];
  return (
    <div className="h-screen bg-linear-to-b from-purple-grad-from to-purple-grad-to flex-auto  flex items-center justify-center">
      <div className="h-[800px] border-4">
        <div className="flex justify-center gap-4 h-full">
          <div className="w-[200px] px-4 pv-4 border-4 bg-linear-to-b from-violet-grad-from to-violet-grad-to"></div>
          <div className="w-[600px] px-4 border-4 py-4 flex justify-end flex-col gap-4 relative">
            {shakes.map((round, index) => {
              const diceContainers = [...Array(index + 1)];
              return (
                <div className="flex gap-[16px]" key={index}>
                  {diceContainers.map((_, diceIndex) => {
                    const roundDices = round.dices.sort((a, b) => a - b);
                    const dice: number = roundDices?.[diceIndex];
                    const sameNumberComb = sameNumberIndexes?.find(
                      (sameNumberIndexObj) =>
                        sameNumberIndexObj.startIndex === diceIndex,
                    );
                    const diceDistance =
                      (sameNumberComb?.lastIndex ?? 0) -
                      (sameNumberComb?.startIndex ?? 0);
                    const combinationRangeWidth =
                      DICE_CONTAINER_WIDTH * diceDistance +
                      DICE_CONTAINERS_GAP * diceDistance;
                    return (
                      <div className="w-[60px] h-[60px] bg-gray-800 rounded-lg flex items-center justify-center relative">
                        {sameNumberComb && 6 - shakeNumber === index && (
                          <div
                            style={{
                              width: `${combinationRangeWidth}px`,
                            }}
                            className="z-3 top-[20px] -mt-[30px] h-[10px] left-[30px] absolute border border-b-0 border-white text-white text-center"
                          >
                            <div className="-mt-[22px]">
                              {sameNumberComb.points}
                            </div>
                          </div>
                        )}
                        {dice ? (
                          <Dice
                            dice={dice}
                            onClick={() => {
                              const shakeRoundDices = [...shakeRound.dices];
                              const diceIndex = shakeRoundDices.indexOf(dice);
                              shakeRoundDices.splice(diceIndex, 1);
                              const newShakes = [...shakes];
                              newShakes[shakes.length - shakeNumber].dices =
                                shakeRoundDices;
                              setShakes([...newShakes]);
                              setDices([...dices, dice]);
                            }}
                          />
                        ) : null}
                      </div>
                    );
                  })}
                  <div className="flex items-center">
                    <span className="text-white">
                      {pointsPerShake > 0 && index === 6 - shakeNumber
                        ? pointsPerShake
                        : index > 6 - shakeNumber
                          ? shakes[index].points
                          : ""}
                    </span>
                  </div>
                </div>
              );
            })}
            <button
              style={
                animationStarted
                  ? {
                      animationName: "shake",
                      animationDuration: ".3s",
                      animationIterationCount: 2,
                    }
                  : {}
              }
              onClick={() => {
                setAnimationGenereated(false);
                setAnimationStarted(true);
                setSlideAnimationEnded(false);
                // update points
                const shakesTemp = [...shakes];
                shakesTemp[shakes.length - shakeNumber].points = pointsPerShake;
                setShakes(shakesTemp);
              }}
              onAnimationEnd={shake}
              className={`absolute z-2 right-0 bottom-16 bg-[url(/src/assets/cup.png)] cursor-pointer w-[160px] h-[180px] bg-cover bg-center`}
            ></button>

            {animationGenerated &&
              dices.map((dice, index) => {
                const isDiceDisabled = !combinationsFlat.includes(dice);
                const lightAnimation =
                  "dice-background-fade 1s ease-in-out infinite";
                const diceElementAnimation = `slideDice${index} 1s ease-in-out forwards`;
                const isEven = index % 2 === 0;
                const positionStyles = slideAnimationEnded
                  ? {
                      bottom: !isEven ? "500px" : "600px",
                      right: `${(index + 1) * 70}px`,
                    }
                  : {};
                return (
                  <button
                    key={index}
                    style={{
                      animation: !slideAnimationEnded
                        ? diceElementAnimation
                        : !isDiceDisabled
                          ? lightAnimation
                          : "",
                      backgroundImage: `url(/src/assets/dice-${dice}.png)`,
                      ...positionStyles,
                    }}
                    onAnimationEnd={() => {
                      if (index === 0) {
                        setSlideAnimationEnded(true);
                      }
                    }}
                    className={clsx(
                      !isDiceDisabled
                        ? "cursor-pointer"
                        : "pointer-events-none",
                      "absolute right  z-1 w-[50px] rounded-full h-[50px] bg-cover bg-center dice-game-button",
                    )}
                    onClick={() => {
                      const currentShake = {
                        ...shakes[shakes.length - shakeNumber],
                      };
                      currentShake.dices = [...currentShake.dices, dice];
                      const newShakes = [...shakes];
                      newShakes[shakes.length - shakeNumber] = currentShake;
                      setShakes(newShakes);
                      const newDices = [...dices];
                      newDices.splice(index, 1);
                      setDices([...newDices]);
                    }}
                  />
                );
              })}
          </div>
          <div className="w-[200px] px-4 py-4 border-4 bg-linear-to-b from-violet-grad-from to-violet-grad-to"></div>
        </div>
      </div>
    </div>
  );
}
