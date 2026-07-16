# MVP Scope

## Objective
Deliver a complete four-quarter business simulation with deterministic calculations, a clear dashboard, one guest trial, authenticated daily limits, and one useful AI teaching experience.

## Required player journey
1. Visit the landing page.
2. Start one guest game without registration.
3. Review the initial shop state.
4. Submit quarterly decisions.
5. Receive deterministic results and Professor feedback.
6. Complete quarter four and view the final report.
7. Sign in before playing another game.
8. After sign-in, complete up to three games per UTC day.

## Required decisions
- selling price
- marketing budget or intensity
- staffing action
- bean quality tier

## Required metrics
- cash
- revenue
- expenses
- profit
- potential demand
- units sold
- lost sales
- capacity
- reputation
- loyalty
- morale
- quality

## Required systems
### Product
Landing page, dashboard, decision form, turn report, final report, sign-in gate, and remaining-games indicator.

### Simulation
Typed state and decisions, default scenario, deterministic turn pipeline, seeded randomness where needed, calculation traces, invariant checks, and tests.

### Persistence
Guest identity, user, game, state, turns, decisions, results, agent output, and completion usage records.

### Authentication and entitlement
- one completed guest game per signed guest identity
- login required after guest completion
- three authenticated completed games per UTC day
- one active game per identity
- server-authoritative checks
- reset calculated at 00:00 UTC

### AI
Professor explanation with runtime-validated output and deterministic fallback.

## Out of scope
Multiplayer, real-time simulation, monorepo, microservices, autonomous agent framework, branches, complex inventory, employee conversations, loans, subscriptions, leaderboards, and perfect guest-abuse prevention.

## Definition of done
- guest can complete one run
- authenticated fourth completion in the same UTC day is rejected
- duplicate completion cannot consume quota twice
- client state alone cannot bypass limits
- identical simulation input and seed reproduce output
- Professor failure does not block gameplay
- tests, types, lint, and production build pass
