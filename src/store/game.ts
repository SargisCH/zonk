import { create } from "zustand";

export interface GameState {
  currentRoundPoints: number;
  recordedPoints: number;
  setCurrentRoundPoints: (points: number) => void;
  saveRecordedPoints: () => void;
  resetRecordedPoints: () => void;
}
export const useGameStore = create<GameState>((set) => ({
  currentRoundPoints: 0,
  recordedPoints: 0,
  saveRecordedPoints: () =>
    set((state) => ({
      recordedPoints: state.recordedPoints + state.currentRoundPoints,
    })),
  resetRecordedPoints: () => set(() => ({ recordedPoints: 0 })),
  setCurrentRoundPoints: (points: number) =>
    set(() => ({ currentRoundPoints: points })),
}));
