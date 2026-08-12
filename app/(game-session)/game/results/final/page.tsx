import FinalResultScreen from "@/features/game-session/components/final-results/FinalResultScreen";
import { ProfessorState } from "@/simulation/GameSession";

type FinalResultsPageProps = {
  searchParams: Promise<{
    professor?: ProfessorState;
  }>;
};

export default async function FinalResultsPage({
  searchParams,
}: FinalResultsPageProps) {
  const params = await searchParams;

  return (
    <FinalResultScreen professorState={params.professor ?? "loading"} />
  );
}
