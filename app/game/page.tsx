"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Costs from "@/components/game/dashboard/Costs";
import Decisions from "@/components/game/dashboard/Decisions";
import Events from "@/components/game/dashboard/Events";
import IncomeStatement from "@/components/game/dashboard/IncomeStatement";
import Stats from "@/components/game/dashboard/States";
import Summary from "@/components/game/dashboard/Summary";
import GameSessionHeader from "@/components/game/shared/GameSessionHeader";
import { useGameSessionStore } from "@/lib/stores/game-session-store";
import {
  getCurrentBusinessState,
  getLatestQuarterRecord,
  getScenario,
  TOTAL_QUARTERS,
} from "@/components/game/session/GameSession";
import GameSessionLoading from "@/components/game/shared/GameSessionLoading";

export default function Dashboard() {
  const router = useRouter();
  const session = useGameSessionStore((state) => state.session);
  const hydrated = useGameSessionStore((state) => state.hydrated);

  useEffect(() => {
    if (hydrated && session?.status === "completed") {
      router.replace("/game/results/final");
    }
  }, [hydrated, router, session?.status]);

  if (!hydrated || !session || session.status === "completed") {
    return <GameSessionLoading label="Opening saved game" />;
  }

  const scenario = getScenario(session.currentQuarter);
  const state = getCurrentBusinessState(session);
  const previousRecord = getLatestQuarterRecord(session);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <GameSessionHeader
        quarter={session.currentQuarter}
        totalQuarters={TOTAL_QUARTERS}
      />
      <main className="mx-auto grid w-full max-w-[1600px] gap-5 px-6 py-5 xl:grid-cols-[360px_minmax(0,1fr)_420px]">
        <div className="flex flex-col gap-5">
          <Stats state={state} previousRecord={previousRecord} />
          <Costs />
          <IncomeStatement record={previousRecord} />
        </div>
        <div className="flex min-w-0 flex-col gap-5">
          <Events scenario={scenario} />
          <Summary record={previousRecord} />
        </div>
        <Decisions />
      </main>
    </div>
  );
}
