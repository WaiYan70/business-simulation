"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, CheckCircle2, ReceiptText } from "lucide-react";

import ProfessorDebrief from "@/components/game/quarter-results/ProfessorDebrief";
import {
  incomeStatementStats,
  stateSnapshot,
  stateStats,
} from "@/components/game/shared/sample-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useGameFlowStore } from "@/lib/stores/game-flow-store";

type QuarterResultsProps = {
  quarter: number;
  professorState?: "loading" | "slow" | "error" | "fallback";
};

export default function QuarterResults({
  quarter,
  professorState = "loading",
}: QuarterResultsProps) {
  const router = useRouter();
  const continueToNextQuarter = useGameFlowStore(
    (state) => state.continueToNextQuarter,
  );

  function planNextQuarter() {
    continueToNextQuarter();
    router.push("/game");
  }

  return (
    <main className="mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 lg:py-8">
      <header className="flex flex-col gap-5 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="secondary" className="font-mono">
              Quarter {quarter} closed
            </Badge>
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
              <CheckCircle2 className="size-4" aria-hidden="true" />
              Committed result
            </span>
          </div>
          <h1 className="mt-4 max-w-3xl text-wrap-balance font-serif text-3xl font-bold leading-tight sm:text-4xl">
            A profitable quarter, with pressure behind the numbers
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">
            These figures are the saved simulation result. Professor commentary
            is separate and may arrive after you begin reviewing them.
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-3 sm:text-right">
          <ReceiptText className="size-7 text-primary" aria-hidden="true" />
          <div>
            <p className="font-mono text-xs text-muted-foreground">Closing cash</p>
            <p className="font-mono text-2xl font-bold tabular-nums text-primary">
              {stateSnapshot.cashOnHand}
            </p>
          </div>
        </div>
      </header>

      <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1.55fr)_minmax(320px,0.8fr)] xl:gap-12">
        <div className="min-w-0">
          <div className="grid gap-8 md:grid-cols-2 md:gap-10">
            <LedgerList title="Business position" quarter={quarter} rows={stateStats} />
            <LedgerList
              title="Income statement"
              quarter={quarter}
              rows={incomeStatementStats}
            />
          </div>

          <section className="mt-10 border-y border-border py-6" aria-labelledby="result-reading-heading">
            <div className="grid gap-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
              <div>
                <h2 id="result-reading-heading" className="font-serif text-2xl font-bold">
                  What the ledger says
                </h2>
                <p className="mt-2 max-w-[70ch] leading-7 text-muted-foreground">
                  Cash changed by {stateSnapshot.cashChange}. The financial result
                  is positive, while staff morale remains the clearest constraint
                  carried into the next decision.
                </p>
              </div>
              <div className="font-mono text-left sm:text-right">
                <p className="text-xs text-muted-foreground">Market share</p>
                <p className="mt-1 text-xl font-bold tabular-nums">
                  {stateSnapshot.marketShare}%
                </p>
              </div>
            </div>
          </section>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl text-sm leading-6 text-muted-foreground">
              You can continue now. The Professor panel will update independently
              when commentary is ready.
            </p>
            <Button
              className="h-11 w-full sm:w-auto"
              onClick={planNextQuarter}
            >
              Plan Quarter {quarter + 1}
              <ArrowRight data-icon="inline-end" aria-hidden="true" />
            </Button>
          </div>
        </div>

        <ProfessorDebrief quarter={quarter} initialState={professorState} />
      </div>
    </main>
  );
}

function LedgerList({
  title,
  quarter,
  rows,
}: {
  title: string;
  quarter: number;
  rows: ReadonlyArray<readonly [string, string]>;
}) {
  return (
    <section aria-labelledby={`${title.toLowerCase().replaceAll(" ", "-")}-heading`}>
      <div className="flex items-baseline justify-between gap-4">
        <h2
          id={`${title.toLowerCase().replaceAll(" ", "-")}-heading`}
          className="font-serif text-2xl font-bold"
        >
          {title}
        </h2>
        <span className="font-mono text-xs text-muted-foreground">
          Q{quarter} result
        </span>
      </div>
      <Separator className="mt-4 bg-foreground" />
      <dl>
        {rows.map(([label, value]) => (
          <div
            key={label}
            className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-4 border-b border-dashed border-border py-4"
          >
            <dt className="leading-6 text-muted-foreground">
              {label.startsWith("Net profit") ? "Net profit" : label}
            </dt>
            <dd className="text-right font-mono font-bold tabular-nums text-foreground">
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
