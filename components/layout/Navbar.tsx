type NavbarProps = {
  quarter?: number;
  totalQuarters?: number;
  brandAsHeading?: boolean;
};

export default function Navbar({
  quarter = 3,
  totalQuarters = 8,
  brandAsHeading = true,
}: NavbarProps) {
  return (
    <nav
      className="mx-auto flex w-full max-w-[1600px] items-center justify-between gap-6 border-b-2 border-foreground px-6 py-4"
      aria-label="Game status"
    >
      <NavbarHeader asHeading={brandAsHeading} />
      <Quarters currentQuarter={quarter} totalQuarters={totalQuarters} />
      <CurrentQuarter quarter={quarter} />
    </nav>
  );
}

function NavbarHeader({ asHeading }: { asHeading: boolean }) {
  const Component = asHeading ? "h1" : "div";

  return (
    <Component className="min-w-fit font-serif text-2xl font-bold tracking-wide text-foreground sm:text-3xl md:text-4xl">
      KISSATEN{" "}
      <span className="bg-primary/20 px-1 text-primary">TYCOON</span>
    </Component>
  );
}

function Quarters({
  currentQuarter,
  totalQuarters,
}: {
  currentQuarter: number;
  totalQuarters: number;
}) {
  const quarters = Array.from({ length: totalQuarters }, (_, index) => index + 1);

  return (
    <ul className="hidden items-center gap-2 xl:flex" aria-label="Quarter progress">
      {quarters.map((quarter) => {
        const isPast = quarter < currentQuarter;
        const isCurrent = quarter === currentQuarter;

        return (
          <li
            key={quarter}
            className={[
              "flex size-8 items-center justify-center rounded-full border text-sm font-semibold",
              isPast && "border-foreground bg-foreground text-background",
              isCurrent && "border-primary bg-background text-primary ring-2 ring-primary/20",
              !isPast &&
                !isCurrent &&
                "border-border bg-background text-muted-foreground",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {quarter}
          </li>
        );
      })}
    </ul>
  );
}

function CurrentQuarter({ quarter }: { quarter: number }) {
  return (
    <p className="hidden min-w-fit text-right font-serif text-lg font-semibold text-muted-foreground lg:block">
      Q{quarter} &middot; Summer &mdash; Shimokitazawa, Tokyo
    </p>
  );
}
