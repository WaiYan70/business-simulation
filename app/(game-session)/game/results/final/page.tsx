import FinalResultScreen from "@/components/game/final-results/FinalResultScreen";
import { ProfessorState } from "@/components/game/session/GameSession";

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
