import Link from "next/link";

export default function MarketingHeader() {
  return (
    <header className="border-b border-border">
      <nav aria-label="Marketing Navigation" className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-serif text-xl font-bold tracking-wide text-foreground"
        >
          KISSATEN{" "}
          <span className="bg-primary/20 px-1 text-primary">TYCOON</span>
        </Link>
        <Link
          href="/play"
          className="inline-flex rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
        >
          Play free
        </Link>
      </nav>
    </header>
  );
}
