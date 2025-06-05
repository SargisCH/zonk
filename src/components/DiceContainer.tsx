import { IDice, IShake } from "../types";
import DiceSelected from "./DiceSelected";

const DICE_CONTAINER_WIDTH = 60;
const DICE_CONTAINERS_GAP = 16;
export default function DiceContainer({
  sameNumberIndexes,
  dices,
  roundDices,
  diceIndex,
  shakeIndex,
  shakeNumber,
  setShakes,
  setDices,
  shakes,
}: {
  diceIndex: number;
  dices: IDice[];
  roundDices: number[];
  sameNumberIndexes: Array<{
    dice: number;
    startIndex: number;
    lastIndex: number;
    points: number;
  }>;
  shakeIndex: number;
  shakeNumber: number;
  shakes: IShake[];
  setShakes: (shakes: IShake[]) => void;
  setDices: (dices: IDice[]) => void;
}) {
  const dice: number = roundDices?.[diceIndex];
  const sameNumberComb = sameNumberIndexes?.find(
    (sameNumberIndexObj) => sameNumberIndexObj.startIndex === diceIndex,
  );
  const diceDistance =
    (sameNumberComb?.lastIndex ?? 0) - (sameNumberComb?.startIndex ?? 0);
  const combinationRangeWidth =
    DICE_CONTAINER_WIDTH * diceDistance + DICE_CONTAINERS_GAP * diceDistance;
  const shakeRound = shakes[shakes.length - shakeNumber];
  return (
    <div className="w-[60px] h-[60px] bg-gray-800 rounded-lg flex items-center justify-center relative">
      {sameNumberComb && 6 - shakeNumber === shakeIndex && (
        <div
          style={{
            width: `${combinationRangeWidth}px`,
          }}
          className="z-3 top-[20px] -mt-[30px] h-[10px] left-[30px] absolute border border-b-0 border-white text-white text-center"
        >
          <div className="-mt-[22px]">{sameNumberComb.points}</div>
        </div>
      )}
      {dice ? (
        <DiceSelected
          dice={dice}
          onClick={() => {
            const shakeRoundDices = [...shakeRound.dices];
            const diceIndex = shakeRoundDices.indexOf(dice);
            shakeRoundDices.splice(diceIndex, 1);
            const newShakes = [...shakes];
            newShakes[shakes.length - shakeNumber].dices = shakeRoundDices;
            setShakes([...newShakes]);
            const diceFound = dices.find(
              (diceObject) => diceObject.dice === dice && diceObject.removed,
            );
            if (diceFound) {
              diceFound.removed = false;
              setDices([...dices]);
            }
          }}
        />
      ) : null}
    </div>
  );
}
