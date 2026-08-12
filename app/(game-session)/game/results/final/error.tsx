"use client";

import { useRouter } from "next/navigation";
import { CircleAlert, History, RotateCcw } from "lucide-react";

import GameSessionHeader from "@/components/game/shared/GameSessionHeader";
import { Button } from "@/components/ui/button";

export default function FinalResultsError({ reset }: { reset: () => void }) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <GameSessionHeader
        quarter={8}
        totalQuarters={8}
        brandAsHeading={false}
        completed
      />
      <main className="mx-auto flex w-full max-w-3xl flex-1 items-center px-4 py-16 sm:px-6">
        <section aria-labelledby="report-error-heading">
          <CircleAlert className="size-9 text-destructive" aria-hidden="true" />
          <h1 id="report-error-heading" className="mt-5 font-serif text-4xl font-bold">
            The saved report could not be opened
          </h1>
          <p className="mt-4 max-w-[65ch] leading-7 text-muted-foreground">
            Your completed game remains saved. Retry the report, or return to game
            history and open it again later.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Button className="h-11" onClick={reset}>
              <RotateCcw data-icon="inline-start" aria-hidden="true" />
              Retry report
            </Button>
            <Button variant="outline" className="h-11" onClick={() => router.push("/")}>
              <History data-icon="inline-start" aria-hidden="true" />
              View game history
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
