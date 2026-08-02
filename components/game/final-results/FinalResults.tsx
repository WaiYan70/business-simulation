"use client";

import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  History,
  ReceiptText,
  RotateCcw,
  Star,
  TrendingUp,
} from "lucide-react";

import FinalProfessorReview, {
  type FinalProfessorState,
} from "@/components/game/final-results/FinalProfessorReview";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  formatDecisionSummary,
  formatYen,
  type GameSession,
  getCumulativeTotals,
  getCurrentBusinessState,
  INITIAL_BUSINESS_STATE,
  materializeQuarterRecord,
  type QuarterRecord,
} from "../session/GameSession";
import Link from "next/link";
import { cn } from "@/lib/utils";

type FinalResultsProps = {
  session: GameSession;
  onPlayAgain: () => void;
  professorState?: Exclude<FinalProfessorState, "ready">;
};

type FinancialPositionItem = {
  label: string;
  value: string;
  direction: string;
};

type TrendDirection = "up" | "down" | "flat";

type BusinessConditionItem = {
  label: string;
  start: string;
  end: string;
  direction: TrendDirection;
};

type QuarterHistoryRecord = {
  quarter: number;
  event: string;
  decisions: string;
  revenue: string;
  profit: string;
  endingCash: string;
  demand: string;
  capacity: string;
  lostSales: string;
  eventEffect: string;
  turningPoint?: boolean;
};

