export default class Shaker {
  dices: Array<number> = [];
  rand(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
  }
  shake(count = 6) {
    const dices = [];
    for (let i = 0; i < count; i++) {
      dices.push(this.rand(1, 7));
    }
    this.dices = dices;
    return dices;
  }
  getStraight() {
    const dicesSorted = this.dices.sort((a, b) => a - b);
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
  getThreePairs() {
    const pairsMap: { [key: number]: number } = {};
    for (const dice of this.dices) {
      pairsMap[dice] = pairsMap[dice] ? pairsMap[dice] + 1 : 1;
    }
    if (Object.values(pairsMap).every((dice) => dice === 2)) {
      const result: number[] = [];
      Object.keys(pairsMap).forEach((key) => {
        result.push(Number(key));
        result.push(Number(key));
      });
      return result;
    } else {
      return [];
    }
  }
  getSameNumbers() {
    const sameNumbersMap: { [key: number]: number } = {};
    for (const dice of this.dices) {
      sameNumbersMap[dice] = sameNumbersMap[dice]
        ? sameNumbersMap[dice] + 1
        : 1;
    }
    const result: Array<Array<number>> = [];
    Object.entries(sameNumbersMap).forEach(([key, value]) => {
      if (value >= 3) {
        result.push([...Array(value).fill(Number(key))]);
      }
    });
    return result;
  }
  getSingleNumber() {
    const result: number[] = [];
    this.dices.forEach((dice) => {
      if (dice === 1 || dice === 5) {
        result.push(dice);
      }
    });
    return result;
  }
  getAllCombinations() {
    return {
      street: this.getStraight(),
      threePairs: this.getThreePairs(),
      sameNumbers: this.getSameNumbers(),
      singleNumbers: this.getSingleNumber(),
    };
  }
}
