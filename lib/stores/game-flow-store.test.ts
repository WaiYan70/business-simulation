import { beforeEach, describe, expect, it } from "vitest";

import { TOTAL_QUARTERS, useGameFlowStore } from "./game-flow-store";

describe("game flow store", () => {
  beforeEach(() => useGameFlowStore.getState().resetGame());

  it("advances only after the current quarter is completed", () => {
    useGameFlowStore.getState().continueToNextQuarter();
    expect(useGameFlowStore.getState().currentQuarter).toBe(1);

    useGameFlowStore.getState().completeCurrentQuarter();
    useGameFlowStore.getState().continueToNextQuarter();
    expect(useGameFlowStore.getState().currentQuarter).toBe(2);
  });

  it("never advances beyond the final quarter", () => {
    for (let quarter = 1; quarter <= TOTAL_QUARTERS; quarter += 1) {
      useGameFlowStore.getState().completeCurrentQuarter();
      useGameFlowStore.getState().continueToNextQuarter();
    }

    expect(useGameFlowStore.getState().currentQuarter).toBe(TOTAL_QUARTERS);
  });
});
