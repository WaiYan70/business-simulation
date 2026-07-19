import { Dot, Minus, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export default function Decisions() {
  return (
    <Card className="h-fit rounded-xl border border-border bg-card shadow-none">
      <CardContent className="space-y-5">
        <h2 className="font-mono text-xs font-bold uppercase tracking-[0.24em] text-muted-foreground">
          Q3 Decisions
        </h2>

        <DecisionSection label="1 Price per cup" value="¥560">
          <Slider defaultValue={[70]} max={100} step={1} aria-label="Price per cup" />
          <p className="font-mono text-xs text-muted-foreground">
            margin ¥212/cup &middot;{" "}
            <span className="text-primary">¥70 above Marudori</span>
          </p>
        </DecisionSection>

        <DecisionSection label="2 Marketing" value="¥800,000">
          <Slider defaultValue={[42]} max={100} step={1} aria-label="Marketing" />
          <p className="font-mono text-xs text-muted-foreground">
            est. reach factor x1.19 (diminishing above ¥1.2M)
          </p>
        </DecisionSection>

        <DecisionSection label="3 Staff" value="4 x ¥900k">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" aria-label="Decrease staff">
              <Minus />
            </Button>
            <p className="font-mono text-xl font-bold text-foreground">4 staff</p>
            <Button variant="outline" size="icon" aria-label="Increase staff">
              <Plus />
            </Button>
          </div>
          <p className="flex items-center whitespace-nowrap font-mono text-xs text-muted-foreground">
            <span>capacity 5,600 cups</span> <Dot />
            <span className="text-primary">morale low - consider wage bump</span>
          </p>
        </DecisionSection>

        <DecisionSection label="4 Big move" value="one or none">
          <ToggleGroup
            defaultValue={["loyalty"]}
            className="grid w-full grid-cols-2 gap-2"
            aria-label="Big move"
          >
            {[
              ["location", "2nd location", "\u00a58,000,000"],
              ["loyalty", "Loyalty program", "\u00a51,500,000"],
              ["renovate", "Renovate", "\u00a52,000,000"],
              ["none", "None", "hold cash"],
            ].map(([value, label, cost]) => (
              <ToggleGroupItem
                key={value}
                value={value}
                className="h-16 w-full items-start rounded-lg border border-border p-3 text-left data-[state=on]:border-primary data-[state=on]:bg-primary/10"
              >
                <span className="flex flex-col items-start">
                  <span className="font-semibold">{label}</span>
                  <span className="font-mono text-xs text-muted-foreground">
                    {cost}
                  </span>
                </span>
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </DecisionSection>

        <div className="flex items-center gap-5 pt-4">
          <Button className="size-20 rounded-full border-4 border-primary/20 text-base font-bold">
            Stamp Q3
          </Button>
          <div>
            <p className="font-serif text-2xl font-bold text-foreground">
              Commit Quarter
            </p>
            <p className="text-sm text-muted-foreground">
              Decisions are final once stamped
            </p>
          </div>
        </div>
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
        <Label className="text-base font-bold text-foreground">{label}</Label>
        {value ? (
          <span
            className="font-mono text-base font-bold text-primary"
          >
            {value}
          </span>

        ) : null}
      </div>
      {children}
      <Separator className="border-t border-dashed border-border bg-transparent" />
    </section>
  );
}
