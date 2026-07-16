# Authentication and Entitlement Architecture

## Goals
- one complete game without registration
- authentication before repeat play
- three authenticated completions per UTC day
- secure ownership and history
- server-enforced limits
- no custom password-security system for the hackathon

## Authentication approach
Use an established Next.js-compatible authentication library with database-backed users and sessions. Begin with one OAuth provider where practical. Password hashing, recovery, account linking, and session security should not be custom-built for this MVP.

## Normalized principal
Application use cases receive:
```text
PlayerPrincipal =
  { kind: "guest", guestId }
  | { kind: "user", userId }
```
Domain and application logic should not depend directly on library-specific session objects.

## Guest session
When no authenticated session exists:
1. read and validate the guest cookie
2. resolve the guest record
3. generate a cryptographically random guest identifier when missing
4. persist the record
5. issue a Secure, HttpOnly, SameSite=Lax cookie

Store an opaque identifier, not trusted state or quota counts, in the cookie.

## Authorization
Every game operation verifies ownership on the server:
```text
guest -> game.guestOwnerId == principal.guestId
user  -> game.userOwnerId == principal.userId
```
Hiding routes or buttons is not authorization.

## Guest claim after sign-in
In one transaction:
1. resolve guest and authenticated user
2. verify guest is unclaimed
3. transfer eligible games to the user
4. mark guest claimed
5. clear or rotate the guest cookie
6. avoid duplicate completion usage

The guest trial remains free and does not consume the user's daily authenticated allowance.

## Entitlement service
Separate from authentication. It answers whether the principal may create, resume, or complete a game; remaining completions; and reset time.

## Final completion transaction
1. verify game ownership and active status
2. ensure final quarter was not already processed
3. re-check allowance
4. process deterministic simulation
5. mark completed
6. insert unique completion usage record
7. commit

## Concurrency
Two simultaneous final-turn requests must not both consume the last slot. Use a transaction with a user/day quota row, row/advisory lock, or atomic conditional increment. Keep a unique `gameId` on completion records.

## Rate limiting
Rate-limit guest creation, game creation, turn submission, auth endpoints, and Professor generation. Request-rate limiting and completion quota are different counters.

## Security
Secure and HttpOnly cookies, appropriate SameSite policy, origin/CSRF protection for mutations, server schema validation, idempotency keys, no browser-trusted quota, no secrets in client bundles, and no raw guest token logs.
