"use client";

import Costs from "@/components/game/dashboard/Costs";
import Decisions from "@/components/game/dashboard/Decisions";
import Events from "@/components/game/dashboard/Events";
import IncomeStatement from "@/components/game/dashboard/IncomeStatement";
import Stats from "@/components/game/dashboard/States";
import Summary from "@/components/game/dashboard/Summary";
import GameSessionHeader from "@/components/game/shared/GameSessionHeader";
import { TOTAL_QUARTERS, useGameFlowStore } from "@/lib/stores/game-flow-store";

export default function Dashboard() {
  const quarter = useGameFlowStore((state) => state.currentQuarter);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <GameSessionHeader quarter={quarter} totalQuarters={TOTAL_QUARTERS} />
      <main className="mx-auto grid w-full max-w-[1600px] gap-5 px-6 py-5 xl:grid-cols-[360px_minmax(0,1fr)_420px]">
        <div className="flex flex-col gap-5">
          <Stats />
          <Costs />
          <IncomeStatement />
        </div>
        <div className="flex min-w-0 flex-col gap-5">
          <Events />
          <Summary />
        </div>
        <Decisions quarter={quarter} />
      </main>
    </div>
  );
}
