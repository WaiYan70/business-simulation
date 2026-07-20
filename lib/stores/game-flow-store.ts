import { create } from "zustand";

export const TOTAL_QUARTERS = 8;

type GameFlowState = {
  currentQuarter: number;
  completedQuarter: number | null;
  completeCurrentQuarter: () => void;
  continueToNextQuarter: () => void;
  resetGame: () => void;
};

const initialState = {
  currentQuarter: 1,
  completedQuarter: null,
};

/**
 * Client-side page-flow state only. Authoritative game numbers and turn
 * processing belong to the simulation and application layers.
 */
export const useGameFlowStore = create<GameFlowState>((set) => ({
  ...initialState,
  completeCurrentQuarter: () =>
    set(({ currentQuarter }) => ({ completedQuarter: currentQuarter })),
  continueToNextQuarter: () =>
    set(({ completedQuarter, currentQuarter }) => ({
      currentQuarter:
        completedQuarter === currentQuarter
          ? Math.min(currentQuarter + 1, TOTAL_QUARTERS)
          : currentQuarter,
      completedQuarter: null,
    })),
  resetGame: () => set(initialState),
}));
