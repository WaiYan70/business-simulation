"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import GameSessionLoading from "@/app/game/loading";
import { useGameSessionStore } from "@/lib/stores/game-session-store";
import { ProfessorState, TOTAL_QUARTERS } from "../session/GameSession";
import GameSessionHeader from "../shared/GameSessionHeader";
import FinalResults from "./FinalResults";

export default function FinalResultScreen({
  professorState,
}: {
  professorState: ProfessorState;
}) {
  const router = useRouter();
  const session = useGameSessionStore((state) => state.session);
  const hydrated = useGameSessionStore((state) => state.hydrated);
  const resetGame = useGameSessionStore((state) => state.resetGame);

  const invalid =
    hydrated &&
    (!session ||
      session.status !== "completed" ||
      session.records.length !== TOTAL_QUARTERS);

  useEffect(() => {
    if (invalid) router.replace("/game");
  }, [invalid, router]);

  if (!hydrated || !session || invalid) {
    return <GameSessionLoading label="Opening final ledger" />;
  }

  function playAgain() {
    try {
      resetGame();
      router.replace("/game");
    } catch {}
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <GameSessionHeader
        quarter={TOTAL_QUARTERS}
        totalQuarters={TOTAL_QUARTERS}
        brandAsHeading={false}
        completed
      />
      <FinalResults
        session={session}
        professorState={professorState}
        onPlayAgain={playAgain}
      />
    </div>
  );
}
