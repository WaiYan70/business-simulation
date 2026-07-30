import { create } from "zustand";

import {
  commitGameQuarter,
  createGameSession,
  isGameSession,
  updateGameDecision,
  type GameSession,
  type PlayerDecision,
  type QuarterRecord,
} from "@/components/game/session/GameSession";

export const GAME_SESSION_STORAGE_KEY = "kissaten-tycoon:game-session:v1";

type GameSessionStore = {
  session: GameSession | null;
  hydrated: boolean;
  persistenceError: string | null;
  hydrate: () => void;
  syncFromStorage: (storedValue: string | null) => void;
  updateDecision: (patch: Partial<PlayerDecision>) => void;
  commitCurrentQuarter: () => QuarterRecord;
  resetGame: () => void;
};

function createFreshSession(): GameSession {
  return createGameSession(
    globalThis.crypto.randomUUID(),
    new Date().toISOString(),
  );
}

function readStoredSession(storedValue?: string | null): GameSession | null {
  const raw =
    storedValue === undefined
      ? window.localStorage.getItem(GAME_SESSION_STORAGE_KEY)
      : storedValue;

  if (!raw) return null;

  try {
    const parsed: unknown = JSON.parse(raw);
    return isGameSession(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

function persistSession(session: GameSession): void {
  window.localStorage.setItem(
    GAME_SESSION_STORAGE_KEY,
    JSON.stringify(session),
  );
}

export const useGameSessionStore = create<GameSessionStore>((set, get) => ({
  session: null,
  hydrated: false,
  persistenceError: null,

  hydrate: () => {
    if (get().hydrated) return;
    try {
      const restored = readStoredSession();
      const session = restored ?? createFreshSession();
      if (!restored) persistSession(session);

      set({
        session,
        hydrated: true,
        persistenceError: null,
      });
    } catch {
      set({
        session: createFreshSession(),
        hydrated: true,
        persistenceError:
          "Browser storage is unavailable. This game cannot be safaly refreshed",
      });
    }
  },

  syncFromStorage: (stroedValue) => {
    const restored = readStoredSession(stroedValue);
    if (restored) {
      set({
        session: restored,
        persistenceError: null,
      });
    }
  },

  updateDecision: (patch) => {
    const current = get().session;
    if (!current || current.status !== "active") return;
    const next = updateGameDecision(current, patch, new Date().toISOString());

    try {
      persistSession(next);
      set({
        session: next,
        persistenceError: null,
      });
    } catch {
      set({
        session: next,
        persistenceError:
          "This decision changed in memory but could not be saved to browser storage.",
      });
    }
  },

  commitCurrentQuarter: () => {
    const current = get().session;
    if (!current) {
      throw new Error("The game session has not loaded");
    }
    const transition = commitGameQuarter(current, new Date().toISOString());

    try {
      persistSession(transition.session);
      set({
        session: transition.session,
        persistenceError: null,
      });
      return transition.record;
    } catch {
      set({
        persistenceError:
          "The quarter could not be saved. Your previous saved state is unchanged",
      });

      throw new Error("The quarter could not be saved");
    }
  },

  resetGame: () => {
    const next = createFreshSession();
    try {
      persistSession(next);
      set({
        session: next,
        persistenceError: null,
      });
    } catch {
      set({
        persistenceError: "A new game could not be saved to browser storage.",
      });
      throw new Error("A new game could not be saved.");
    }
  },
}));
