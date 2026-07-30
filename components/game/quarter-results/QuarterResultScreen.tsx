"use client"

import { useRouter } from "next/navigation";
import {
  getQuarterRecord,
  parseQuarter,
  ProfessorState,
} from "../session/GameSession";
import { useGameSessionStore } from "@/lib/stores/game-session-store";
import { TOTAL_QUARTERS } from "@/lib/stores/game-flow-store";
import { useEffect } from "react";
import GameSessionHeader from "../shared/GameSessionHeader";
import QuarterResults from "./QuarterResults";
import GameSessionLoading from "../shared/GameSessionLoading";

type QuarterResultScreenProps = {
  requestedQuarter?: string;
  professorState: ProfessorState;
};

export default function QuarterResultScreen({
  requestedQuarter,
  professorState,
}: QuarterResultScreenProps) {
  const router = useRouter();
  const session = useGameSessionStore((state) => state.session);
  const hydrated = useGameSessionStore((state) => state.hydrated);
  const quarter = parseQuarter(requestedQuarter);
  const record =
    session && quarter ? getQuarterRecord(session, quarter) : undefined;

  let redirectTo: string | null = null;

  if (hydrated && session) {
    if (quarter === TOTAL_QUARTERS) {
      redirectTo =
        session.status === "completed" ? "/game/results/final" : "/game";
    } else if (!quarter || !record) {
      redirectTo =
        session.status === "completed" ? "/game/results/final" : "/game";
    }
  }

  useEffect(() => {
    if (redirectTo) router.replace(redirectTo);
  }, [redirectTo, router]);

  if (!hydrated || !session || redirectTo || !record) {
    return <GameSessionLoading label="Opening quarter ledger" />;
  }

  const gameCompleted = session.status === "completed";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <GameSessionHeader
        quarter={session.currentQuarter}
        viewingQuarter={record.quarter}
        totalQuarters={TOTAL_QUARTERS}
        brandAsHeading={false}
        completed={gameCompleted}
        availableResultQuarters={session.records.map(
          (committed) => committed.quarter,
        )}
      />
      <QuarterResults
        record={record}
        professorState={professorState}
        continueHref={gameCompleted ? "/game/results/final" : "/game"}
        continueLabel={
          gameCompleted
            ? "View final report"
            : `Plan Quarter ${session.currentQuarter}`
        }
      />
    </div>
  );
}
