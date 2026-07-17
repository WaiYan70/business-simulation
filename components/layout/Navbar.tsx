export default function Navbar() {
  return (
    <nav className="mx-auto flex w-full max-w-[1600px] items-center justify-between gap-6 border-b-2 border-foreground px-6 py-4">
      <NavbarHeader />
      <Quarters />
      <CurrentQuarter />
    </nav>
  );
}

function NavbarHeader() {
  return (
    <h1 className="min-w-fit font-serif text-3xl font-bold tracking-wide text-foreground md:text-4xl">
      KISSATEN{" "}
      <span className="bg-primary/20 px-1 text-primary">TYCOON</span>
    </h1>
  );
}

function Quarters() {
  const quarters = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <ul className="hidden items-center gap-2 lg:flex" aria-label="Quarter progress">
      {quarters.map((quarter) => {
        const isPast = quarter < 3;
        const isCurrent = quarter === 3;

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

function CurrentQuarter() {
  return (
    <p className="hidden min-w-fit text-right font-serif text-lg font-semibold text-muted-foreground md:block">
      Q3 &middot; Summer &mdash; Shimokitazawa, Tokyo
    </p>
  );
}
