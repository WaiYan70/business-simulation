import type {
  EntitlementStatus,
  EvaluateEntitlementInput,
} from "./entitlements-types";
import { GAME_ALLOWANCE_POLICY } from "./policy";
import { getUtcQuotaWindow } from "./utc-quota-window";

export function evaluateEntitlement(
  input: EvaluateEntitlementInput,
): EntitlementStatus {
  // Guest Explicit Input Flow
  if ("guestTrialCompleted" in input) {
    const guestLimit = GAME_ALLOWANCE_POLICY.guestLifetimeCompletionLimit;
    const completedCount = input.guestTrialCompleted ? 1 : 0;
    const remaining = Math.max(0, guestLimit - completedCount);

    // Check the guest trial is completed and then check the game id is valid or not
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

  // Player Input Flow (Narrowed to PlayerEntitlementInput)
  if (input.completedCount < 0 || !Number.isInteger(input.completedCount)) {
    throw new Error("Completed count must be a non-negative integer");
  }

  // set boundaries whether the player principal is a guest or player
  const playerLimit = GAME_ALLOWANCE_POLICY.authenticatedDailyCompletionLimit;
  const remaining = Math.max(0, playerLimit - input.completedCount);

  // Get today's UTC quota window end
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
