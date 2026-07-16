# Kissaten Tycoon — Project Summary

## Project overview

Kissaten Tycoon is a web-based business simulation game where the player manages an existing Japanese specialty coffee shop over four quarterly turns.

The project combines:

- deterministic business simulation
- strategic management decisions
- transparent cause-and-effect
- AI-generated teaching and narrative
- limited guest and authenticated gameplay

The MVP is built as a single Next.js application using a modular-monolith architecture.

## Core problem

Many business games hide their formulas, while many AI demos generate dialogue without a reliable simulation underneath.

Kissaten Tycoon separates four responsibilities:

1. The simulation engine calculates authoritative business results.
2. The agent system explains, narrates, or proposes constrained actions.
3. The application layer coordinates authentication, persistence, entitlements, simulation, and AI.
4. The user interface presents decisions and results.

## Product goal

Create a complete and replayable management experience that teaches players how business decisions interact.

The player should understand:

- why demand increased or decreased
- how price affects margin and customer interest
- how marketing can create demand beyond capacity
- how staffing affects payroll, morale, quality, and throughput
- how bean quality affects cost, loyalty, and reputation
- why maximizing one metric may damage another

## Player experience

The player takes over a two-year-old kissaten that is stable but imperfect.

The shop already has customers, employees, cash, recurring costs, a reputation, a menu, and a known market position.

Each quarter, the player:

1. reviews the current shop condition
2. selects business decisions
3. advances the simulation
4. reviews financial and operational results
5. reads the Professor's explanation
6. prepares the next-quarter strategy

## MVP decisions

The player controls:

- selling price
- marketing spending or intensity
- staffing action
- coffee-bean quality tier

These decisions affect:

- potential demand
- capacity
- units sold
- lost sales
- revenue
- expenses
- profit
- cash
- morale
- quality
- loyalty
- reputation

## Core architectural rule

The deterministic simulation engine is the source of truth.

AI agents may explain results, narrate events, role-play characters, or propose constrained decisions.

AI agents may not calculate authoritative revenue, assign profit or cash, directly mutate game state, or create unrestricted numeric modifiers.

## MVP agents

### Professor

Explains what happened, why it happened, which decision caused it, the relevant business concept, and what the player should consider next.

### Competitor

For the MVP, use deterministic policy logic first. It may choose a price position, marketing intensity, and quality strategy.

### Event system

Selects events from a controlled catalog. Numeric effects are predefined and deterministic.

## Authentication and usage model

### Guest

- may complete one game without an account
- may resume one active game
- must sign in before starting another game

### Authenticated user

- may complete three games per UTC day
- may have one active game at a time
- keeps game history

Only successful completion of quarter four consumes an allowance.

## MVP success criteria

The MVP succeeds when:

- a visitor can start immediately
- a guest can complete one full game
- an authenticated player can complete up to three games per UTC day
- simulation results are reproducible
- important calculations are explainable
- the Professor provides useful feedback
- AI failure does not prevent completion
- the project deploys as one Next.js application

## Non-goals

The hackathon MVP does not require multiplayer, multiple branches, autonomous multi-agent orchestration, advanced inventory, loans, subscriptions, leaderboards, microservices, a monorepo, or perfect guest-abuse prevention.

## Long-term vision

Future versions may add reusable simulation packages, multiple business scenarios, richer employees, supplier negotiation, longer campaigns, difficulty modes, and businesses beyond coffee shops.
