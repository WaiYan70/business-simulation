import FinalResults from "@/components/game/FinalResults";
import Navbar from "@/components/layout/Navbar";

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
      <Navbar
        quarter={8}
        totalQuarters={8}
        brandAsHeading={false}
        completed
      />
      <FinalResults professorState={params.professor ?? "loading"} />
    </div>
  );
}
