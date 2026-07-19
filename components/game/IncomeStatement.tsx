import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const incomeStatementStats = [
  ["Sale Revenue", "¥2,000,000"],
  ["Total Cost of Good Sold", "¥200,000"],
  ["Gross Profit", "¥893,000"],
  ["Expense", "¥418,000"],
  ["Debt", "¥198,000"],
] as const;

export default function IncomeStatement() {
  return (
    <section>
      <Card className="h-fit rounded-xl border border-border bg-card shadow-none">
        <CardContent className="space-y-6">
          <h2 className="font-mono text-xs font-bold uppercase tracking-[0.24em] text-muted-foreground">
            Income Statement{" "}
          </h2>
          <div className="space-y-3">
            {incomeStatementStats.map(([label, value], index) => (
              <div key={label}>
                <div className="flex items-center justify-between gap-4 text-base">
                  <span className="text-muted-foreground">{label}</span>
                  <span className="font-mono font-bold text-foreground">
                    {value}
                  </span>
                </div>
                {index < incomeStatementStats.length - 1 && (
                  <Separator className="mt-3 border border-dashed border-border bg-transparent" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
