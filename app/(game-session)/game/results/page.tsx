import QuarterResultScreen from "@/features/game-session/components/quarter-results/QuarterResultScreen";
import { ProfessorState } from "@/simulation/GameSession";

type ResultsPageProps = {
  searchParams: Promise<{
    quarter?: string;
    professor?: ProfessorState;
  }>;
};

export default async function ResultsPage({ searchParams }: ResultsPageProps) {
  const params = await searchParams;

  return (
    <QuarterResultScreen
      requestedQuarter={params.quarter}
      professorState={params.professor ?? "loading"}
    />
  );
}
