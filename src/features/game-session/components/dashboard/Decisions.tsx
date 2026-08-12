import { Dot, Minus, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import QuarterCommit from "./QuarterCommit";
import { useGameSessionStore } from "../../stores/game-session-store";
import { type BigMove, type BigMoveChoice, formatYen } from "@/simulation/GameSession";

const bigMoveOptions: Array<{
  value: BigMoveChoice;
  label: string;
  cost: string;
}> = [
  {
    value: "staff-training",
    label: "Staff training",
    cost: "¥800,000",
  },
  {
    value: "loyalty-program",
    label: "Loyalty program",
    cost: "¥1,500,000",
  },
  {
    value: "renovate",
    label: "Renovate",
    cost: "¥2,000,000",
  },
  {
    value: "none",
    label: "None",
    cost: "Hold cash",
  },
];

export default function Decisions() {
  const session = useGameSessionStore((state) => state.session);
  const updateDecision = useGameSessionStore((state) => state.updateDecision);
  const persistenceError = useGameSessionStore(
    (state) => state.persistenceError,
  );

  if (!session || session.status !== "active") return null;

  const decision = session.draftDecision;

  const displayedBigMoves: BigMoveChoice[] =
    decision.bigMoves.length > 0 ? decision.bigMoves : ["none"];

  function handleBigMoveChange(values: string[]) {
    const nextValues = values as BigMoveChoice[];
    const previousValues = displayedBigMoves;

    const newlySelected = nextValues.find(
      (value) => !previousValues.includes(value),
    );

    if (newlySelected === "none") {
      updateDecision({ bigMoves: [] });
      return;
    }

    const selectedMoves = nextValues.filter(
      (value): value is BigMove => value !== "none",
    );

    updateDecision({
      bigMoves: selectedMoves,
    });
  }

  return (
    <Card className="h-fit rounded-xl border border-border bg-card shadow-none">
      <CardContent className="space-y-5">
        <h2 className="font-mono text-xs font-bold uppercase tracking-[0.24em] text-muted-foreground">
          Q{session.currentQuarter} Decisions
        </h2>

        <DecisionSection
          label="1 Price per cup"
          value={formatYen(decision.price)}
        >
          <Slider
            value={[decision.price]}
            min={400}
            max={800}
            step={10}
            aria-label="Price per cup"
            onValueChange={(value) => {
              updateDecision({
                price: typeof value === "number" ? value : value[0],
              });
            }}
          />
          <p className="flex items-center whitespace-nowrap font-mono text-xs text-muted-foreground">
            <span>margin ¥212/cup</span> <Dot />
            <span className="text-primary">¥70 above Marudori</span>
          </p>
        </DecisionSection>

        <DecisionSection
          label="2 Marketing"
          value={formatYen(decision.marketing)}
        >
          <Slider
            value={[decision.marketing]}
            min={0}
            max={1_500_000}
            step={50_000}
            aria-label="Marketing budget"
            onValueChange={(value) => {
              updateDecision({
                marketing: typeof value === "number" ? value : value[0],
              });
            }}
          />
          <p className="font-mono text-xs text-muted-foreground">
            est. reach factor x1.19 (diminishing above ¥1.2M)
          </p>
        </DecisionSection>

        <DecisionSection label="3 Staff" value={`${decision.staff} staff`}>
          <div className="flex items-center gap-4">
            <Button
              type="button"
              variant="outline"
              size="icon"
              disabled={decision.staff <= 2}
              aria-label="Decrease staff"
              onClick={() => updateDecision({ staff: decision.staff - 1 })}
            >
              <Minus />
            </Button>
            <p className="font-mono text-xl font-bold text-foreground">
              {decision.staff} staff
            </p>
            <Button
              type="button"
              variant="outline"
              size="icon"
              disabled={decision.staff >= 8}
              aria-label="Increase staff"
              onClick={() => updateDecision({ staff: decision.staff + 1 })}
            >
              <Plus />
            </Button>
          </div>
          <p className="flex items-center whitespace-nowrap font-mono text-xs text-muted-foreground">
            <span>capacity 5,600 cups</span> <Dot />
            <span className="text-primary">
              morale low - consider wage bump
            </span>
          </p>
        </DecisionSection>

        <DecisionSection
          label="4 Big moves"
          value={
            decision.bigMoves.length === 0
              ? "None"
              : `${decision.bigMoves.length} selected`
          }
        >
          <ToggleGroup
            multiple
            value={displayedBigMoves}
            className="grid w-full grid-cols-2 gap-2"
            aria-label="Big moves"
            onValueChange={handleBigMoveChange}
          >
            {bigMoveOptions.map((option) => (
              <ToggleGroupItem
                key={option.value}
                value={option.value}
                className="h-16 w-full items-start rounded-lg border border-border p-3 text-left data-[state=on]:border-primary data-[state=on]:bg-primary/10"
              >
                <span className="flex flex-col items-start">
                  <span className="font-semibold">{option.label}</span>

                  <span className="font-mono text-xs text-muted-foreground">
                    {option.cost}
                  </span>
                </span>
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </DecisionSection>

        {persistenceError ? (
          <p
            className="rounded-lg border border-destructive/40 bg-destructive/5 p-3 text-sm text-destructive"
            role="alert"
          >
            {persistenceError}
          </p>
        ) : null}

        <QuarterCommit quarter={session.currentQuarter} />
      </CardContent>
    </Card>
  );
}

function DecisionSection({
  label,
  value,
  children,
}: {
  label: string;
  value?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between gap-4">
        <Label className="text-base font-bold">{label}</Label>
        {value ? (
          <span className="font-mono font-bold text-primary">{value}</span>
        ) : null}
      </div>
      {children}
      <Separator className="border-t border-dashed border-border bg-transparent" />
    </section>
  );
}
