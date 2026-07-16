# Gameplay Loop

## High-level flow
```text
Review -> Decide -> Validate -> Simulate -> Persist -> Explain -> Continue or Finish
```

## New guest game
1. Resolve or create a signed guest identity.
2. Check whether the guest trial is already completed.
3. Resume an active game or create the default scenario.
4. Persist the game and initial state.

## New authenticated game
1. Resolve the authenticated user.
2. Count completed games in the current UTC window.
3. Resume an active game when present.
4. Otherwise create a game only when allowance remains.

## Turn flow
1. Show current state and active event.
2. Collect price, marketing, staffing, and quality decisions.
3. Validate ownership, game status, quarter, version, idempotency key, and decision schema.
4. Invoke the simulation with immutable state and deterministic context.
5. In one transaction, save the turn, decision, result, trace, and next state.
6. On the final quarter, mark the game completed and create one unique completion usage record.
7. After commit, request and validate Professor output.
8. Use a deterministic fallback when AI generation fails.

## Abandonment
A started game does not consume completion allowance. Each identity may have only one active game. Restarting archives the old active game. Guest games may expire after an inactivity period.

## Retry and idempotency
Repeating the same idempotency key returns the original result and must not process the turn or consume quota again.

## Failure behavior
- simulation failure: persist nothing
- transaction failure: permit a safe retry
- Professor failure: preserve the completed turn and show fallback text
- quota failure: do not save an unauthorized final completion
