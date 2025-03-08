import { create } from "zustand";

export interface GameState {
  currentRoundPoints: number;
  setCurrentRoundPoints: (points: number) => void;
}
export const useGameStore = create<GameState>((set) => ({
  currentRoundPoints: 0,
  setCurrentRoundPoints: (points: number) =>
    set(() => ({ currentRoundPoints: points })),
}));
