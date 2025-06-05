import clsx from "clsx";
import Dice1 from "../assets/dice-1.png";
import Dice2 from "../assets/dice-2.png";
import Dice3 from "../assets/dice-3.png";
import Dice4 from "../assets/dice-4.png";
import Dice5 from "../assets/dice-5.png";
import Dice6 from "../assets/dice-6.png";

const diceImages = [null, Dice1, Dice2, Dice3, Dice4, Dice5, Dice6];
export default function Dice({
  index,
  combinations,
  dice,
  slideAnimationEnded,
  removed,
  onClick,
  setSlideAnimationEnded,
}: {
  index: number;
  combinations: number[];
  dice: number;
  slideAnimationEnded: boolean;
  removed: boolean;
  onClick: (index: number, dice: number) => void;
  setSlideAnimationEnded: (isEnded: boolean) => void;
}) {
  const isDiceDisabled = !combinations?.includes(dice);
  const lightAnimation = "dice-background-fade 1s ease-in-out infinite";
  const diceElementAnimation = `slideDice${index} 1s ease-in-out forwards`;
  const isEven = index % 2 === 0;
  const positionStyles = slideAnimationEnded
    ? {
        bottom: !isEven ? "500px" : "600px",
        right: `${(index + 1) * 70}px`,
      }
    : {};
  if (removed) return null;
  return (
    <button
      key={index}
      style={{
        animation: !slideAnimationEnded
          ? diceElementAnimation
          : !isDiceDisabled
            ? lightAnimation
            : "",
        backgroundImage: `url(${diceImages[dice]})`,
        ...positionStyles,
      }}
      onAnimationEnd={() => {
        if (index === 0) {
          setSlideAnimationEnded(true);
        }
      }}
      className={clsx(
        !isDiceDisabled ? "cursor-pointer" : "pointer-events-none",
        "absolute right  z-1 w-[50px] rounded-full h-[50px] bg-cover bg-center dice-game-button",
      )}
      onClick={() => onClick(index, dice)}
    />
  );
}
