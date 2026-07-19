import FinalResults from "@/components/game/final-results/FinalResults";
import GameSessionHeader from "@/components/game/shared/GameSessionHeader";

type FinalResultsPageProps = {
  searchParams: Promise<{
    professor?: "loading" | "slow" | "error" | "fallback";
  }>;
};

export default async function FinalResultsPage({
  searchParams,
}: FinalResultsPageProps) {
  const params = await searchParams;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <GameSessionHeader
        quarter={8}
        totalQuarters={8}
        brandAsHeading={false}
        completed
      />
      <FinalResults professorState={params.professor ?? "loading"} />
    </div>
  );
}
