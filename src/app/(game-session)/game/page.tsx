"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Costs from "@/features/game-session/components/dashboard/Costs";
import Decisions from "@/features/game-session/components/dashboard/Decisions";
import Events from "@/features/game-session/components/dashboard/Events";
import IncomeStatement from "@/features/game-session/components/dashboard/IncomeStatement";
import States from "@/features/game-session/components/dashboard/States";
import Summary from "@/features/game-session/components/dashboard/Summary";
import {
  getCurrentBusinessState,
  getLatestQuarterRecord,
  getScenario,
  TOTAL_QUARTERS,
} from "@/simulation/GameSession";
import GameSessionHeader from "@/features/game-session/components/shared/GameSessionHeader";
import GameSessionLoading from "@/features/game-session/components/shared/GameSessionLoading";
import { useGameSessionStore } from "@/features/game-session/stores/game-session-store";

export default function Dashboard() {
  const router = useRouter();
  const session = useGameSessionStore((state) => state.session);
  const hydrated = useGameSessionStore((state) => state.hydrated);

  const completed = session?.status === "completed";

  useEffect(() => {
    if (hydrated && completed) {
      router.replace("/game/results/final");
    }
  }, [completed, hydrated, router]);

  if (!hydrated || !session) {
    return <GameSessionLoading label="Opening saved game" />;
  }

  if (completed) {
    return <GameSessionLoading label="Opening final report" />;
  }

  const scenario = getScenario(session.currentQuarter);
  const state = getCurrentBusinessState(session);
  const previousRecord = getLatestQuarterRecord(session);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <GameSessionHeader
        quarter={session.currentQuarter}
        season={scenario.season}
        totalQuarters={TOTAL_QUARTERS}
        availableResultQuarters={session.records.map(
          (record) => record.quarter,
        )}
      />

      <main className="mx-auto grid w-full max-w-[1600px] gap-5 px-6 py-5 xl:grid-cols-[360px_minmax(0,1fr)_420px]">
        <div className="flex flex-col gap-5">
          <States state={state} previousRecord={previousRecord} />
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
