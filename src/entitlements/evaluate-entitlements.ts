import {
  EntitlementStatus,
  EvaluateEntitlementInput,
  PlayerEntitlementInput,
} from "./entitlements-types";

export function evaluatedEntitlement(
  input: EvaluateEntitlementInput,
  dailyLimit: number = 5,
): EntitlementStatus {
  if (input.principal.kind === "guest" && "guestTrailCompleted" in input) {
    const limit = 1;
    const completedCount = input.guestTrailCompleted ? 1 : 0;

    if (input.activeGameId) {
      return {
        allowed: true,
        reason: "resume_active_game",
        completedCount,
        limit,
        remaining: 0,
        resetAt: null,
        activeGameId: input.activeGameId,
      };
    }

    if (input.guestTrailCompleted) {
      return {
        allowed: false,
        reason: "daily_limited_reached",
        completedCount,
        limit,
        remaining: 0,
        resetAt: null,
        activeGameId: null,
      };
    }
    return {
      allowed: true,
      reason: "new_game_available",
      completedCount,
      limit,
      remaining: 1,
      resetAt: null,
      activeGameId: null,
    };
  }

  const playerInput = input as PlayerEntitlementInput;

  if (
    playerInput.completedCount < 0 ||
    !Number.isInteger(playerInput.completedCount)
  ) {
    throw new Error("completed Count must be non-negative integer");
  }

  const limit = playerInput.principal.kind === "guest" ? 1 : dailyLimit;
  const remaining = Math.max(0, limit - playerInput.completedCount);

  const resetDate = new Date(playerInput.now);
  resetDate.setUTCHours(24, 0, 0, 0);
  const resetAt = resetDate.toISOString();

  if (playerInput.activeGameId) {
    return {
      allowed: true,
      reason: "resume_active_game",
      completedCount: playerInput.completedCount,
      limit,
      remaining,
      resetAt,
      activeGameId: playerInput.activeGameId
    }
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
    }
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
