import { useEffect, useMemo, useState } from "react";
import Shaker from "../services/shaker";
import RoundController from "../controllers/RoundController";
import { GameState, useGameStore } from "../store/game";
import Rounds from "../components/Rounds";
import { generateSlideKeyFrame } from "../helpers/generateKeyFrame";
import { AllCombinations, IDice } from "../types";
import { useIsBonusRound } from "../hooks/useIsBonusRound";
import { useIsZonkRound } from "../hooks/useIsZonkRound";
import { useFlatCombinations } from "../hooks/useFlatCombinations";
import { defaultShakes } from "../helpers/constants";
import { useSameNumberCombinationIndexes } from "../hooks/useSameNumberCombinationIndexes";
import { usePointsPerShake } from "../hooks/usePointsPerShake";
import DiceContainer from "../components/DiceContainer";
import Cup from "../components/Cup";
import Dice from "../components/Dice";
import Zonk from "../components/Zonk";
import GameResult from "../components/GameResult";
import RuleSidebar from "../components/RuleSidebar";

const shaker = new Shaker();
const roundController = new RoundController();
roundController.init();
const rounds = roundController.getRounds();

export default function Game() {
  const [gameStarted, setGameStarted] = useState(false);
  const [dices, setDices] = useState<IDice[]>([]);
  const [dicesCountForThrow, setDicesCountForThrow] = useState<number>();
  const [combinations, setCombinations] = useState<AllCombinations>(
    {} as AllCombinations,
  );
  const [shakes, setShakes] = useState(defaultShakes);
  const [animationGenerated, setAnimationGenereated] = useState(false);
  const [animationStarted, setAnimationStarted] = useState(false);
  const [shakeNumber, setShakeNumber] = useState(0);
  const [slideAnimationEnded, setSlideAnimationEnded] = useState(false);
  const [isGameFinished, setIsGameFinished] = useState(false);

  const { setCurrentRoundPoints, currentRoundPoints, resetRecordedPoints } =
    useGameStore((state: GameState) => state);

  const saveRecordedPoints = useGameStore((state) => state.saveRecordedPoints);
  const bonusRound = useIsBonusRound(dices);

  useEffect(() => {
    if (bonusRound) {
      setDicesCountForThrow(0);
    }
  }, [bonusRound, setDicesCountForThrow]);

  useEffect(() => {
    const styleSheet = document.styleSheets[0]; // Get the first stylesheet (you could create a new one too)
    // Define the keyframe animation in a style block
    [...Array(dicesCountForThrow)].forEach((_, index) => {
      const keyframes = generateSlideKeyFrame(index);
      // Add the keyframes to the stylesheet
      styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
    });
    setAnimationGenereated(true);

    // Cleanup function to remove keyframes when the component unmounts
    return () => {
      const sheet = document.styleSheets[0];
      const ruleIndex = sheet.cssRules.length - 1;

      if (ruleIndex >= 0) {
        sheet.deleteRule(ruleIndex);
      }
    };
  }, [dicesCountForThrow]);

  const combinationsFlat = useFlatCombinations(combinations || []);
  const currentShakeDices = useMemo(
    () =>
      (shakes[shakes.length - shakeNumber]?.dices ?? []).sort((a, b) => a - b),
    [shakeNumber, shakes],
  );

  const points = useMemo(() => {
    return shaker.getPoints(currentShakeDices);
  }, [currentShakeDices]);

  const sameNumberIndexes = useSameNumberCombinationIndexes(
    currentShakeDices,
    points,
  );
  const pointsPerShake = usePointsPerShake(points);

  useEffect(() => {
    if (!animationStarted) {
      const currentRoundPoints =
        shakes.reduce((acc, shake) => shake.points + acc, 0) + pointsPerShake;
      setCurrentRoundPoints(currentRoundPoints);
    }
  }, [pointsPerShake, setCurrentRoundPoints, shakes, animationStarted]);

  const zonkRound = useIsZonkRound(
    dices.length,
    combinationsFlat,
    animationStarted,
    slideAnimationEnded,
    gameStarted,
  );
  const lastRound =
    roundController.getCurentRound() + 1 === RoundController.roundsMax;

  useEffect(() => {
    if (zonkRound) {
      setShakeNumber(0);
      setDicesCountForThrow(0);
      resetRecordedPoints();
      setCurrentRoundPoints(0);
      if (lastRound) {
        setIsGameFinished(true);
      }
    }
  }, [
    zonkRound,
    resetRecordedPoints,
    setShakeNumber,
    setCurrentRoundPoints,
    lastRound,
  ]);

  const isWin = isGameFinished && roundController.isWin();
  const minPointsForRound = roundController.getMinPointsForRound();
  const notEnoughPoints = (currentRoundPoints ?? 0) < minPointsForRound;

  const shake = () => {
    // substracting from all dice count (6) the already thrown dices count (last rounds count)
    const alreadyThrownDiceCount =
      bonusRound || shakeNumber === 0
        ? 0
        : shakes.reduce((acc, prev) => acc + prev.dices.length, 0);
    if (shakeNumber === 0) {
      roundController.startNewRound();
    }
    const dicesLeft = Shaker.diceThrowCount - alreadyThrownDiceCount;
    const dicesThrown = shaker.shake(dicesLeft);
    setAnimationStarted(false);
    setAnimationGenereated(false);
    setDices(dicesThrown.map((dice) => ({ dice, removed: false })));
    setCombinations(shaker.getAllCombinations());
    setShakeNumber(bonusRound ? 1 : shakeNumber + 1);
    setDicesCountForThrow(dicesLeft);
  };

  const resetRound = () => {
    setShakeNumber(0);
    setShakes(defaultShakes);
    setDices([]);
    setDicesCountForThrow(0);
  };

  const finishRound = (roundPoints: number) => {
    roundController.finishRound(roundPoints);
    if (roundController.isGameFinished()) {
      setIsGameFinished(true);
    }
  };
  const handleCupClick = () => {
    if (zonkRound) {
      resetRound();
      roundController.zonkRound();
    } else if (bonusRound) {
      saveRecordedPoints();
      setShakes([...defaultShakes]);
      setCurrentRoundPoints(0);
    } else {
      // update points
      const shakesTemp = [...shakes];
      shakesTemp[shakes.length - shakeNumber].points = pointsPerShake;
      setShakes(shakesTemp);
    }
    setAnimationGenereated(false);
    setAnimationStarted(true);
    setSlideAnimationEnded(false);
    setGameStarted(true);
  };

  const onDiceClick = (diceIndex: number, dice: number) => {
    const currentShake = {
      ...shakes[shakes.length - shakeNumber],
    };
    currentShake.dices = [...currentShake.dices, dice];
    const newShakes = [...shakes];
    newShakes[shakes.length - shakeNumber] = currentShake;
    setShakes(newShakes);
    const newDices = [...dices];
    newDices[diceIndex].removed = true;
    setDices([...newDices]);
  };

  return (
    <div className="h-screen bg-linear-to-b from-purple-grad-from to-purple-grad-to flex-auto  flex items-center justify-center">
      <div className="h-[800px] border-4">
        <div className="flex justify-center gap-4 h-full">
          <div className="w-[200px] px-4 pv-4 border-4 bg-linear-to-b from-violet-grad-from to-violet-grad-to">
            <Rounds
              finishRound={finishRound}
              notEnoughPoints={notEnoughPoints}
              rounds={rounds}
              currentRound={roundController.getCurentRound()}
              handleSavePoints={resetRound}
              allPoints={roundController.getAllPoints()}
            />
          </div>
          <div className="w-[600px] px-4 border-4 py-4 flex justify-end flex-col gap-4 relative">
            {shakes.map((round, index) => {
              const diceContainers = [...Array(index + 1)];
              return (
                <div className="flex gap-[16px]" key={index}>
                  {diceContainers.map((_, diceIndex) => {
                    const roundDices = round.dices.sort((a, b) => a - b);
                    return (
                      <DiceContainer
                        key={diceIndex}
                        sameNumberIndexes={sameNumberIndexes}
                        dices={dices}
                        roundDices={roundDices}
                        diceIndex={diceIndex}
                        shakeIndex={index}
                        shakeNumber={shakeNumber}
                        shakes={shakes}
                        setDices={setDices}
                        setShakes={setShakes}
                      />
                    );
                  })}
                  {/*round points*/}
                  <div className="flex items-center">
                    <span className="text-white">
                      {pointsPerShake > 0 &&
                      index === Shaker.diceThrowCount - shakeNumber
                        ? pointsPerShake
                        : index > 6 - shakeNumber
                          ? shakes[index].points
                          : ""}
                    </span>
                  </div>
                </div>
              );
            })}
            <Cup
              dicesLength={dices.length}
              slideAnimationEnded={slideAnimationEnded}
              bonusRound={bonusRound}
              handleClick={handleCupClick}
              zonkRound={zonkRound}
              animationStarted={animationStarted}
              gameStarted={gameStarted}
              shake={shake}
            />
            {animationGenerated &&
              dices.map(({ dice, removed }, index) => {
                return (
                  <Dice
                    key={index}
                    index={index}
                    setSlideAnimationEnded={(isEnded: boolean) =>
                      setSlideAnimationEnded(isEnded)
                    }
                    dice={dice}
                    slideAnimationEnded={slideAnimationEnded}
                    combinations={combinationsFlat || []}
                    removed={removed}
                    onClick={onDiceClick}
                  />
                );
              })}
            {zonkRound && !lastRound && <Zonk />}
            {isGameFinished ? <GameResult isWin={isWin} /> : null}
          </div>
          <RuleSidebar />
        </div>
      </div>
    </div>
  );
}
