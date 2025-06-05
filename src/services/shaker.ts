import {
  AllCombinations,
  Points,
  SameNumberCombination,
  SameNumberPoints,
  SingleNumberCombination,
  SingleNumberPoints,
  StraightCombination,
  StraightPoints,
  ThreePairsCombination,
  ThreePairsPoints,
} from "../types";

export default class Shaker {
  static diceThrowCount = 6;
  private points = {
    straight: 1500,
    sameNumbers: (numbers: number[]) => {
      const isCorrect =
        numbers.length >= 3 && numbers.every((num) => num === numbers[0]);
      if (!isCorrect) {
        throw new Error(
          `The combination ${numbers.join(",")} is not correct. Please provide correct combinatin`,
        );
      }
      // get the  points for the first three number and then iterate whats left and add 100 * num for each number
      let points = numbers[0] * (numbers[0] === 1 ? 1000 : 100);
      numbers.slice(3).forEach((num) => {
        points += num * (num === 1 ? 1000 : 100);
      });
      return points;
    },
    threePairs: 750,
    singleNumbers: {
      1: 100,
      5: 50,
    },
  };
  dices: Array<number> = [];
  rand(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
  }
  shake(count = Shaker.diceThrowCount) {
    const dices = [];
    for (let i = 0; i < count; i++) {
      dices.push(this.rand(1, 7));
    }
    this.dices = dices;
    return dices;
  }
  getStraight(dices = this.dices): StraightCombination {
    if (dices.length < Shaker.diceThrowCount) return [];
    const dicesSorted = dices.sort((a, b) => a - b);
    const dups: { [key: number]: number } = {};
    for (const dice of dicesSorted) {
      if (dups[dice]) {
        return [];
      } else {
        dups[dice] = dice;
      }
    }
    return dicesSorted;
  }
  getThreePairs(dices = this.dices): ThreePairsCombination {
    if (dices.length !== Shaker.diceThrowCount) return [];
    const pairsMap: { [key: number]: number } = {};
    for (const dice of dices) {
      pairsMap[dice] = pairsMap[dice] ? pairsMap[dice] + 1 : 1;
    }
    if (Object.values(pairsMap).every((dice) => dice === 2)) {
      const result: ThreePairsCombination = [];
      Object.keys(pairsMap).forEach((key) => {
        result.push(Number(key));
        result.push(Number(key));
      });
      return result;
    } else {
      return [];
    }
  }
  getSameNumbers(dices = this.dices): SameNumberCombination {
    const sameNumbersMap: { [key: number]: number } = {};
    for (const dice of dices) {
      sameNumbersMap[dice] = sameNumbersMap[dice]
        ? sameNumbersMap[dice] + 1
        : 1;
    }
    const result: SameNumberCombination = [];
    Object.entries(sameNumbersMap).forEach(([key, value]) => {
      if (value >= 3) {
        result.push([...Array(value).fill(Number(key))]);
      }
    });
    return result;
  }
  getSingleNumber(dices = this.dices): SingleNumberCombination {
    const result: SingleNumberCombination = [];
    dices.forEach((dice) => {
      if (dice === 1 || dice === 5) {
        result.push(dice);
      }
    });
    return result;
  }
  getAllCombinations(dices = this.dices): AllCombinations {
    let singleNumbers = this.getSingleNumber(dices);
    const sameNumbers = this.getSameNumbers(dices);
    singleNumbers = singleNumbers.filter((num) =>
      sameNumbers.length
        ? sameNumbers.some((sameNumbersItem) => !sameNumbersItem.includes(num))
        : true,
    );

    return {
      straight: this.getStraight(dices),
      threePairs: this.getThreePairs(dices),
      sameNumbers,
      singleNumbers,
    };
  }
  getPoints(selectedDices: number[]): {
    sameNumbers?: SameNumberPoints;
    singleNumbers?: SingleNumberPoints;
    threePairs?: ThreePairsPoints;
    straight?: StraightPoints;
  } {
    const combs = this.getAllCombinations(selectedDices);
    const sameNumbersPoints = combs.sameNumbers.length
      ? [
          ...combs.sameNumbers.map((sameNumbersItem) => ({
            dices: sameNumbersItem,
            points: this.points.sameNumbers(sameNumbersItem),
          })),
        ]
      : [];
    const singlePoints = [
      ...combs.singleNumbers.map((singleNumber) => ({
        dices: singleNumber,
        points: this.points.singleNumbers[singleNumber],
      })),
    ];
    const threePairs = combs.threePairs.length
      ? [
          {
            dices: combs.threePairs,
            points: this.points.threePairs,
          },
        ]
      : [];
    const straight = combs.straight.length
      ? [
          {
            dices: combs.straight,
            points: this.points.straight,
          },
        ]
      : [];
    if (straight.length) return { straight: straight };
    if (threePairs.length) return { threePairs: threePairs };
    return { sameNumbers: sameNumbersPoints, singleNumbers: singlePoints };
  }
}
