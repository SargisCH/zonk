import Button from "./Button";
import { useGameStore } from "../store/game";
import RoundController from "../controllers/RoundController";
const roundController = new RoundController();
export default function Rounds() {
  const { currentRoundPoints } = useGameStore((state) => state);
  const minPointsForRound = roundController.getMinPointsForRound();
  const notEnoughPoints = (currentRoundPoints ?? 0) < minPointsForRound;
  const rounds = roundController.getRounds();
  console.log("rounds", rounds);
  return (
    <div className="py-6 px-2">
      {rounds.map((round, index) => {
        return (
          <div className="rounded-4 bg-grey-200 py-2 px-2 flex justify-between">
            <span className="text-white">{index + 1}</span>
            <span className="text-white">
              {round.inProgress ? currentRoundPoints : round.points}
            </span>
          </div>
        );
      })}
      <Button disabled={notEnoughPoints}>Save</Button>
    </div>
  );
}
