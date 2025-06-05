export default function GameResult({ isWin }: { isWin: boolean }) {
  if (isWin) {
    return (
      <div className="absolute top-[35%] left-[20%] text-green-700 text-9xl select-none">
        WIN!
      </div>
    );
  }
  return (
    <div className="absolute top-[35%] left-[20%] text-red-700 text-9xl select-none">
      LOSE!
    </div>
  );
}
