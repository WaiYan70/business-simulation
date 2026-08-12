import QuarterResultScreen from "@/components/game/quarter-results/QuarterResultScreen";
import { ProfessorState } from "@/components/game/session/GameSession";

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
