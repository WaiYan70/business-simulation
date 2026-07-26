import { SCENARIOS } from "./sample-data-game-scenario";

export const TOTAL_QUARTERS = 8;
export const GAME_SESSION_SCHEMA_VERSION = 1;

export type ProfessorState = "loading" | "slow" | "error" | "fallback";

export type QuarterNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type GameStatus = "active" | "completed";
export type BigMove =
  | "staff-training"
  | "loyalty-program"
  | "renovate"
  | "none";

export type PlayerDecision = {
  price: number;
  marketing: number;
  staff: number;
  bigMove: BigMove;
};

export type BussinessState = {
  cash: number;
  debt: number;
  loyalty: number;
  morale: number;
  marketShare: number;
};

export type QuarterOutcome = {
  headline: string;
  revenue: number;
  costOfGoodsSold: number;
  operatingExpenses: number;
  profit: number;
  demand: number;
  capacity: number;
  lostSales: number;
  stateAfter: BussinessState;
  eventEffect: string;
  turningPoint?: boolean;
};

export type QuarterScenario = {
  quarter: QuarterNumber;
  season: string;
  event: {
    title: string;
    summary: string;
  };
  defaultDecision: PlayerDecision;
  outcome: QuarterOutcome;
};

export type CommittedQuarter = {
  quarter: QuarterNumber;
  decision: PlayerDecision;
  committedAt: string;
};

export type QuarterRecord = CommittedQuarter & {
  scenario: QuarterScenario;
  outcome: QuarterOutcome;
};

export type GameSession = {
  schemaVersion: typeof GAME_SESSION_SCHEMA_VERSION;
  id: string;
  version: number;
  status: GameStatus;
  currentQuarter: QuarterNumber;
  draftDecision: PlayerDecision;
  records: CommittedQuarter[];
  createAt: string;
  updateAt: string;
};

export const INITIAL_BUSINESS_STATE: BussinessState = {
  cash: 3_000_000,
  debt: 400_000,
  loyalty: 640,
  morale: 72,
  marketShare: 31,
};

export function getScenario(quarter: QuarterNumber): QuarterScenario {
  return SCENARIOS[quarter - 1];
}

export function createGameSession(id: string, now: string): GameSession {
  return {
    schemaVersion: GAME_SESSION_SCHEMA_VERSION,
    id,
    version: 0,
    status: "active",
    currentQuarter: 1,
    draftDecision: { ...getScenario(1).defaultDecision },
    records: [],
    createAt: now,
    updateAt: now,
  };
}

export function updateGameDecision(
  session: GameSession,
  patch: Partial<PlayerDecision>,
  now: string,
): GameSession {
  if (session.status !== "active") return session;
  return {
    ...session,
    draftDecision: normalizeDecision({
      ...session.draftDecision,
      ...patch,
    }),
    updateAt: now,
  };
}

export function commitGameQuarter(
  session: GameSession,
  now: string,
): { session: GameSession; record: QuarterRecord } {
  if (session.status !== "active") {
    throw new Error("This game is already complete");
  }

  const quarter = session.currentQuarter;

  if (session.records.some((record) => record.quarter === quarter)) {
    throw new Error(`Quarter ${quarter} was already committed.`);
  }

  const committed: CommittedQuarter = {
    quarter,
    decision: { ...session.draftDecision },
    committedAt: now,
  };

  const record = materializeQuarterRecord(committed);
  const completed = quarter === TOTAL_QUARTERS;
  const nextQuarter = completed ? 8 : ((quarter + 1) as QuarterNumber);

  return {
    record,
    session: {
      ...session,
      version: session.version + 1,
      status: completed ? "completed" : "active",
      currentQuarter: nextQuarter,
      draftDecision: completed
        ? session.draftDecision
        : { ...getScenario(nextQuarter).defaultDecision },
      records: [...session.records, committed],
      updateAt: now,
    },
  };
}

export function materializeQuarterRecord(
  committed: CommittedQuarter,
): QuarterRecord {
  const scenario = getScenario(committed.quarter);

  return {
    ...committed,
    scenario,
    outcome: scenario.outcome,
  };
}

export function getQuarterRecord(
  session: GameSession,
  quarter: QuarterNumber,
): QuarterRecord | undefined {
  const committed = session.records.find(
    (record) => record.quarter === quarter,
  );
  return committed ? materializeQuarterRecord(committed) : undefined;
}

export function getLatestQuarterRecord(
  session: GameSession,
): QuarterRecord | undefined {
  const committed = session.records[session.records.length - 1];
  return committed ? materializeQuarterRecord(committed) : undefined;
}

export function getCurrentBusinessState(session: GameSession): BussinessState {
  return (
    getLatestQuarterRecord(session)?.outcome.stateAfter ??
    INITIAL_BUSINESS_STATE
  );
}

export function getCumulativeTotals(session: GameSession) {
  return session.records.reduce(
    (totals, committed) => {
      const outcome = getScenario(committed.quarter).outcome;
      totals.revenue += outcome.revenue;
      totals.profit += outcome.profit;
      totals.lostSales += outcome.lostSales;
      return totals;
    },
    { revenue: 0, profit: 0, lostSales: 0 },
  );
}

export function parseQuarter(value: string | undefined): QuarterNumber | null {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed >= 1 && parsed <= TOTAL_QUARTERS
    ? (parsed as QuarterNumber)
    : null;
}

export function formatYen(value: number): string {
  return `¥${value.toLocaleString("en-US")}`;
}

export function formatDecisionSummary(decision: PlayerDecision): string {
  const bigMove =
    decision.bigMove === "none"
      ? ""
      : ` . ${decision.bigMove.replaceAll("-", " ")}`;
  return `${formatYen(decision.price)} cup · ${formatYen(decision.marketing)} marketing  · ${decision.staff} staff  · ${bigMove} `;
}

function clampToStep(value: number, minimum: number, maximum: number, step: number): number{
  const finite = Number.isFinite(value) ? value : minimum
  const clamped = Math.min(Math.max(finite, minimum), maximum)
  return Math.round(clamped / step) * step
}

function normalizeDecision(decision: PlayerDecision): PlayerDecision{
  return {
    price: clampToStep(decision.price, 400, 800, 10),
    marketing: clampToStep(decision.marketing, 0, 1_500_000, 50_000),
    staff: clampToStep(decision.staff, 2, 1000, 1),
    bigMove: ["staff-training", "loyalty-program", "renovate", "none"].includes(decision.bigMove)? decision.bigMove : "none",
  }
}

export function isGameSession(value: unknown): value is GameSession {
  if (!value || typeof value !== "object") return false;

  const session = value as Partial<GameSession>;

  if (
    session.schemaVersion !== GAME_SESSION_SCHEMA_VERSION ||
    typeof session.id !== "string" ||
    !Number.isInteger(session.version) ||
    !Array.isArray(session.records) ||
    !session.draftDecision ||
    (session.status !== "active" && session.status !== "completed")
  ) {
    return false;
  }

  const currentQuarter = session.currentQuarter;

  if (
    typeof currentQuarter !== "number" ||
    currentQuarter < 1 ||
    currentQuarter > TOTAL_QUARTERS
  ) {
    return false;
  }

  const sequential = session.records.every(
    (record, index) =>
      record?.quarter === index + 1 &&
      typeof record.committedAt === "string" &&
      record.decision !== undefined,
  );

  if (!sequential || session.version !== session.records.length) {
    return false;
  }

  return session.status === "completed"
    ? session.records.length === TOTAL_QUARTERS && currentQuarter === 8
    : session.records.length === currentQuarter - 1;
}
