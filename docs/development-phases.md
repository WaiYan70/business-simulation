# Kissaten Tycoon — Development Phases

## Phase 0 — Product and domain definition

Goal: remove ambiguity before implementation.

Deliverables:

- game vision
- MVP scope
- gameplay loop
- glossary
- initial state definition
- turn-processing order
- formula framework
- auth and entitlement policy
- architecture decision records

Complete when every MVP decision, state metric, unit, range, and usage rule is explicit.

## Phase 1 — Simulation foundation

Goal: create the framework-independent domain foundation.

Deliverables:

- `GameState`
- `PlayerDecision`
- `SimulationContext`
- `TurnResult`
- `CalculationTrace`
- default scenario
- balance configuration
- seeded random interface
- domain errors
- invariant validation

Complete when the starting state is valid and the simulation layer imports no framework, database, or AI code.

## Phase 2 — Core business rules

Goal: implement authoritative numerical rules.

Deliverables:

- price modifier
- marketing modifier
- demand
- capacity
- units sold and lost sales
- revenue
- costs
- profit
- cash
- morale
- quality
- loyalty
- reputation

Complete when every rule has named inputs, outputs, units, traces, and tests.

## Phase 3 — Complete turn engine

Goal: combine rules into one deterministic state transition.

Deliverables:

- `simulateTurn`
- documented rule order
- immutable next state
- cumulative metrics
- quarter advancement
- final completion state
- integration tests

Complete when a four-turn game runs in tests and identical inputs reproduce identical outputs.

## Phase 4 — Persistence and application use cases

Goal: save games and safely coordinate processing.

Deliverables:

- database schema
- repositories
- start, load, resume, and advance use cases
- idempotency
- optimistic concurrency
- final completion transaction

Complete when turns cannot process twice and failed transactions do not create partial state.

## Phase 5 — Authentication and entitlement

Goal: support one guest game and limited authenticated replay.

Deliverables:

- Better Auth
- OAuth
- guest cookie and guest record
- normalized player principal
- ownership checks
- guest trial enforcement
- three daily authenticated completions
- guest-to-user claim

Complete when the fourth authenticated completion is rejected and duplicate requests cannot consume quota twice.

## Phase 6 — Playable web interface

Goal: create the complete browser gameplay loop.

Deliverables:

- landing page
- start flow
- dashboard
- decision form
- result screen
- calculation breakdown
- final report
- login gate
- remaining-game indicator

Complete when a player can finish four turns without developer tools.

## Phase 7 — Professor agent

Goal: add educational AI safely.

Deliverables:

- input contract
- output schema
- prompt
- provider adapter
- runtime validation
- deterministic fallback
- explanation UI

Complete when AI failure does not block the game and explanations match real calculation traces.

## Phase 8 — Competitor and event systems

Goal: increase replayability.

Deliverables:

- deterministic competitor policy
- competitor state
- controlled event catalog
- seeded event selection
- predefined event modifiers
- optional narration

Complete when variation remains reproducible and bounded.

## Phase 9 — Balancing and playtesting

Goal: make the game fair and strategically interesting.

Test:

- neutral strategy
- low-price strategy
- premium strategy
- aggressive marketing
- understaffing
- overstaffing
- cost cutting
- balanced play

Complete when no single strategy dominates every scenario.

## Phase 10 — Hackathon polish

Goal: prepare a reliable demonstration.

Deliverables:

- seeded demo scenario
- production deployment
- README
- screenshots
- architecture diagram
- demo script
- submission materials
- fallback demonstration

Complete when the critical end-to-end flow works in production.

## Post-MVP

Future phases may include monorepo extraction, advanced employees and Kenji, inventory, suppliers, loans, branches, and longer campaigns.