export default function FinalResults({
  session,
  onPlayAgain,
  professorState = "loading",
}: FinalResultsProps) {
  const totals = getCumulativeTotals(session);
  const finalState = getCurrentBusinessState(session);

  const materializedRecords = session.records.map(materializeQuarterRecord);

  const firstRecord = materializedRecords[0];
  const finalRecord = materializedRecords[materializedRecords.length - 1];

  const profitMargin =
    totals.revenue === 0 ? 0 : (totals.profit / totals.revenue) * 100;

  const financialPosition: FinancialPositionItem[] = [
    {
      label: "Starting cash",
      value: formatYen(INITIAL_BUSINESS_STATE.cash),
      direction: "Baseline",
    },
    {
      label: "Closing cash",
      value: formatYen(finalState.cash),
      direction: formatCashChange(
        finalState.cash - INITIAL_BUSINESS_STATE.cash,
      ),
    },
    {
      label: "Cumulative revenue",
      value: formatYen(totals.revenue),
      direction: `${session.records.length} quarters`,
    },
    {
      label: "Cumulative profit",
      value: formatYen(totals.profit),
      direction: `${profitMargin.toFixed(1)}% margin`,
    },
    {
      label: "Debt",
      value: formatYen(finalState.debt),
      direction: formatDebtChange(
        finalState.debt - INITIAL_BUSINESS_STATE.debt,
      ),
    },
  ];

  const businessCondition: BusinessConditionItem[] = [
    {
      label: "Loyalty",
      start: INITIAL_BUSINESS_STATE.loyalty.toLocaleString(),
      end: finalState.loyalty.toLocaleString(),
      direction: getTrendDirection(
        INITIAL_BUSINESS_STATE.loyalty,
        finalState.loyalty,
      ),
    },
    {
      label: "Staff morale",
      start: INITIAL_BUSINESS_STATE.morale.toString(),
      end: finalState.morale.toString(),
      direction: getTrendDirection(
        INITIAL_BUSINESS_STATE.morale,
        finalState.morale,
      ),
    },
    {
      label: "Market share",
      start: `${INITIAL_BUSINESS_STATE.marketShare}%`,
      end: `${finalState.marketShare}%`,
      direction: getTrendDirection(
        INITIAL_BUSINESS_STATE.marketShare,
        finalState.marketShare,
      ),
    },
    {
      label: "Debt",
      start: formatYen(INITIAL_BUSINESS_STATE.debt),
      end: formatYen(finalState.debt),
      direction: getTrendDirection(
        INITIAL_BUSINESS_STATE.debt,
        finalState.debt,
      ),
    },
    {
      label: "Quarterly capacity",
      start: firstRecord
        ? `${firstRecord.outcome.capacity.toLocaleString()} cups`
        : "Not available",
      end: finalRecord
        ? `${finalRecord.outcome.capacity.toLocaleString()} cups`
        : "Not available",
      direction:
        firstRecord && finalRecord
          ? getTrendDirection(
              firstRecord.outcome.capacity,
              finalRecord.outcome.capacity,
            )
          : "flat",
    },
  ];

  const quarterRecords: QuarterHistoryRecord[] = materializedRecords.map(
    toQuarterHistoryRecord,
  );

  return (
    <main className="mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 lg:py-8">
      <header className="border-b border-border pb-7">
        <div className="flex items-center gap-2 text-sm font-medium text-primary">
          <CheckCircle2 className="size-4" aria-hidden="true" />
          <span>Run complete · {session.records.length} quarters</span>
        </div>

        <div className="mt-4 grid gap-6 xl:grid-cols-[minmax(0,1fr)_auto] xl:items-end">
          <div>
            <h1 className="max-w-3xl text-wrap-balance font-serif text-4xl font-bold leading-none sm:text-5xl">
              The owner&apos;s final ledger
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
              This is the saved report for your eight-quarter run. The ledger is
              authoritative; the Professor&apos;s review is interpretation drawn
              from those results.
            </p>
          </div>

          <dl className="grid gap-5 sm:grid-cols-2 sm:divide-x sm:divide-border">
            <div className="flex items-center gap-3 sm:pr-6">
              <ReceiptText
                className="size-7 shrink-0 text-primary"
                aria-hidden="true"
              />
              <div>
                <dt className="font-mono text-xs text-muted-foreground">
                  Closing cash
                </dt>
                <dd className="mt-1 font-mono text-2xl font-bold tabular-nums text-primary sm:text-3xl">
                  {formatYen(finalState.cash)}
                </dd>
              </div>
            </div>
            <div className="flex items-center gap-3 sm:pl-6">
              <TrendingUp
                className="size-7 shrink-0 text-primary"
                aria-hidden="true"
              />
              <div>
                <dt className="font-mono text-xs text-muted-foreground">
                  Cumulative profit
                </dt>
                <dd className="mt-1 font-mono text-2xl font-bold tabular-nums text-primary sm:text-3xl">
                  {formatYen(totals.profit)}
                </dd>
              </div>
            </div>
          </dl>
        </div>
      </header>

      <div className="mt-6 grid grid-cols-[minmax(0,1fr)] gap-8 xl:grid-cols-[minmax(0,1.7fr)_minmax(320px,0.9fr)] xl:gap-10">
        <div className="order-2 min-w-0 xl:order-1">
          <div className="grid min-w-0 grid-cols-[minmax(0,1fr)] gap-8 md:grid-cols-2 md:gap-10">
            <FinancialLedger items={financialPosition} />
            <BusinessLedger items={businessCondition} />
          </div>

          <QuarterHistory records={quarterRecords} />
        </div>

        <div className="order-1 min-w-0 xl:order-2">
          <FinalProfessorReview initialState={professorState} />
        </div>
      </div>

      <footer className="mt-10 flex flex-col gap-5 border-y border-border py-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-3">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-primary/40 text-primary">
            <CheckCircle2 className="size-5" aria-hidden="true" />
          </span>
          <div>
            <p className="font-semibold">
              This completed run is saved in your game history.
            </p>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              Refresh to keep reviewing the ledger, inspect an earlier quarter,
              or begin a new eight-quarter run.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/game/results?quarter=1"
            className={cn(buttonVariants({ variant: "outline" }), "h-11 px-5")}
          >
            <History data-icon="inline-start" aria-hidden="true" />
            Review from Q1
          </Link>
          <Button variant="outline" className="h-11 px-5" onClick={onPlayAgain}>
            <History data-icon="inline-start" aria-hidden="true" />
            View game history
          </Button>
          <Button className="h-11 px-6" onClick={onPlayAgain}>
            <RotateCcw data-icon="inline-start" aria-hidden="true" />
            Play again
            <ArrowRight data-icon="inline-end" aria-hidden="true" />
          </Button>
        </div>
      </footer>
    </main>
  );
}

