import { IShake } from "../types";

export const defaultShakes: Array<IShake> = [
  ...Array(6).fill({ dices: [], combinations: [], points: 0 }),
];
