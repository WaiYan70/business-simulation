import {
  EntitlementStatus,
  EvaluateEntitlementInput,
  PlayerEntitlementInput,
} from "./entitlements-types";
import { GAME_ALLOWANCE_POLICY } from "./policy";
import { getUtcQuotaWindow } from "./utc-quota-window";

export function evaluatedEntitlement(
  input: EvaluateEntitlementInput,
): EntitlementStatus {
  // Guest Explicit Input Flow
  if (input.principal.kind === "guest" && "guestTrialCompleted" in input) {
    const guestLimit = GAME_ALLOWANCE_POLICY.guestLifeTimeCompletionLimit;
    const completedCount = input.guestTrialCompleted ? 1 : 0;

    if (input.activeGameId) {
      return {
        allowed: true,
        reason: "resume_active_game",
        completedCount,
        limit: guestLimit,
        remaining: 0,
        resetAt: null,
        activeGameId: input.activeGameId,
      };
    }

    if (input.guestTrialCompleted) {
      return {
        allowed: false,
        reason: "daily_limited_reached",
        completedCount,
        limit: guestLimit,
        remaining: 0,
        resetAt: null,
        activeGameId: null,
      };
    }
    return {
      allowed: true,
      reason: "new_game_available",
      completedCount,
      limit: guestLimit,
      remaining: 1,
      resetAt: null,
      activeGameId: null,
    };
  }

  // Player Input Flow (Narrowed to PlayerEntitlementInput)
  const playerInput = input as PlayerEntitlementInput;

  if (
    playerInput.completedCount < 0 ||
    !Number.isInteger(playerInput.completedCount)
  ) {
    throw new Error("completed Count must be non-negative integer");
  }

  // set boundaries whether the player principal is a guest or player
  const playerLimit = GAME_ALLOWANCE_POLICY.authenticatedDailyCompletionLimit;
  const limit = playerInput.principal.kind === "guest" ? 1 : playerLimit;
  const remaining = Math.max(0, limit - playerInput.completedCount);

  // Get today's UTC quota window end
  const { end } = getUtcQuotaWindow(input.now);
  const resetAt = end.toISOString();

  if (playerInput.activeGameId) {
    return {
      allowed: true,
      reason: "resume_active_game",
      completedCount: playerInput.completedCount,
      limit,
      remaining,
      resetAt,
      activeGameId: playerInput.activeGameId,
    };
  }

  if (remaining > 0) {
    return {
      allowed: true,
      reason: "new_game_available",
      completedCount: playerInput.completedCount,
      limit,
      remaining,
      resetAt,
      activeGameId: null,
    };
  }

  return {
    allowed: false,
    reason: "daily_limited_reached",
    completedCount: playerInput.completedCount,
    limit,
    remaining: 0,
    resetAt: null,
    activeGameId: null,
  };
}
