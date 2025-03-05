type Props = { dice: number; onClick: () => void };

export default function Dice({ dice, onClick }: Props) {
  // Dice faces object with numbers as keys and dot positions as values
  const diceFaces: { [key: number]: Array<{ col: number; row: number }> } = {
    1: [{ col: 2, row: 2 }],
    2: [
      { col: 1, row: 1 },
      { col: 3, row: 3 },
    ],
    3: [
      { col: 1, row: 1 },
      { col: 3, row: 3 },
      { col: 2, row: 2 },
    ],
    4: [
      { col: 1, row: 1 },
      { col: 3, row: 1 },
      { col: 1, row: 3 },
      { col: 3, row: 3 },
    ],
    5: [
      { col: 1, row: 1 },
      { col: 3, row: 1 },
      { col: 2, row: 2 },
      { col: 1, row: 3 },
      { col: 3, row: 3 },
    ],
    6: [
      { col: 1, row: 1 },
      { col: 3, row: 1 },
      { col: 1, row: 2 },
      { col: 3, row: 2 },
      { col: 1, row: 3 },
      { col: 3, row: 3 },
    ],
  };

  const renderDiceFace = (dots: Array<{ col: number; row: number }>) => {
    return dots.map((position, index) => (
      <div
        key={index}
        className="w-2 h-2 bg-black rounded-full"
        style={{ gridColumn: position.col, gridRow: position.row }}
      ></div>
    ));
  };
  return (
    <div
      onClick={onClick}
      className="grid grid-cols-3 grid-rows-3 gap-1 w-[85%] h-[85%] bg-gray-300 border-2 border-gray-800 rounded-lg p-2"
    >
      {renderDiceFace(diceFaces[dice])}
    </div>
  );
}
