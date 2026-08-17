const PROFESSOR_STATES = ["loading", "slow", "error", "fallback"] as const;

export type ProfessorState = (typeof PROFESSOR_STATES)[number];

export function parseProfessorState(
  value: string | readonly string[] | undefined,
): ProfessorState {
  return typeof value === "string" &&
    PROFESSOR_STATES.includes(value as ProfessorState)
    ? (value as ProfessorState)
    : "loading";
}
