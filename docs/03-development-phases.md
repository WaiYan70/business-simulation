# Kissaten Tycoon — Development Phases

## Phase 0 — Simulation Design and Calibration

### Goal

Define a balanced economy before building the interface or integrating AI.

### Scope

- define what one quarter represents
- set starting cash and market size
- set employee capacity, labor cost, and fixed cost
- define default decisions and bankruptcy conditions
- place all tuning constants in configuration

### Deliverable

A configuration file and manually verified default quarter.

### Completion Criteria

- default decisions are near break-even
- good decisions can produce profit
- poor decisions produce recoverable losses
- extreme decisions create serious consequences
- units and formulas are consistent

---

## Phase 1 — Deterministic Engine MVP

### Goal

Build the simulation without frontend, database, or AI.

### Decisions

- price
- marketing spend
- staff count
- bean tier

### Calculations

- demand
- capacity
- units sold
- lost sales
- revenue and costs
- net profit and closing cash
- loyalty, reputation, and morale changes

### Deliverable

A terminal-based 4-quarter simulation.

### Completion Criteria

- seeded runs are reproducible
- every quarter reconciles
- invalid decisions are rejected
- extreme scenarios are tested
- engine code has no framework or AI dependency

---

## Phase 2 — Playable Web Game

### Goal

Make the deterministic simulation playable in a browser.

### Scope

- start screen
- quarter briefing
- business status
- decision form
- quarter result
- P&L table
- charts
- mocked competitor and events

### Deliverable

A complete 4-quarter browser game without real AI.

---

## Phase 3 — Core AI Integration

### Goal

Replace mocked actors with GPT-5.6 agents.

### Integration Order

1. Professor Agent
2. Competitor Agent
3. Market Event Agent

### Requirements

- structured outputs
- Zod validation
- clamping
- timeouts
- neutral fallbacks
- stored input and output snapshots

### Deliverable

A complete 4-quarter AI-powered simulation.

---

## Phase 4 — Kenji Human-Management Showcase

### Goal

Add one memorable employee-management interaction.

### Initial Scenario

Kenji receives an offer from the competitor in Quarter 3.

### Scope

- short conversation
- hidden trust and loyalty
- evaluator output
- one or two structured promise types
- deterministic promise verification
- Professor feedback

### Initial Promise Types

- raise wages
- hire another employee

---

## Phase 5 — Full Business Simulation

### Goal

Expand the MVP into the complete product vision.

### Features

- 8 quarters
- wage modifier
- forward contracts
- bean inventory and spoilage
- loans and second location
- loyalty program
- renovation
- more events and competitor strategies
- more Kenji triggers
- final report card

### Recommended Order

1. Wage modifier and morale
2. Forward contracts
3. Inventory and spoilage
4. Loyalty program
5. Loans and expansion
6. Additional employee scenarios
7. Final assessment

---

## Phase 6 — Product and Classroom Platform

### Possible Features

- user accounts
- saved games
- difficulty settings
- multiple industries
- instructor dashboard
- student reports
- scenario builder
- leaderboards
- multiplayer
- analytics
- subscriptions
