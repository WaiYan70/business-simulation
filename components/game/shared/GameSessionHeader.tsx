import Link from "next/link";
import { formatQuarterSeason } from "../session/GameSession";

type GameSessionHeaderProps = {
  quarter?: number;
  season?: string;
  totalQuarters?: number;
  brandAsHeading?: boolean;
  completed?: boolean;
  viewingQuarter?: number;
  availableResultQuarters?: readonly number[];
};

export default function GameSessionHeader({
  quarter = 1,
  season,
  totalQuarters = 8,
  brandAsHeading = true,
  completed = false,
  viewingQuarter,
  availableResultQuarters = [],
}: GameSessionHeaderProps) {
  return (
    <nav
      className="mx-auto flex w-full max-w-[1600px] items-center justify-between gap-6 border-b-2 border-foreground px-6 py-4"
      aria-label="Game session"
    >
      <GameIdentity asHeading={brandAsHeading} />

      <Quarters
        currentQuarter={quarter}
        totalQuarters={totalQuarters}
        completed={completed}
        viewingQuarter={viewingQuarter}
        availableResultQuarters={availableResultQuarters}
      />

      <CurrentQuarter
        quarter={quarter}
        season={season}
        completed={completed}
        viewingQuarter={viewingQuarter}
      />
    </nav>
  );
}

function GameIdentity({ asHeading }: { asHeading: boolean }) {
  const Component = asHeading ? "h1" : "div";

  return (
    <Component className="min-w-fit font-serif text-2xl font-bold tracking-wide text-foreground sm:text-3xl md:text-4xl">
      KISSATEN <span className="bg-primary/20 px-1 text-primary">TYCOON</span>
    </Component>
  );
}

type QuartersProps = {
  currentQuarter: number;
  totalQuarters: number;
  completed: boolean;
  viewingQuarter?: number;
  availableResultQuarters: readonly number[];
};

function Quarters({
  currentQuarter,
  totalQuarters,
  completed,
  viewingQuarter,
  availableResultQuarters,
}: QuartersProps) {
  const quarters = Array.from(
    { length: totalQuarters },
    (_, index) => index + 1,
  );

  const availableResults = new Set(availableResultQuarters);

  return (
    <ul
      className="hidden items-center gap-2 xl:flex"
      aria-label="Quarter progress"
    >
      {quarters.map((quarter) => {
        const isCommitted = completed || availableResults.has(quarter);

        const isCurrent = !completed && quarter === currentQuarter;

        const isViewing = quarter === viewingQuarter;

        const href = isCurrent
          ? "/game"
          : isCommitted
            ? quarter === totalQuarters
              ? "/game/results/final"
              : `/game/results?quarter=${quarter}`
            : null;

        const className = [
          "flex size-8 items-center justify-center rounded-full border text-sm font-semibold outline-none transition-colors",
          "focus-visible:ring-3 focus-visible:ring-ring/30",
          isCommitted && "border-foreground bg-foreground text-background",
          isCurrent &&
            "border-primary bg-background text-primary ring-2 ring-primary/20",
          isViewing &&
            "ring-2 ring-primary ring-offset-2 ring-offset-background",
          !isCommitted &&
            !isCurrent &&
            "border-border bg-background text-muted-foreground opacity-60",
          href && "cursor-pointer hover:border-primary",
        ]
          .filter(Boolean)
          .join(" ");

        return (
          <li key={quarter}>
            {href ? (
              <Link
                href={href}
                className={className}
                aria-label={
                  isCurrent
                    ? `Return to Quarter ${quarter} decisions`
                    : `View Quarter ${quarter} results`
                }
                aria-current={
                  isViewing ? "page" : isCurrent ? "step" : undefined
                }
              >
                {quarter}
              </Link>
            ) : (
              <span
                className={className}
                aria-label={`Quarter ${quarter} is not available yet`}
                aria-disabled="true"
              >
                {quarter}
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}

function CurrentQuarter({
  quarter,
  season,
  completed,
  viewingQuarter,
}: {
  quarter: number;
  season?: string;
  completed: boolean;
  viewingQuarter?: number;
}) {
  const viewingHistoricalResult =
    viewingQuarter !== undefined && viewingQuarter !== quarter;
  const quarterStatus = completed
    ? "Game Completed"
    : season
      ? formatQuarterSeason(quarter, season)
      : `Q${quarter}`;

  return (
    <div className="hidden min-w-fit text-right lg:block">
      <p className="font-serif text-lg font-semibold text-muted-foreground">
        { quarterStatus}
        {" — Shimokitazawa, Tokyo"}
      </p>

      {viewingHistoricalResult ? (
        <p className="mt-1 font-mono text-xs text-primary">
          Viewing Q{viewingQuarter} result
        </p>
      ) : null}
    </div>
  );
}
