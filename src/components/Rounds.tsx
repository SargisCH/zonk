import Button from "./Button";
import { useGameStore } from "../store/game";
import { useEffect, useState } from "react";
const DISTANCE_BETWEEN_ROUNDS = 14;
const TAILWIND_SPACING = "0.25rem";
export default function Rounds({
  handleSavePoints,
  rounds,
  notEnoughPoints,
  finishRound,
  currentRound,
}: {
  handleSavePoints: () => void;
  rounds: Array<{ inProgress: boolean; points: number }>;
  notEnoughPoints: boolean;
  finishRound: (roundPoints: number) => void;
  currentRound: number;
}) {
  const { currentRoundPoints, recordedPoints, resetRecordedPoints } =
    useGameStore((state) => state);
  const [roundBorderTopPosition, setRoundBorderTopPosition] = useState(0);
  useEffect(() => {
    if (currentRound > -1) {
      setRoundBorderTopPosition(currentRound * DISTANCE_BETWEEN_ROUNDS);
    }
  }, [currentRound, setRoundBorderTopPosition]);
  return (
    <div className="py-6 px-2 relative h-full">
      <div className="flex direction-column gap-4 flex-col relative">
        <div
          style={{
            top: `calc(${TAILWIND_SPACING} * ${roundBorderTopPosition})`,
          }}
          className="transition-[top] duration-500 absolute top-0 rounded bg-transparent py-5 px-5 border-2 border-solid border-pink-500 w-full"
        ></div>
        {rounds.map((round, index) => {
          return (
            <div className="rounded bg-purple-800 py-2 px-2 flex justify-between ">
              <span className="text-white">{index + 1}</span>
              <span className="text-white">
                {round.inProgress
                  ? recordedPoints + currentRoundPoints
                  : round.points}
              </span>
            </div>
          );
        })}
      </div>
      <div className="absolute flex justify-center w-full py-4 bottom-0">
        <Button
          disabled={notEnoughPoints}
          onClick={() => {
            if (notEnoughPoints) return;
            finishRound(recordedPoints + currentRoundPoints);
            resetRecordedPoints();
            handleSavePoints();
          }}
        >
          Save
        </Button>
      </div>
    </div>
  );
}
