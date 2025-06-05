import BonusImg from "../assets/bonus.png";

export default function Cup({
  animationStarted,
  handleClick,
  bonusRound,
  gameStarted,
  slideAnimationEnded,
  dicesLength,
  shake,
}: {
  animationStarted: boolean;
  zonkRound: boolean;
  bonusRound: boolean;
  shake: () => void;
  slideAnimationEnded: boolean;
  dicesLength: number;
  handleClick: () => void;
  gameStarted: boolean;
}) {
  return (
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
      onClick={handleClick}
      onAnimationEnd={shake}
      className={`absolute z-2 right-0 bottom-16 bg-[url(/src/assets/cup.png)] cursor-pointer w-[160px] h-[180px] bg-cover bg-center`}
    >
      {bonusRound && gameStarted && slideAnimationEnded && dicesLength ? (
        <div className="absolute top-[-100px] left-[-65px]">
          <img src={BonusImg} />
        </div>
      ) : null}
    </button>
  );
}
