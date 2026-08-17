export type GuestPrincipal = Readonly<{
  kind: "guest";
  guestId: string;
}>

export type UserPrincipal = Readonly<{
  kind: "user";
  userId: string;
}>

export type PlayerPrincipal = GuestPrincipal | UserPrincipal;
