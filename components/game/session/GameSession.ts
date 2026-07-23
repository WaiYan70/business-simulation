import { SCENARIOS } from "./sample-data-game-scenario";

export const TOTAL_QUARTERS = 8;
export const GAME_SESSION_SCHEMA_VERSION = 1;

export type QuarterNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type GameStatus = "active" | "completed";
export type BigMove =
  | "staff training"
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
    draftDecision: {
      ...session.draftDecision,
      ...patch,
    },
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

export function getQuarterRecord(session: GameSession, quarter: QuarterNumber): QuarterRecord | undefined {
  const committed = session.records.find((record) => record.quarter === quarter);
  return committed ? materializeQuarterRecord(committed) : undefined;
 }

export function getLatestQuarterRecord(session: GameSession): QuarterRecord | undefined {
  const committed = session.records[session.records.length - 1];
  return committed ? materializeQuarterRecord(committed) : undefined
}
