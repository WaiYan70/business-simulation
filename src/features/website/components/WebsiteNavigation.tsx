import Link from "next/link";

const navigationItems = [
  { href: "/play", label: "Play" },
  { href: "/history", label: "History" },
  { href: "/setting", label: "Setting" },
] as const;

export default function WebsiteNavigation() {
  return (
    <header className="border-b border-border">
      <nav
        aria-label="Website navigation"
        className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6 py-4"
      >
        <Link
          href="/"
          className="font-serif text-xl font-bold tracking-wide text-foreground"
        >
          KISSATEN
          <span className="bg-primary/20 px-1 text-primary">TYCOON</span>
        </Link>
        <ul className="flex items-center gap-4">
          {navigationItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
