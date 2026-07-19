"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { BookOpenText, CircleAlert, RotateCcw } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export type FinalProfessorState =
  | "loading"
  | "slow"
  | "ready"
  | "error"
  | "fallback";

type FinalProfessorReviewProps = {
  initialState?: Exclude<FinalProfessorState, "ready">;
};

const finalReview = {
  headline: "You protected margin, but asked too much of the team",
  summary:
    "You finished with healthy cash and cumulative profit. Demand grew across the run and margin held, but staff morale shows the cost of carrying more pressure than the operation could comfortably support.",
  insights: [
    "Margin discipline produced ¥3,240,000 in cumulative profit on ¥17,820,000 of revenue.",
    "Loyalty reached 923 and reputation 71 as customers responded to stronger quality and consistency.",
    "Staff morale fell from 72 to 48, the clearest constraint carried into the final quarter.",
  ],
  concepts: ["Operating leverage", "Capacity constraint"],
  question:
    "What would change if you invested in capacity before buying more demand?",
} as const;

export default function FinalProfessorReview({
  initialState = "loading",
}: FinalProfessorReviewProps) {
  const [status, setStatus] = useState<FinalProfessorState>(initialState);
  const requestTimer = useRef<number | null>(null);
  const slowTimer = useRef<number | null>(null);
  const fallbackTimer = useRef<number | null>(null);

  const clearTimers = useCallback(() => {
    [requestTimer.current, slowTimer.current, fallbackTimer.current].forEach(
      (timer) => {
        if (timer) window.clearTimeout(timer);
      },
    );
  }, []);

  const retry = useCallback(() => {
    clearTimers();
    setStatus("loading");
    slowTimer.current = window.setTimeout(() => setStatus("slow"), 10000);
    fallbackTimer.current = window.setTimeout(() => setStatus("fallback"), 15000);
    requestTimer.current = window.setTimeout(() => {
      setStatus("ready");
      clearTimers();
    }, 1400);
  }, [clearTimers]);

  useEffect(() => {
    if (initialState !== "loading") return clearTimers;

    slowTimer.current = window.setTimeout(() => setStatus("slow"), 10000);
    fallbackTimer.current = window.setTimeout(() => setStatus("fallback"), 15000);
    requestTimer.current = window.setTimeout(() => {
      setStatus("ready");
      clearTimers();
    }, 1400);

    return clearTimers;
  }, [clearTimers, initialState]);

  return (
    <aside
      className="h-fit rounded-xl border border-primary/30 bg-secondary/30 p-5 lg:sticky lg:top-5 xl:p-6"
      aria-labelledby="final-professor-heading"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-foreground text-background">
            <BookOpenText className="size-5" aria-hidden="true" />
          </span>
          <div>
            <h2
              id="final-professor-heading"
              className="font-serif text-2xl font-bold leading-tight"
            >
              Professor&apos;s final review
            </h2>
            <p className="mt-1 font-mono text-xs text-muted-foreground">
              Eight-quarter review
            </p>
          </div>
        </div>
        {status === "ready" ? <Badge>Ready</Badge> : null}
        {status === "fallback" ? (
          <Badge variant="secondary">Fallback</Badge>
        ) : null}
      </div>

      <div
        className="mt-7"
        aria-live="polite"
        aria-busy={status === "loading" || status === "slow"}
      >
        {status === "loading" || status === "slow" ? (
          <div className="space-y-5">
            <div className="space-y-3" aria-hidden="true">
              <div className="h-6 w-4/5 animate-pulse rounded-sm bg-muted motion-reduce:animate-none" />
              <div className="h-4 w-full animate-pulse rounded-sm bg-muted motion-reduce:animate-none" />
              <div className="h-4 w-11/12 animate-pulse rounded-sm bg-muted motion-reduce:animate-none" />
              <div className="h-4 w-3/4 animate-pulse rounded-sm bg-muted motion-reduce:animate-none" />
            </div>
            <p className="text-sm leading-6 text-muted-foreground">
              {status === "slow"
                ? "The Professor is taking longer than usual. Your final ledger and report actions remain available."
                : "The Professor is reviewing the completed ledger..."}
            </p>
          </div>
        ) : null}

        {status === "ready" ? (
          <div className="space-y-6">
            <div>
              <h3 className="text-wrap-balance font-serif text-2xl font-bold leading-tight">
                {finalReview.headline}
              </h3>
              <p className="mt-4 max-w-[65ch] leading-7">
                {finalReview.summary}
              </p>
            </div>

            <Separator className="border-t border-dashed border-border bg-transparent" />

            <ul className="space-y-4" aria-label="Professor's strategic insights">
              {finalReview.insights.map((insight) => (
                <li key={insight} className="flex gap-3 text-sm leading-6">
                  <span
                    className="mt-2 size-1.5 shrink-0 rounded-full bg-primary"
                    aria-hidden="true"
                  />
                  <span>{insight}</span>
                </li>
              ))}
            </ul>

            <Separator className="border-t border-dashed border-border bg-transparent" />

            <div>
              <div className="flex flex-wrap gap-2">
                {finalReview.concepts.map((concept) => (
                  <Badge key={concept} variant="outline" className="font-mono text-primary">
                    {concept}
                  </Badge>
                ))}
              </div>
              <p className="mt-4 font-serif text-xl italic leading-8 text-primary">
                {finalReview.question}
              </p>
            </div>
          </div>
        ) : null}

        {status === "error" ? (
          <div role="alert">
            <div className="flex gap-3 text-destructive">
              <CircleAlert className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
              <div>
                <h3 className="font-bold">Final review could not be loaded</h3>
                <p className="mt-1 text-sm leading-6">
                  Your completed game and final ledger are saved. You can play
                  again, view history, or retry the Professor independently.
                </p>
              </div>
            </div>
            <Button variant="outline" className="mt-4 h-11" onClick={retry}>
              <RotateCcw data-icon="inline-start" aria-hidden="true" />
              Retry final review
            </Button>
          </div>
        ) : null}

        {status === "fallback" ? (
          <div className="space-y-5">
            <div>
              <h3 className="font-serif text-2xl font-bold leading-tight">
                A profitable run with an operational constraint
              </h3>
              <p className="mt-4 leading-7">
                The business finished with ¥8,460,000 cash and ¥3,240,000 in
                cumulative profit. Loyalty and reputation improved, while staff
                morale declined from 72 to 48.
              </p>
            </div>
            <p className="font-serif text-xl italic leading-8 text-primary">
              Consider testing whether earlier capacity investment protects both
              service quality and the team during periods of stronger demand.
            </p>
          </div>
        ) : null}
      </div>
    </aside>
  );
}
