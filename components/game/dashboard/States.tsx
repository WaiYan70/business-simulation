import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  stateSnapshot,
  stateStats,
} from "@/components/game/shared/sample-data";

export default function States() {
  return (
    <Card className="h-fit rounded-xl border border-border bg-card shadow-none">
      <CardContent className="space-y-6">
        <section>
          <p className="font-mono text-xs font-bold uppercase tracking-[0.24em] text-muted-foreground">
            Cash on hand
          </p>
          <p className="mt-5 font-mono text-5xl font-bold tracking-tight text-primary">
            {stateSnapshot.cashOnHand}
          </p>
          <p className="mt-1 font-mono text-sm font-semibold text-primary">
            ▲ {stateSnapshot.cashChange}
          </p>
        </section>

        <section className="space-y-3">
          {stateStats.map(([label, value]) => (
            <div key={label}>
              <div className="flex items-center justify-between gap-4 text-base">
                <span className="text-muted-foreground">{label}</span>
                <span
                  className="font-mono font-bold text-foreground"
                >
                  {value}
                </span>
              </div>
              <Separator className="mt-3 border-t border-dashed border-border bg-transparent" />
            </div>
          ))}
        </section>

        <section className="space-y-4">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.24em] text-muted-foreground">
              Market share
            </p>
            <div className="mt-4 h-4 overflow-hidden rounded-full bg-secondary">
              <div className="h-full w-[42%] bg-primary" />
            </div>
            <div className="mt-2 flex items-center justify-between font-mono text-xs text-muted-foreground">
              <span>You 42%</span>
              <span>Marudori 58%</span>
            </div>
          </div>
        </section>

        <section className="rounded-lg border border-border bg-secondary/40 p-4">
          <div className="flex items-center gap-4">
            <Avatar className="size-12 bg-foreground text-background">
              <AvatarFallback className="bg-foreground font-serif text-xl font-bold text-background">
                K
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="text-base text-foreground">
                <span className="font-bold">Kenji</span>
                <span className="px-1">&middot;</span>
                Head barista
              </p>
              <p className="font-mono text-sm font-semibold text-primary">
                Wants to talk
              </p>
            </div>
            <Button variant="outline" className="h-12 whitespace-normal px-4">
              Open chat
            </Button>
          </div>
        </section>
      </CardContent>
    </Card>
  );
}
