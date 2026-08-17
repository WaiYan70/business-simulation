import FinalResultScreen from "@/features/game-session/components/final-results/FinalResultScreen";
import { parseProfessorState } from "@/features/game-session/lib/professor-state";

type FinalResultsPageProps = {
  searchParams: Promise<{
    professor?: string | string[];
  }>;
};

export default async function FinalResultsPage({
  searchParams,
}: FinalResultsPageProps) {
  const params = await searchParams;

  return (
    <FinalResultScreen
      professorState={parseProfessorState(params.professor)}
    />
  );
}
