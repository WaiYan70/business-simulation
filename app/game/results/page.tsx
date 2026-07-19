import Navbar from "@/components/layout/Navbar";
import QuarterResults from "@/components/game/QuarterResults";
import { redirect } from "next/navigation";

type ResultsPageProps = {
  searchParams: Promise<{
    quarter?: string;
    professor?: "loading" | "slow" | "error" | "fallback";
  }>;
};

export default async function ResultsPage({ searchParams }: ResultsPageProps) {
  const params = await searchParams;
  const parsedQuarter = Number.parseInt(params.quarter ?? "3", 10);
  const quarter = Number.isFinite(parsedQuarter)
    ? Math.min(Math.max(parsedQuarter, 1), 8)
    : 3;

  if (quarter === 8) {
    const professor = params.professor ?? "loading";
    redirect(`/game/results/final?professor=${professor}`);
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar quarter={quarter} totalQuarters={8} brandAsHeading={false} />
      <QuarterResults
        quarter={quarter}
        professorState={params.professor ?? "loading"}
      />
    </div>
  );
}
