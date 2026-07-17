import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function States() {
  const stats = [
    ["Net profit (Q2)", "&yen;620,000"],
    ["Loyal customers", "923 ▲"],
    ["Reputation", "61 / 100"],
    ["Staff morale", "48 / 100"],
  ];

  return (
    <Card className="h-fit rounded-xl border border-border bg-card shadow-none">
      <CardContent className="space-y-6">
        <section>
          <p className="font-mono text-xs font-bold uppercase tracking-[0.24em] text-muted-foreground">
            Cash on hand
          </p>
          <p className="mt-5 font-mono text-5xl font-bold tracking-tight text-primary">
            &yen;5,840,000
          </p>
          <p className="mt-1 font-mono text-sm font-semibold text-primary">
            ▲ +&yen;620,000 last quarter
          </p>
        </section>

        <section className="space-y-3">
          {stats.map(([label, value]) => (
            <div key={label}>
              <div className="flex items-center justify-between gap-4 text-base">
                <span className="text-muted-foreground">{label}</span>
                <span
                  className="font-mono font-bold text-foreground"
                  dangerouslySetInnerHTML={{ __html: value }}
                />
              </div>
              <Separator className="mt-3 border-t border-dashed border-border bg-transparent" />
            </div>
          ))}
        </section>

        <section className="space-y-4">
          <div className="h-14">
            <svg
              viewBox="0 0 320 64"
              role="img"
              aria-label="Staff morale trend"
              className="h-full w-full text-primary"
            >
              <polyline
                points="0,45 55,42 110,46 165,36 220,33 275,28 320,25"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              />
            </svg>
          </div>

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
