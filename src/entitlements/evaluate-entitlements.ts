import { GuestPrincipal, PlayerPrincipal } from "@/auth/player-principle";

export type GuestEntitlementInput = Readonly<{
  principal: GuestPrincipal;
  guestTrailCompleted: boolean;
  activeGameId: string | null;
}>;

export type PlayerEntitlementInput = Readonly<{
  principal: PlayerPrincipal;
  completedCount: number;
  activeGameId: string | null;
  now: Date;
}>;

export type EvaluateEntitlementInput =
  | GuestEntitlementInput
  | PlayerEntitlementInput;
