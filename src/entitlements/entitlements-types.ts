import type { GuestPrincipal, UserPrincipal } from "@/auth/player-principle";

export type EntitlementReason =
  | "new_game_available"
  | "resume_active_game"
  | "guest_trial_used"
  | "daily_limit_reached";

export type EntitlementStatus = Readonly<{
  allowed: boolean;
  reason: EntitlementReason;
  completedCount: number;
  limit: number;
  remaining: number;
  resetAt: string | null;
  activeGameId: string | null;
}>;

export type GuestEntitlementInput = Readonly<{
  principal: GuestPrincipal;
  guestTrialCompleted: boolean;
  activeGameId: string | null;
}>;

export type AuthenticatedEntitlementInput = Readonly<{
  principal: UserPrincipal;
  completedCount: number;
  activeGameId: string | null;
  now: Date;
}>;

export type EvaluateEntitlementInput =
  | GuestEntitlementInput
  | AuthenticatedEntitlementInput;
