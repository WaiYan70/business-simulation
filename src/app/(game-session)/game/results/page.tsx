import QuarterResultScreen from "@/features/game-session/components/quarter-results/QuarterResultScreen";
import { parseProfessorState } from "@/features/game-session/lib/professor-state";

type ResultsPageProps = {
  searchParams: Promise<{
    quarter?: string | string[];
    professor?: string | string[];
  }>;
};

export default async function ResultsPage({ searchParams }: ResultsPageProps) {
  const params = await searchParams;

  return (
    <QuarterResultScreen
      requestedQuarter={
        typeof params.quarter === "string" ? params.quarter : undefined
      }
      professorState={parseProfessorState(params.professor)}
    />
  );
}
