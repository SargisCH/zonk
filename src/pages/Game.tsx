import { useEffect, useState } from "react";
import Shaker from "../services/shaker";
import { useParams } from "react-router";
const defaultRounds: Array<{ dices: number[]; points: number }> = [
  ...Array(6).fill({ dices: [], points: 0 }),
];
import cupImg from "../assets/cup.png";
import clsx from "clsx";
const shaker = new Shaker();
export default function Game() {
  const [dices, setDices] = useState<number[]>([]);
  const [combinations, setCombinations] = useState({});
  const { gameId } = useParams();
  const [rounds, setRounds] = useState(defaultRounds);
  const [animationGenerated, setAnimationGenereated] = useState(false);
  const [animationStarted, setAnimationStarted] = useState(false);
  const shake = () => {
    const dicesThrown = shaker.shake();
    setAnimationStarted(false);
    setAnimationGenereated(false);
    setDices(dicesThrown);
    setCombinations(shaker.getAllCombinations());
  };
  console.log("dices", gameId, dices, combinations, rounds);
  useEffect(() => {
    const styleSheet = document.styleSheets[0]; // Get the first stylesheet (you could create a new one too)

    // Define the keyframe animation in a style block
    dices.forEach((_, index) => {
      const keyframes = `
      @keyframes slideDice${index} {
        0% {
          bottom: 40px;
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
  }, [dices]);
  return (
    <div className="h-screen bg-linear-to-b from-purple-grad-from to-purple-grad-to flex-auto  flex items-center justify-center">
      <div className="h-[800px] border-4">
        <div className="flex justify-center gap-4 h-full">
          <div className="w-[200px] px-4 pv-4 border-4 bg-linear-to-b from-violet-grad-from to-violet-grad-to"></div>
          <div className="w-[600px] px-4 border-4 py-4 flex justify-end flex-col gap-4 relative">
            {rounds.map((round, index) => {
              const diceContainers = [...Array(index + 1)];
              return (
                <div className="flex gap-4">
                  {diceContainers.map((_, diceIndex) => {
                    const dice: number = round.dices?.[diceIndex];
                    return (
                      <div className="w-[60px] h-[60px] bg-gray-800 rounded-lg">
                        {dice ?? ""}
                      </div>
                    );
                  })}
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
              onClick={() => setAnimationStarted(true)}
              onAnimationEnd={shake}
              className={`absolute z-2 right-0 bg-[url(/src/assets/cup.png)] cursor-pointer w-[160px] h-[180px] bg-cover bg-center`}
            ></button>

            {animationGenerated &&
              dices.map((dice, index) => {
                return (
                  <button
                    key={index}
                    style={{
                      backgroundImage: `url(/src/assets/dice-${dice}.png)`,
                      animationName: `slideDice${index}`,
                      animationDuration: "1s",
                      animationTimingFunction: "ease-in-out",
                      animationFillMode: "forwards",
                    }}
                    className="absolute right  z-1 cursor-pointer w-[50px] h-[50px] bg-cover bg-center"
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
