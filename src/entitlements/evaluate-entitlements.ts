import type {
  EntitlementStatus,
  EvaluateEntitlementInput,
} from "./entitlements-types";
import { GAME_ALLOWANCE_POLICY } from "./policy";
import { getUtcQuotaWindow } from "./utc-quota-window";

/**
 * Determines whether a principal may start a new game or resume an active game.
 *
 * Game counts and active-game data must come from trusted server-side records.
 * This result must not authorize final completion by itself;
 * completion quota must be rechecked and consumed in the completion transaction.
 */

export function evaluateEntitlement(
  input: EvaluateEntitlementInput,
): EntitlementStatus {
  // Guest allowance is lifetime-based and therefore has no reset window.
  if ("guestTrialCompleted" in input) {
    const guestLimit = GAME_ALLOWANCE_POLICY.guestLifetimeCompletionLimit;
    const completedCount = input.guestTrialCompleted ? 1 : 0;
    const remaining = Math.max(0, guestLimit - completedCount);

    // A completed guest trial permanently blocks starting another guest game.
    if (input.guestTrialCompleted) {
      return {
        allowed: false,
        reason: "guest_trial_used",
        completedCount,
        limit: guestLimit,
        remaining,
        resetAt: null,
        activeGameId: input.activeGameId,
      };
    }

    // One active game per principal prevents creating unlimited unfinished games.
    if (input.activeGameId !== null) {
      return {
        allowed: true,
        reason: "resume_active_game",
        completedCount,
        limit: guestLimit,
        remaining,
        resetAt: null,
        activeGameId: input.activeGameId,
      };
    }

    return {
      allowed: true,
      reason: "new_game_available",
      completedCount,
      limit: guestLimit,
      remaining,
      resetAt: null,
      activeGameId: null,
    };
  }

  // Player Input Flow
  if (input.completedCount < 0 || !Number.isInteger(input.completedCount)) {
    throw new Error("Completed count must be a non-negative integer");
  }

  // Authenticated allowance is based on completions in the current UTC day.
  const playerLimit = GAME_ALLOWANCE_POLICY.authenticatedDailyCompletionLimit;
  const remaining = Math.max(0, playerLimit - input.completedCount);

  // The quota resets at the end of the current UTC window.
  const { end } = getUtcQuotaWindow(input.now);
  const resetAt = end.toISOString();

  // An existing active game should be resumed instead of starting another game.
  if (input.activeGameId !== null) {
    return {
      allowed: true,
      reason: "resume_active_game",
      completedCount: input.completedCount,
      limit: playerLimit,
      remaining,
      resetAt,
      activeGameId: input.activeGameId,
    };
  }

  if (remaining > 0) {
    return {
      allowed: true,
      reason: "new_game_available",
      completedCount: input.completedCount,
      limit: playerLimit,
      remaining,
      resetAt,
      activeGameId: null,
    };
  }

  return {
    allowed: false,
    reason: "daily_limit_reached",
    completedCount: input.completedCount,
    limit: playerLimit,
    remaining,
    resetAt,
    activeGameId: null,
  };
}
