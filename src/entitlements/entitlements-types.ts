export type EntitlementReason =
  | "new_game_available"
  | "resume_active_game"
  | "guest_trial_used"
  | "daily_limited_reached";

export type EntitlementStatus = Readonly<{
  allowed: boolean;
  reason: EntitlementReason;
  completedCount: number;
  limit: number;
  remaining: number;
  resetAt: string | null;
  activeGameId: string | null;
}>
