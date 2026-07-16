# Architecture Overview

## Style
The MVP is a modular monolith in one Next.js repository and one deployment.

```text
Client/UI -> Application Use Cases -> Simulation Domain
                         |-> Auth and Entitlement Interfaces
                         |-> Repository Interfaces
                         |-> Agent Interfaces
Infrastructure implements external interfaces.
```

## Modules
### `src/app`
Next.js routing, rendering, Route Handlers, Server Actions, and transport concerns. It must not contain simulation formulas.

### `src/features`
Player-facing UI: dashboard, decision form, reports, auth gate, quota indicator, and Professor panel.

### `src/application`
Use cases: resolve player, start game, advance turn, complete game, claim guest history, and calculate remaining allowance.

### `src/simulation`
Framework-independent models, rules, scenarios, seeded randomness, engine orchestration, invariants, and calculation traces.

### `src/agents`
Agent contracts, policies, prompts, validation, provider adapters, and fallbacks.

### `src/auth`
Auth configuration, guest resolver, current-user resolver, normalized player principal, ownership helpers, and guest claim logic.

### `src/entitlements`
Quota windows, eligibility checks, completion recording, and remaining allowance.

### `src/infrastructure`
Database, repositories, LLM client, logging, rate limiting, and clock implementation.

## Source of truth
| Concern | Authority |
|---|---|
| Identity | session or signed guest identity |
| Game ownership | database |
| Game allowance | server completion records |
| Business numbers | simulation engine |
| Current state | committed database state |
| Professor text | validated agent output or fallback |
| UI state | non-authoritative presentation |
