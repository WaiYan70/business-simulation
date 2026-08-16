"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, CheckCircle2, ReceiptText } from "lucide-react";

import ProfessorDebrief from "./ProfessorDebrief";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  describeCapacityCoverage,
  formatYen,
  type BigMove,
  type QuarterRecord,
} from "@/simulation/GameSession";
import type { ProfessorState } from "@/features/game-session/professor-state";

type QuarterResultsProps = {
  record: QuarterRecord;
  continueHref: string;
  continueLabel: string;
  professorState?: ProfessorState;
};

const BIG_MOVE_LABELS: Record<BigMove, string> = {
  "staff-training": "Staff training",
  "loyalty-program": "Loyalty program",
  renovate: "Renovate",
};

export default function QuarterResults({
  record,
  continueHref,
  continueLabel,
  professorState = "loading",
}: QuarterResultsProps) {
  const router = useRouter();

  const { quarter, decision, scenario, outcome } = record;

  const bigMovesValue =
    decision.bigMoves.length === 0
      ? "None"
      : decision.bigMoves
          .map((move) => BIG_MOVE_LABELS[move])
          .join(", ");

  const decisionRows = [
    ["Price per cup", formatYen(decision.price)],
    ["Marketing", formatYen(decision.marketing)],
    ["Staff", `${decision.staff}`],
    ["Big moves", bigMovesValue],
  ] as const;

  const businessRows = [
    ["Closing cash", formatYen(outcome.stateAfter.cash)],
    ["Loyal customers", outcome.stateAfter.loyalty.toLocaleString()],
    ["Staff morale", `${outcome.stateAfter.morale} / 100`],
    ["Market share", `${outcome.stateAfter.marketShare}%`],
  ] as const;

  const incomeRows = [
    ["Sales revenue", formatYen(outcome.revenue)],
    ["Cost of goods sold", formatYen(outcome.costOfGoodsSold)],
    ["Gross profit", formatYen(outcome.revenue - outcome.costOfGoodsSold)],
    ["Operating expenses", formatYen(outcome.operatingExpenses)],
    ["Net profit", formatYen(outcome.profit)],
  ] as const;


  const profitDescription =
    outcome.profit >= 0
      ? `net profit of ${formatYen(outcome.profit)}`
      : `net loss of ${formatYen(Math.abs(outcome.profit))}`;

  const demandDescription = describeCapacityCoverage(outcome.lostSales)

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
            {outcome.headline}
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">
            These figures are the saved simulation result. Professor commentary
            is separate and may arrive after you begin reviewing them.
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-3 sm:text-right">
          <ReceiptText className="size-7 text-primary" aria-hidden="true" />
          <dl>
            <dt className="font-mono text-xs text-muted-foreground">
              Closing cash
            </dt>
            <dd className="font-mono text-2xl font-bold tabular-nums text-primary">
              {formatYen(outcome.stateAfter.cash)}
            </dd>
          </dl>
        </div>
      </header>

      <section
        className="border-b border-border py-6"
        aria-labelledby="committed-decisions-heading"
      >
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-serif text-2xl font-bold">
              Committed decisions
            </h2>
            <p>The decision set recorded when Quarter {quarter} was stamped</p>
          </div>
          <p className="font-mono text-xs text-muted-foreground">
            {scenario.season}
          </p>
        </div>
        <dl>
          {decisionRows.map(([label, value]) => (
            <div
              key={label}
              className="border-b border-dashed border-border pb-3"
            >
              <dt className="text-sm text-muted-foreground">{label}</dt>
              <dd className="mt-1 font-mono font-bold capitalize tabular-nums">
                {value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="border-b border-border py-6">
        <div className="grid gap-4 sm:grid-cols-[minmax(0, 1fr)_auto] sm:items-start">
          <div>
            <h2
              id="quarter-event-heading"
              className="font-serif text-2xl font-bold"
            >
              {scenario.event.title}
            </h2>
            <p className="mt-2 max-w-[70ch] leadin-7 text-muted-foreground">
              {scenario.event.summary}
            </p>
          </div>
          <Badge variant="outline" className="w-fit font-mono">
            Q{quarter} event
          </Badge>
        </div>
      </section>

      <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1.55fr)_minmax(320px,0.8fr)] xl:gap-12">
        <div className="min-w-0">
          <div className="grid gap-8 md:grid-cols-2 md:gap-10">
            <LedgerList
              title="Business position"
              quarter={quarter}
              rows={businessRows}
            />
            <LedgerList
              title="Income statement"
              quarter={quarter}
              rows={incomeRows}
            />
          </div>

          <section
            className="mt-10 border-y border-border py-6"
            aria-labelledby="result-reading-heading"
          >
            <div className="grid gap-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
              <div>
                <h2
                  id="result-reading-heading"
                  className="font-serif text-2xl font-bold"
                >
                  What the ledger says
                </h2>
                <p className="mt-2 max-w-[70ch] leading-7 text-muted-foreground">
                  Quarter {quarter} ended with {profitDescription}. Demand
                  reached {outcome.demand.toLocaleString("en-US")} cups against
                  capacity of {outcome.capacity.toLocaleString("en-US")} cups.{" "}
                  {demandDescription}
                </p>
                <p className="mt-3 max-w-[70ch] leading-7 text-muted-foreground">
                  {outcome.eventEffect}
                </p>
              </div>
              <dl className="grid grid-cols-2 gap-x-6 gap-y-4 font-mono sm:block sm:text-right">
                <div>
                  <dt className="text-xs text-muted-foreground">
                    Market share
                  </dt>
                  <dd className="mt-1 text-xl font-bold tabular-nums">
                    {outcome.stateAfter.marketShare}%
                  </dd>
                </div>

                <div className="sm:mt-4">
                  <dt className="text-xs text-muted-foreground">Lost sales</dt>
                  <dd className="mt-1 text-xl font-bold tabular-nums">
                    {outcome.lostSales.toLocaleString("en-US")}
                  </dd>
                </div>
              </dl>
            </div>
          </section>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl text-sm leading-6 text-muted-foreground">
              You can continue now. The Professor panel will update
              independently when commentary is ready.
            </p>
            <Button
              className="h-11 w-full sm:w-auto"
              onClick={() => router.push(continueHref)}
            >
              {continueLabel}
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
  const headingId = `${title.toLowerCase().replaceAll(" ", "-")}-heading`;

  return (
    <section aria-labelledby={headingId}>
      <div className="flex items-baseline justify-between gap-4">
        <h2 id={headingId} className="font-serif text-2xl font-bold">
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
            <dt className="leading-6 text-muted-foreground">{label}</dt>
            <dd className="text-right font-mono font-bold tabular-nums text-foreground">
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
