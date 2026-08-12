import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function Costs() {
  const stats = [
    ["Bean Cost per kg", "¥2,000"],
    ["Coffee Bean per cup", "5g"],
    ["Other Material Cost", "¥60"],
    ["Rental", "¥600,000"],
  ];

  return (
    <section>
      <Card className="h-fit rounded-xl border border-border bg-card shadow-none">
        <CardContent className="space-y-6">
          <h2 className="font-mono text-xs font-bold uppercase tracking-[0.24em] text-muted-foreground">
            Material Cost
          </h2>
          <div className="space-y-3">
            {stats.map(([label, value], index) => (
              <div key={label}>
                <div className="flex items-center justify-between gap-4 text-base">
                  <span className="text-muted-foreground">{label}</span>
                  <span className="font-mono font-bold text-foreground">
                    {value}
                  </span>
                </div>
                {index < stats.length - 1 && (
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
