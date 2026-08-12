import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="flex flex-1 items-center">
      <section className="mx-auto w-full max-w-6xl px-6 py-20">
        <h1 className="font-mono text-sm uppercase tracking-wider text-primary">Cafe Business Simulation Game</h1>
        <h2 className="mt-4 max-w-4xl font-serif text-5xl font-bold">Can you build a neighborhood cafe that lasts</h2>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          Manage Pricing, staffing, marketing, and quality across eight
          quarters. Every Result comes from transparent business rules.
        </p>
        <Link href="/play" className="mt-8 inline-flex rounded-md bg-primary px-5 py-3 font-semibold text-primary-foreground">Play One Game Free</Link>
      </section>
    </main>
  );
}