function FinancialLedger({ items }: { items: FinancialPositionItem[] }) {
  return (
    <section className="min-w-0" aria-labelledby="financial-position-heading">
      <h2
        id="financial-position-heading"
        className="font-serif text-2xl font-bold"
      >
        Financial position
      </h2>
      <Separator className="mt-3 bg-foreground" />
      <dl>
        {items.map((item) => (
          <div
            key={item.label}
            className="grid grid-cols-[minmax(0,1fr)_auto] gap-4 border-b border-dashed border-border py-3.5"
          >
            <dt className="leading-6 text-muted-foreground">{item.label}</dt>
            <dd className="text-right">
              <span className="block font-mono font-bold tabular-nums">
                {item.value}
              </span>
              <span className="mt-1 block text-xs text-muted-foreground">
                {item.direction}
              </span>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function BusinessLedger({ items }: { items: BusinessConditionItem[] }) {
  return (
    <section className="min-w-0" aria-labelledby="business-condition-heading">
      <h2
        id="business-condition-heading"
        className="font-serif text-2xl font-bold"
      >
        Business condition
      </h2>
      <Separator className="mt-3 bg-foreground" />
      <dl>
        {items.map((item) => (
          <div
            key={item.label}
            className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-dashed border-border py-4"
          >
            <dt className="leading-6 text-muted-foreground">{item.label}</dt>
            <dd className="flex items-center gap-2 font-mono font-bold tabular-nums">
              <span>{item.start}</span>
              <span className="text-muted-foreground" aria-hidden="true">
                →
              </span>
              <span>{item.end}</span>
              <span className="sr-only">
                {getTrendDescription(item.direction)}
              </span>
              <span className="text-primary" aria-hidden="true">
                {getTrendSymbol(item.direction)}
              </span>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function QuarterHistory({ records }: { records: QuarterHistoryRecord[] }) {
  return (
    <section className="mt-10" aria-labelledby="quarter-history-heading">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2
            id="quarter-history-heading"
            className="font-serif text-2xl font-bold"
          >
            Eight-quarter record
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Expand a quarter to inspect its operational result and event
            context.
          </p>
        </div>
        <p className="flex items-center gap-2 text-xs text-muted-foreground">
          <Star
            className="size-3 fill-primary text-primary"
            aria-hidden="true"
          />
          Turning point
        </p>
      </div>

      <div
        className="mt-4 hidden grid-cols-[105px_minmax(150px,1fr)_92px_82px_105px_20px] gap-2 border-y border-foreground px-3 py-2 font-mono text-xs text-muted-foreground lg:grid"
        aria-hidden="true"
      >
        <span>Quarter / Event</span>
        <span>Decisions</span>
        <span className="text-right">Revenue</span>
        <span className="text-right">Profit</span>
        <span className="text-right">Ending cash</span>
        <span />
      </div>

      <div className="border-t border-foreground lg:border-t-0">
        {records.map((record) => (
          <QuarterDisclosure key={record.quarter} record={record} />
        ))}
      </div>
    </section>
  );
}

function QuarterDisclosure({ record }: { record: QuarterHistoryRecord }) {
  return (
    <details className="group border-b border-dashed border-border open:bg-secondary/30">
      <summary className="grid min-h-12 cursor-pointer list-none grid-cols-[minmax(0,1fr)_auto] gap-3 px-3 py-3 outline-none transition-colors hover:bg-secondary/40 focus-visible:ring-3 focus-visible:ring-ring/30 lg:grid-cols-[105px_minmax(150px,1fr)_92px_82px_105px_20px] lg:items-center lg:gap-2 [&::-webkit-details-marker]:hidden">
        <span className="flex min-w-0 items-center gap-2 font-mono font-bold">
          {record.turningPoint ? (
            <>
              <span className="sr-only">Turning point. </span>
              <Star
                className="size-3 shrink-0 fill-primary text-primary"
                aria-hidden="true"
              />
            </>
          ) : null}
          <span>Q{record.quarter}</span>
          <span className="truncate font-normal text-muted-foreground">
            {record.event}
          </span>
        </span>

        <span className="col-span-2 text-sm leading-6 text-muted-foreground lg:col-span-1 lg:truncate">
          {record.decisions}
        </span>

        <span className="col-span-2 grid grid-cols-3 gap-3 lg:contents">
          {/* Revenue */}
          <QuarterValue label="Revenue" value={record.revenue} />

          {/* Profit */}
          <QuarterValue label="Profit" value={record.profit} />

          {/* Ending Cash */}
          <QuarterValue label="Cash" value={record.endingCash} />
        </span>

        <ChevronDown
          className="col-start-2 row-start-1 size-5 text-muted-foreground transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none lg:col-start-6"
          aria-hidden="true"
        />
      </summary>

      <div className="grid gap-5 border-t border-border px-3 py-4 sm:grid-cols-3">
        <DisclosureMetric label="Demand" value={record.demand} />
        <DisclosureMetric label="Capacity" value={record.capacity} />
        <DisclosureMetric label="lostSales" value={record.lostSales} />
        <p className="text-sm leading-6 text-muted-foreground sm:col-span-3">
          {record.eventEffect}
        </p>
      </div>
    </details>
  );
}

function QuarterValue({ label, value }: { label: string; value: string }) {
  return (
    <span>
      <span className="block font-mono text-xs text-muted-foreground lg:hidden">
        {label}
      </span>{" "}
      <span className="mt-1 block text-right font-mono text-sm font-bold tabular-nums">
        {value}
      </span>{" "}
    </span>
  );
}

function DisclosureMetric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-mono text-xs text-shadow-muted">{label}</p>
      <p className="mt-1 font-mono font-bold tabular-nums">{value}</p>
    </div>
  );
}

function toQuarterHistoryRecord(
  record: QuarterRecord,
): QuarterHistoryRecord {
  return {
    quarter: record.quarter,
    event: record.scenario.event.title,
    decisions: formatDecisionSummary(record.decision),
    revenue: formatYen(record.outcome.revenue),
    profit: formatYen(record.outcome.profit),
    endingCash: formatYen(record.outcome.stateAfter.cash),
    demand: `${record.outcome.demand.toLocaleString()} cups`,
    capacity: `${record.outcome.capacity.toLocaleString()} cups`,
    lostSales: `${record.outcome.lostSales.toLocaleString()} cups`,
    eventEffect: record.outcome.eventEffect,
    turningPoint: record.outcome.turningPoint,
  };
}

function getTrendDirection(start: number, end: number): TrendDirection {
  if (end > start) return "up";
  if (end < start) return "down";
  return "flat";
}

function getTrendDescription(direction: TrendDirection): string {
  switch (direction) {
    case "up":
      return "increased";
    case "down":
      return "decreased";
    case "flat":
      return "unchanged";
  }
}

function getTrendSymbol(direction: TrendDirection): string {
  switch (direction) {
    case "up":
      return "↑";
    case "down":
      return "↓";
    case "flat":
      return "—";
  }
}

function formatCashChange(change: number): string {
  if (change > 0) return `Up ${formatYen(change)}`;
  if (change < 0) return `Down ${formatYen(Math.abs(change))}`;
  return "No change";
}

function formatDebtChange(change: number): string {
  if (change < 0) {
    return `Reduced ${formatYen(Math.abs(change))}`;
  }
  if (change > 0) {
    return `Increased ${formatYen(change)}`;
  }
  return "No change";
}
