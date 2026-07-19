"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { BookOpenText, CircleAlert, RotateCcw } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

type ProfessorStatus = "loading" | "slow" | "ready" | "error" | "fallback";

type ProfessorDebriefProps = {
  quarter: number;
  initialState?: Extract<
    ProfessorStatus,
    "loading" | "slow" | "error" | "fallback"
  >;
};

const debrief = {
  headline: "Margin improved, but the team absorbed the strain",
  summary:
    "Your revenue covered the quarter's costs and protected cash. Demand remained healthy, but morale at 48 shows that current staffing is carrying more pressure than the financial statement reveals.",
  causes: [
    "Sales revenue reached ¥2,000,000 while total cost of goods sold stayed at ¥200,000.",
    "Gross profit reached ¥893,000 before operating expense and debt obligations.",
    "Loyal customers held at 923, while staff morale remained the clearest operational risk.",
  ],
  concept: "Operating leverage",
  question:
    "How much of next quarter's cash should protect staff capacity before you invest in more demand?",
} as const;

export default function ProfessorDebrief({
  quarter,
  initialState = "loading",
}: ProfessorDebriefProps) {
  const [status, setStatus] = useState<ProfessorStatus>(initialState);
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

  const loadProfessor = useCallback(() => {
    clearTimers();
    setStatus("loading");

    slowTimer.current = window.setTimeout(() => setStatus("slow"), 10000);
    fallbackTimer.current = window.setTimeout(() => setStatus("fallback"), 15000);

    // Static vertical slice: replace this timer with the Professor request.
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
      className="h-fit rounded-xl border border-border bg-secondary/30 p-5 lg:sticky lg:top-5"
      aria-labelledby="professor-heading"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-foreground text-background">
            <BookOpenText className="size-5" aria-hidden="true" />
          </span>
          <div>
            <h2 id="professor-heading" className="font-serif text-2xl font-bold">
              Professor&apos;s debrief
            </h2>
            <p className="font-mono text-xs text-muted-foreground">Quarter {quarter}</p>
          </div>
        </div>
        {status === "ready" ? <Badge>Ready</Badge> : null}
        {status === "fallback" ? <Badge variant="secondary">Fallback</Badge> : null}
      </div>

      <div className="mt-6" aria-live="polite" aria-busy={status === "loading" || status === "slow"}>
        {status === "loading" || status === "slow" ? (
          <div className="space-y-4">
            <div className="space-y-2" aria-hidden="true">
              <div className="h-5 w-4/5 animate-pulse rounded-sm bg-muted motion-reduce:animate-none" />
              <div className="h-4 w-full animate-pulse rounded-sm bg-muted motion-reduce:animate-none" />
              <div className="h-4 w-11/12 animate-pulse rounded-sm bg-muted motion-reduce:animate-none" />
            </div>
            <p className="text-sm text-muted-foreground">
              {status === "slow"
                ? "The Professor is taking longer than usual. You can continue without waiting."
                : "The Professor is reviewing the committed ledger..."}
            </p>
          </div>
        ) : null}

        {status === "ready" ? (
          <div className="space-y-5">
            <div>
              <h3 className="font-serif text-xl font-bold leading-snug">
                {debrief.headline}
              </h3>
              <p className="mt-3 max-w-[65ch] leading-7 text-foreground">
                {debrief.summary}
              </p>
            </div>

            <ul className="space-y-3" aria-label="Factors behind this quarter's result">
              {debrief.causes.map((cause) => (
                <li key={cause} className="flex gap-3 text-sm leading-6">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                  <span>{cause}</span>
                </li>
              ))}
            </ul>

            <Separator className="border-t border-dashed border-border bg-transparent" />

            <div>
              <Badge variant="secondary" className="font-mono">
                {debrief.concept}
              </Badge>
              <p className="mt-3 font-serif text-lg italic leading-7 text-primary">
                {debrief.question}
              </p>
            </div>
          </div>
        ) : null}

        {status === "error" ? (
          <div role="alert">
            <div className="flex gap-3 text-destructive">
              <CircleAlert className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
              <div>
                <h3 className="font-bold">Commentary could not be loaded</h3>
                <p className="mt-1 text-sm leading-6">
                  Your quarter result is committed and safe. You can continue or
                  retry the explanation.
                </p>
              </div>
            </div>
            <Button variant="outline" className="mt-4 h-11" onClick={loadProfessor}>
              <RotateCcw data-icon="inline-start" aria-hidden="true" />
              Retry commentary
            </Button>
          </div>
        ) : null}

        {status === "fallback" ? (
          <div className="space-y-4">
            <p className="leading-7">
              Quarter {quarter} closed with net profit of ¥620,000. Sales revenue
              was the main positive factor. Staff morale at 48 remains the main
              operational risk to review before the next decision.
            </p>
            <p className="font-serif text-lg italic leading-7 text-primary">
              Consider whether protecting capacity and morale will produce a
              stronger next quarter than adding more demand.
            </p>
          </div>
        ) : null}
      </div>
    </aside>
  );
}
