# Authentication and Usage Domain

## Principal
```text
PlayerPrincipal = GuestPrincipal | UserPrincipal
GuestPrincipal = { kind: "guest", guestId }
UserPrincipal  = { kind: "user", userId }
```

## Ownership
A game has exactly one current owner: `guestOwnerId` or `userOwnerId`. After claim, only `userOwnerId` remains.

## Guest record
Suggested fields: id, tokenHash, trialCompletedAt, claimedByUserId, claimedAt, createdAt, and lastSeenAt.

## Completion usage record
Suggested fields:
- id
- gameId
- userId or guestId
- usageType: `guest_trial` or `authenticated_daily`
- completedAt
- quotaDateUtc for authenticated usage

Constraints:
- unique gameId
- exactly one owner identity
- authenticated usage includes quota date

## Optional daily bucket
For atomic enforcement:
```text
DailyUsageBucket
- userId
- quotaDateUtc
- completedCount
- limitSnapshot
```
Unique key: `(userId, quotaDateUtc)`.

Completion records remain the audit source; a bucket is an enforcement optimization.

## Entitlement result
```text
EntitlementStatus
- allowed
- reason
- completedCount
- limit
- remaining
- resetAt
- activeGameId
```

## Policy
- guest completions: 1 lifetime per guest identity
- authenticated completions: 3 per UTC day
- active games: 1 per principal
- guest completion is not deducted from authenticated allowance

## Clock
Quota calculations receive the current instant or a clock abstraction for deterministic testing.

## Distinction
Request rate limiting controls frequency. Completion entitlement controls product usage. They must not share one counter.
