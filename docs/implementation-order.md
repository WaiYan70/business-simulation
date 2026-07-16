# Kissaten Tycoon — Implementation Order

## Principle

Implement in dependency order and prove the core simulation loop before adding AI, charts, or visual polish.

The first target is:

```text
initial state
    -> player decision
    -> deterministic turn
    -> next state
    -> readable result
```

## 1. Repository foundation

- create Next.js app
- enable strict TypeScript
- configure linting and Vitest
- add `AGENTS.md`
- add `.agents/skills/`
- add project docs
- create module folders

Done when development, type checking, linting, and one sample test work.

## 2. Domain types

Implement:

1. money and score conventions
2. `GameStatus`
3. `GameState`
4. `PlayerDecision`
5. `SimulationContext`
6. `TurnResult`
7. `CalculationTrace`
8. domain errors
9. invariant validator

Do not implement formulas yet.

## 3. Default scenario

Define:

- initial cash
- price
- staff
- morale
- quality
- loyalty
- reputation
- market demand
- capacity assumptions
- balance configuration

Done when all initial values are reproducible and documented.

## 4. Demand

Implement:

1. price modifier
2. marketing modifier
3. reputation modifier
4. loyalty modifier
5. quality expectation modifier
6. seasonality and economy
7. potential demand
8. calculation trace
9. tests

## 5. Capacity and sales

Implement:

1. staff capacity
2. morale and productivity effects
3. final capacity
4. units sold
5. lost sales
6. traces
7. tests

## 6. Finance

Implement:

1. revenue
2. bean cost
3. other variable costs
4. payroll
5. rent and utilities
6. marketing expense
7. total expenses
8. profit
9. cash update
10. reconciliation tests

## 7. Long-term metrics

Implement:

1. morale
2. product quality
3. service quality
4. loyalty
5. reputation
6. bounded score handling
7. interaction tests

## 8. Full turn engine

Create `simulateTurn`, apply rules in documented order, return immutable state, update cumulative metrics, advance the quarter, and validate invariants.

Done when four turns can run entirely in tests.

## 9. Database and persistence

Create:

1. auth tables
2. guests
3. games
4. state snapshots
5. turns
6. decisions
7. results
8. agent outputs
9. completion usage
10. optional daily usage bucket

Then build repositories and transaction helpers.

## 10. Application use cases

Implement:

- resolve principal
- start game
- get game
- submit decision
- advance turn
- resume game
- restart or archive
- final report
- remaining allowance

Add ownership, idempotency, and optimistic concurrency.

## 11. Guest identity

Implement guest token generation, cookie handling, guest records, guest ownership, one-active-game enforcement, and trial completion checks.

## 12. Authentication

Implement Better Auth, database adapter, Google OAuth, sign-in, sign-out, session resolution, and user principal mapping.

## 13. Daily entitlement

Implement UTC windows, completion counting, remaining allowance, final-turn recheck, unique completion records, concurrency protection, and guest-to-user claim.

## 14. Basic UI

Build in this order:

1. landing page
2. guest start
3. dashboard shell
4. state cards
5. decision form
6. submit and loading states
7. turn result
8. calculation breakdown
9. quarter progress
10. final report
11. login gate
12. remaining-game indicator

## 15. Professor

Implement contract, schema, fallback, prompt, provider interface, validation, persistence, and UI.

## 16. Competitor

Implement deterministic competitor state, strategy types, constrained decisions, and tests.

## 17. Events

Implement event schema, catalog, modifiers, seeded selection, trace, and optional narration.

## 18. Charts and polish

Add charts only after the complete game works.

## 19. Calibration

Run multiple strategies, inspect distributions, adjust coefficients, and document balance changes.

## 20. Deployment

Configure database, OAuth, secrets, deployment, migrations, smoke tests, guest cookies, quotas, AI fallback, and the demo script.

## First coding session

Only implement:

1. `GameState`
2. `PlayerDecision`
3. `TurnResult`
4. default scenario
5. invariants
6. tests

Do not implement authentication or AI during the first session.

## First playable slice

```text
fixed starting state
    -> choose price
    -> calculate demand
    -> calculate capacity
    -> calculate sales
    -> calculate revenue and profit
    -> show text result
```
