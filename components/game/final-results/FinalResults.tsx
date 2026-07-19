"use client";

import { useRouter } from "next/navigation";
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
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

type FinalResultsProps = {
  professorState?: Exclude<FinalProfessorState, "ready">;
};

type QuarterRecord = {
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

const financialPosition = [
  { label: "Starting cash", value: "¥3,000,000", direction: "Baseline" },
  { label: "Closing cash", value: "¥8,460,000", direction: "Up ¥5,460,000" },
  { label: "Cumulative revenue", value: "¥17,820,000", direction: "8 quarters" },
  { label: "Cumulative profit", value: "¥3,240,000", direction: "18.2% margin" },
  { label: "Debt", value: "¥198,000", direction: "Outstanding" },
] as const;

const businessCondition = [
  { label: "Loyalty", start: "640", end: "923", direction: "up" },
  { label: "Reputation", start: "54", end: "71", direction: "up" },
  { label: "Staff morale", start: "72", end: "48", direction: "down" },
  { label: "Quality", start: "61", end: "78", direction: "up" },
  { label: "Market share", start: "31%", end: "42%", direction: "up" },
] as const;

const quarterRecords: QuarterRecord[] = [
  {
    quarter: 1,
    event: "Launch",
    decisions: "¥520 cup · ¥200k marketing · 3 staff · Standard",
    revenue: "¥1,420,000",
    profit: "¥260,000",
    endingCash: "¥3,260,000",
    demand: "3,020 cups",
    capacity: "3,360 cups",
    lostSales: "0 cups",
    eventEffect: "No external event. The quarter established the operating baseline.",
  },
  {
    quarter: 2,
    event: "Local festival",
    decisions: "¥540 cup · ¥500k marketing · 4 staff · Standard",
    revenue: "¥2,210,000",
    profit: "¥560,000",
    endingCash: "¥3,820,000",
    demand: "4,420 cups",
    capacity: "4,100 cups",
    lostSales: "320 cups",
    eventEffect: "Festival demand increased potential traffic and exposed a capacity limit.",
    turningPoint: true,
  },
  {
    quarter: 3,
    event: "Summer",
    decisions: "¥560 cup · ¥450k marketing · 4 staff · Premium",
    revenue: "¥2,000,000",
    profit: "¥620,000",
    endingCash: "¥4,440,000",
    demand: "3,760 cups",
    capacity: "4,100 cups",
    lostSales: "0 cups",
    eventEffect: "Premium beans supported quality while a higher price moderated demand.",
  },
  {
    quarter: 4,
    event: "Heavy rain",
    decisions: "¥550 cup · ¥700k marketing · 4 staff · Premium",
    revenue: "¥1,780,000",
    profit: "¥320,000",
    endingCash: "¥4,760,000",
    demand: "3,240 cups",
    capacity: "4,100 cups",
    lostSales: "0 cups",
    eventEffect: "Heavy rain reduced walk-in demand despite additional marketing.",
  },
  {
    quarter: 5,
    event: "Bean shortage",
    decisions: "¥590 cup · ¥350k marketing · 4 staff · Premium",
    revenue: "¥1,980,000",
    profit: "¥210,000",
    endingCash: "¥4,970,000",
    demand: "3,410 cups",
    capacity: "4,100 cups",
    lostSales: "0 cups",
    eventEffect: "The shortage increased premium bean cost and compressed margin.",
    turningPoint: true,
  },
  {
    quarter: 6,
    event: "Autumn",
    decisions: "¥610 cup · ¥600k marketing · 5 staff · Premium",
    revenue: "¥2,250,000",
    profit: "¥460,000",
    endingCash: "¥5,430,000",
    demand: "3,890 cups",
    capacity: "5,100 cups",
    lostSales: "0 cups",
    eventEffect: "The loyalty program improved repeat demand without exhausting capacity.",
  },
  {
    quarter: 7,
    event: "Machine repair",
    decisions: "¥620 cup · ¥300k marketing · 5 staff · Premium",
    revenue: "¥1,960,000",
    profit: "¥220,000",
    endingCash: "¥5,650,000",
    demand: "3,620 cups",
    capacity: "4,080 cups",
    lostSales: "0 cups",
    eventEffect: "Repair costs and reduced equipment capacity constrained the quarter.",
  },
  {
    quarter: 8,
    event: "Year-end",
    decisions: "¥640 cup · ¥800k marketing · 5 staff · Premium",
    revenue: "¥2,220,000",
    profit: "¥590,000",
    endingCash: "¥8,460,000",
    demand: "4,640 cups",
    capacity: "5,100 cups",
    lostSales: "0 cups",
    eventEffect: "Year-end demand rewarded the established reputation and quality position.",
    turningPoint: true,
  },
];

export default function FinalResults({
  professorState = "loading",
}: FinalResultsProps) {
  const router = useRouter();

  return (
    <main className="mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 lg:py-8">
      <header className="border-b border-border pb-7">
        <div className="flex items-center gap-2 text-sm font-medium text-primary">
          <CheckCircle2 className="size-4" aria-hidden="true" />
          <span>Run complete · 8 quarters</span>
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
              <ReceiptText className="size-7 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <dt className="font-mono text-xs text-muted-foreground">Closing cash</dt>
                <dd className="mt-1 font-mono text-2xl font-bold tabular-nums text-primary sm:text-3xl">
                  ¥8,460,000
                </dd>
              </div>
            </div>
            <div className="flex items-center gap-3 sm:pl-6">
              <TrendingUp className="size-7 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <dt className="font-mono text-xs text-muted-foreground">
                  Cumulative profit
                </dt>
                <dd className="mt-1 font-mono text-2xl font-bold tabular-nums text-primary sm:text-3xl">
                  ¥3,240,000
                </dd>
              </div>
            </div>
          </dl>
        </div>
      </header>

      <div className="mt-6 grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[minmax(0,1.7fr)_minmax(320px,0.9fr)] xl:gap-10">
        <div className="order-2 min-w-0 lg:order-1">
          <div className="grid min-w-0 grid-cols-[minmax(0,1fr)] gap-8 md:grid-cols-2 md:gap-10">
            <FinancialLedger />
            <BusinessLedger />
          </div>

          <QuarterHistory />
        </div>

        <div className="order-1 lg:order-2">
          <FinalProfessorReview initialState={professorState} />
        </div>
      </div>

      <footer className="mt-10 flex flex-col gap-5 border-y border-border py-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-3">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-primary/40 text-primary">
            <CheckCircle2 className="size-5" aria-hidden="true" />
          </span>
          <div>
            <p className="font-semibold">This completed run is saved in your game history.</p>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              Review any quarter above, or start a new run with what you learned.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            variant="outline"
            className="h-11 px-5"
            onClick={() => router.push("/")}
          >
            <History data-icon="inline-start" aria-hidden="true" />
            View game history
          </Button>
          <Button className="h-11 px-6" onClick={() => router.push("/game")}>
            <RotateCcw data-icon="inline-start" aria-hidden="true" />
            Play again
            <ArrowRight data-icon="inline-end" aria-hidden="true" />
          </Button>
        </div>
      </footer>
    </main>
  );
}

function FinancialLedger() {
  return (
    <section className="min-w-0" aria-labelledby="financial-position-heading">
      <h2 id="financial-position-heading" className="font-serif text-2xl font-bold">
        Financial position
      </h2>
      <Separator className="mt-3 bg-foreground" />
      <dl>
        {financialPosition.map((item) => (
          <div
            key={item.label}
            className="grid grid-cols-[minmax(0,1fr)_auto] gap-4 border-b border-dashed border-border py-3.5"
          >
            <dt className="leading-6 text-muted-foreground">{item.label}</dt>
            <dd className="text-right">
              <span className="block font-mono font-bold tabular-nums">{item.value}</span>
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

function BusinessLedger() {
  return (
    <section className="min-w-0" aria-labelledby="business-condition-heading">
      <h2 id="business-condition-heading" className="font-serif text-2xl font-bold">
        Business condition
      </h2>
      <Separator className="mt-3 bg-foreground" />
      <dl>
        {businessCondition.map((item) => (
          <div
            key={item.label}
            className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-dashed border-border py-4"
          >
            <dt className="leading-6 text-muted-foreground">{item.label}</dt>
            <dd className="flex items-center gap-2 font-mono font-bold tabular-nums">
              <span>{item.start}</span>
              <span className="text-muted-foreground" aria-hidden="true">→</span>
              <span>{item.end}</span>
              <span className="sr-only">
                {item.direction === "up" ? "increased" : "decreased"}
              </span>
              <span className="text-primary" aria-hidden="true">
                {item.direction === "up" ? "↑" : "↓"}
              </span>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function QuarterHistory() {
  return (
    <section className="mt-10" aria-labelledby="quarter-history-heading">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 id="quarter-history-heading" className="font-serif text-2xl font-bold">
            Eight-quarter record
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Expand a quarter to inspect its operational result and event context.
          </p>
        </div>
        <p className="flex items-center gap-2 text-xs text-muted-foreground">
          <Star className="size-3 fill-primary text-primary" aria-hidden="true" />
          Turning point
        </p>
      </div>

      <div
        className="mt-4 hidden grid-cols-[120px_minmax(260px,1fr)_105px_95px_115px_24px] gap-3 border-y border-foreground px-3 py-2 font-mono text-xs text-muted-foreground lg:grid"
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
        {quarterRecords.map((record) => (
          <QuarterDisclosure key={record.quarter} record={record} />
        ))}
      </div>
    </section>
  );
}

function QuarterDisclosure({ record }: { record: QuarterRecord }) {
  return (
    <details className="group border-b border-dashed border-border open:bg-secondary/30">
      <summary className="grid min-h-12 cursor-pointer list-none grid-cols-[minmax(0,1fr)_auto] gap-3 px-3 py-3 outline-none transition-colors hover:bg-secondary/40 focus-visible:ring-3 focus-visible:ring-ring/30 lg:grid-cols-[120px_minmax(260px,1fr)_105px_95px_115px_24px] lg:items-center [&::-webkit-details-marker]:hidden">
        <span className="flex min-w-0 items-center gap-2 font-mono font-bold">
          {record.turningPoint ? (
            <>
              <span className="sr-only">Turning point. </span>
              <Star className="size-3 shrink-0 fill-primary text-primary" aria-hidden="true" />
            </>
          ) : null}
          <span>Q{record.quarter}</span>
          <span className="truncate font-normal text-muted-foreground">{record.event}</span>
        </span>

        <span className="col-span-2 text-sm leading-6 text-muted-foreground lg:col-span-1 lg:truncate">
          {record.decisions}
        </span>

        <span className="col-span-2 grid grid-cols-3 gap-3 lg:contents">
          <span>
            <span className="block font-mono text-xs text-muted-foreground lg:hidden">
              Revenue
            </span>
            <span className="mt-1 block text-right font-mono text-sm font-bold tabular-nums lg:mt-0">
              {record.revenue}
            </span>
          </span>
          <span>
            <span className="block font-mono text-xs text-muted-foreground lg:hidden">
              Profit
            </span>
            <span className="mt-1 block text-right font-mono text-sm font-bold tabular-nums lg:mt-0">
              {record.profit}
            </span>
          </span>
          <span>
            <span className="block font-mono text-xs text-muted-foreground lg:hidden">
              Cash
            </span>
            <span className="mt-1 block text-right font-mono text-sm font-bold tabular-nums lg:mt-0">
              {record.endingCash}
            </span>
          </span>
        </span>

        <ChevronDown
          className="col-start-2 row-start-1 size-5 text-muted-foreground transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none lg:col-start-6"
          aria-hidden="true"
        />
      </summary>

      <div className="grid gap-5 border-t border-border px-3 py-4 sm:grid-cols-3">
        <div>
          <p className="font-mono text-xs text-muted-foreground">Demand</p>
          <p className="mt-1 font-mono font-bold tabular-nums">{record.demand}</p>
        </div>
        <div>
          <p className="font-mono text-xs text-muted-foreground">Capacity</p>
          <p className="mt-1 font-mono font-bold tabular-nums">{record.capacity}</p>
        </div>
        <div>
          <p className="font-mono text-xs text-muted-foreground">Lost sales</p>
          <p className="mt-1 font-mono font-bold tabular-nums">{record.lostSales}</p>
        </div>
        <p className="text-sm leading-6 text-muted-foreground sm:col-span-3">
          {record.eventEffect}
        </p>
      </div>
    </details>
  );
}
