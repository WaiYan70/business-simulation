import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function Summary() {
  return (
    <Card className="rounded-xl border border-border bg-secondary/30 shadow-none">
      <CardContent className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="font-serif text-2xl font-bold text-foreground">
            Professor&apos;s debrief &mdash; Q2
          </h2>
          <Badge className="font-mono uppercase tracking-[0.18em]">
            Hedging
          </Badge>
          <Badge className="font-mono uppercase tracking-[0.18em]">
            Working capital
          </Badge>
        </div>

        <p className="max-w-4xl text-lg leading-8 text-foreground">
          Your forward contract locked beans at &yen;1,840/kg just before the
          frost. Marudori is now paying spot &mdash; their cost per cup rose
          &yen;22, yours didn&apos;t move. That is what a hedge buys: not
          profit, but certainty when the world turns. Note, however, your morale
          slipped to 48 &mdash; two quarters of overtime are catching up with
          the team.
        </p>

        <Separator className="border-t border-dashed border-border bg-transparent" />

        <p className="max-w-4xl font-serif text-xl italic leading-8 text-primary">
          Marudori just cut prices while their costs rose. What does that tell
          you about how much pain they can absorb &mdash; and for how long?
        </p>
      </CardContent>
    </Card>
  );
}
