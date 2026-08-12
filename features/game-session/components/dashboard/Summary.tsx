import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatYen, QuarterRecord } from "@/simulation/GameSession";

type SummaryProps = {
  record?: QuarterRecord;
};

export default function Summary({ record }: SummaryProps) {
  const title = record
    ? `Professor's debrief - Q${record.quarter}`
    : "The opening ledger";

  const summary = record
    ? `${record.outcome.headline}. The quarter produced ${formatYen(record.outcome.profit)} in profit with ${record.outcome.lostSales.toLocaleString()} lost sales.`
    : "Set the opening price, marketing budget, staffing, and major investment before committing Quarter 1.";

  const question = record
    ? record.outcome.eventEffect
    : "What position do you want the shop to establish in its opening quarter?";

  return (
    <Card className="rounded-xl border border-border bg-secondary/30 shadow-none">
      <CardContent className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="font-serif text-2xl font-bold text-foreground">
            {title}
          </h2>
          <Badge className="font-mono uppercase tracking-[0.18em]">
            Hedging
          </Badge>
          <Badge className="font-mono uppercase tracking-[0.18em]">
            Working capital
          </Badge>
        </div>

        <p className="max-w-4xl text-lg leading-8 text-foreground">{summary}</p>

        <Separator className="border-t border-dashed border-border bg-transparent" />

        <p className="max-w-4xl font-serif text-xl italic leading-8 text-primary">
          {question}
        </p>
      </CardContent>
    </Card>
  );
}
