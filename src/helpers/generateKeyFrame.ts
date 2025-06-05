export const generateSlideKeyFrame = (diceIndex: number) => {
  return `
      @keyframes slideDice${diceIndex} {
        0% {
          bottom: 90px;
          right: 30px;
        }
        100% {
          bottom: ${diceIndex % 2 === 0 ? "600px" : "500px"};
          right: ${(diceIndex + 1) * 70}px;
        }
      }
    `;
};
