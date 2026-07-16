# Turn Processing

## Command
```text
AdvanceTurnCommand
- gameId
- expectedGameVersion
- expectedQuarter
- idempotencyKey
- playerDecision
```
Identity is resolved on the server, never accepted from the command body.

## Checks
1. resolve principal
2. load game
3. verify ownership
4. verify active status
5. verify version and quarter
6. check idempotency
7. validate schema and domain ranges
8. load scenario and deterministic context

## Simulation order
1. demand
2. capacity
3. units sold and lost sales
4. revenue
5. variable cost
6. fixed cost
7. expenses
8. profit
9. cash
10. morale
11. quality
12. loyalty
13. reputation
14. cumulative metrics
15. advance or complete
16. invariants

Changing order is a behavioral change requiring documentation and tests.

## Transaction
Persist turn, decision, result, trace, next state, and version. On the final turn, also create a unique completion usage record.

## Concurrency
Use optimistic versioning so only one request can transition a game version.

## Final entitlement
Before and inside final completion, verify guest trial status or authenticated daily allowance. A game may consume usage only once.

## AI post-processing
After commit, request Professor output, validate it, persist valid output, or use fallback.

## Errors
Validation, unauthorized, forbidden, conflict, invariant, and infrastructure failures must remain distinct. Never report completion unless the transaction committed.
