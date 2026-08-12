import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { QuarterScenario } from "@/simulation/GameSession";

type EventsProps = {
  scenario: QuarterScenario;
};

export default function Events({ scenario }: EventsProps) {
  return (
    <section className="space-y-5">
      <div className="rounded-lg border-l-4 border-primary bg-primary/10 p-5">
        <p className="font-mono text-xs font-bold uppercase tracking-[0.24em] text-primary">
          Market event &middot; Q{scenario.quarter}
        </p>
        <h2 className="mt-3 font-serif text-3xl font-bold leading-tight text-foreground">
          {scenario.event.title}
        </h2>
        <p className="mt-2 text-base font-medium text-muted-foreground">
          {scenario.event.summary}
        </p>
      </div>

      <Card className="rounded-xl border border-border bg-card shadow-none">
        <CardContent>
          <div className="flex gap-4">
            <Avatar className="size-14 rounded-xl bg-primary text-primary-foreground">
              <AvatarFallback className="rounded-xl bg-primary font-serif text-2xl font-bold text-primary-foreground">
                M
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <h3 className="text-base font-bold text-foreground">
                  Marudori Coffee
                </h3>
                <Badge variant="secondary" className="font-mono">
                  price: &yen;490 (-&yen;30)
                </Badge>
              </div>
              <p className="mt-2 font-serif text-xl leading-relaxed text-foreground">
                &ldquo;Even in hard times, honest coffee at an honest price. Our
                point-card campaign continues all summer.&rdquo;
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
