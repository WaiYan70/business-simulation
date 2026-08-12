import Link from "next/link";

export default function SettingPage() {
  return (
    <section>
      <h1 className="font-mono text-sm uppercase tracking-wider text-primary">Game Center</h1>
      <h2>Manage your cafe</h2>
      <p>
        {" "}
        Your current prototype game is saved in this browser. Server-backed
        guest games and accounts will be added in a later phase.
      </p>
      <Link
        href="/game"
        className="mt-8 inline-flex rounded-md bg-primary px-5 py-3 font-semibold text-primary-foreground"
      >
        Open game
      </Link>
    </section>
  );
}
