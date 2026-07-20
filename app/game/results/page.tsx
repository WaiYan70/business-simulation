"use client";

import QuarterResults from "@/components/game/quarter-results/QuarterResults";
import GameSessionHeader from "@/components/game/shared/GameSessionHeader";
import { TOTAL_QUARTERS, useGameFlowStore } from "@/lib/stores/game-flow-store";

export default function ResultsPage() {
  const quarter = useGameFlowStore(
    (state) => state.completedQuarter ?? state.currentQuarter,
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <GameSessionHeader
        quarter={quarter}
        totalQuarters={TOTAL_QUARTERS}
        brandAsHeading={false}
      />
      <QuarterResults
        quarter={quarter}
        professorState="loading"
      />
    </div>
  );
}
