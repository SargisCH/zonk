export interface IDice {
  dice: number;
  removed: boolean;
}

export interface IShake {
  dices: number[];
  points: number;
}

export type SameNumberCombination = Array<Array<number>>;
export type SingleNumberCombination = Array<number>;
export type ThreePairsCombination = Array<number>;
export type StraightCombination = Array<number>;

export type SameNumberPoints = Array<{
  dices: Array<number>;
  points: number;
}>;

export type SingleNumberPoints = Array<{
  dices: number;
  points: number;
}>;
export type ThreePairsPoints = Array<{
  dices: ThreePairsCombination;
  points: number;
}>;

export type StraightPoints = Array<{
  dices: StraightCombination;
  points: number;
}>;

export type AllCombinations = {
  straight: StraightCombination;
  threePairs: ThreePairsCombination;
  sameNumbers: SameNumberCombination;
  singleNumbers: SingleNumberCombination;
};
