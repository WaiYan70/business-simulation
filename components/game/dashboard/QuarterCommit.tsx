"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { CircleAlert, LoaderCircle, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { TOTAL_QUARTERS } from "../session/GameSession";
import { useGameSessionStore } from "@/lib/stores/game-session-store";

type CommitStatus = "idle" | "processing" | "slow" | "error";

const wait = (duration: number) =>
  new Promise<void>((resolve) => window.setTimeout(resolve, duration));

export default function QuarterCommit({ quarter }: { quarter: number }) {
  const router = useRouter();
  const commitCurrentQuarter = useGameSessionStore(
    (state) => state.commitCurrentQuarter,
  );
  const slowTimer = useRef<number | null>(null);
  const submitting = useRef(false);
  const [status, setStatus] = useState<CommitStatus>("idle");

  const isProcessing = status === "processing" || status === "slow";

  function clearSlowTimer() {
    if (slowTimer.current !== null) {
      window.clearTimeout(slowTimer.current);
      slowTimer.current = null;
    }
  }

  useEffect(() => {
    return clearSlowTimer;
  }, []);

  async function commitQuarter() {
    if (submitting.current) return;
    submitting.current = true;
    setStatus("processing");
    slowTimer.current = window.setTimeout(() => setStatus("slow"), 2000);

    try {
      await wait(450);
      const record = commitCurrentQuarter();
      clearSlowTimer();

      router.push(
        quarter === TOTAL_QUARTERS
          ? "/game/results/final"
          : `/game/results?quarter=${record.quarter}`,
      );
    } catch {
      clearSlowTimer();
      submitting.current = false;
      setStatus("error");
    }
  }

  return (
    <section className="space-y-3 pt-4">
      <div className="flex items-center gap-5">
        <Button
          type="button"
          className="size-20 shrink-0 rounded-full border-4 border-primary/20 text-base font-bold"
          disabled={isProcessing}
          onClick={commitQuarter}
          aria-describedby="commit-quarter-note commit-quarter-status"
        >
          {isProcessing ? (
            <LoaderCircle
              className="size-6 animate-spin motion-reduce:animate-none"
              aria-hidden="true"
            />
          ) : (
            <>Stamp Q{quarter}</>
          )}
        </Button>
        <div>
          <h2
            className="font-serif text-2xl font-bold text-foreground"
          >
            Commit Quarter
          </h2>
          <p id="commit-quarter-note" className="text-sm text-muted-foreground">
            Decisions are final once stamped
          </p>
        </div>
      </div>

      <div id="commit-quarter-status" aria-live="polite">
        {status === "processing" ? (
          <p className="font-mono text-xs text-muted-foreground">
            Validating decisions and closing the ledger...
          </p>
        ) : null}

        {status === "slow" ? (
          <p className="font-mono text-xs text-muted-foreground">
            Still processing. Uour quarter has not been submitted twice.
          </p>
        ) : null}

        {status === "error" ? (
          <div
            className="rounded-lg border border-destructive/40 bg-destructive/5 p-3"
            role="alert"
          >
            <div className="flex gap-2 text-sm text-destructive">
              <CircleAlert
                className="mt-0.5 size-4 shrink-0"
                aria-hidden="true"
              />
              <p>
                We could not close the quarter. Nothing was saved, so it is safe
                to try again.
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              className="mt-3 h-11"
              onClick={commitQuarter}
            >
              <RotateCcw data-icon="inline-start" aria-hidden="true" />
              Retry commit
            </Button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
