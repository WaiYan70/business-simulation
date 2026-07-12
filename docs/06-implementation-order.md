# Kissaten Tycoon — Implementation Order Plan

## Guiding Rule

Build the trustworthy simulation first. Add AI only after the game produces correct consequences without AI.

## 1. Define Core Types

Create:

```ts
GameState
PlayerDecision
CompetitorAction
MarketEvent
QuarterResult
SimulationConfig
```

Initial decisions:

```ts
type PlayerDecision = {
  priceYen: number;
  marketingSpendYen: number;
  staffCount: number;
  beanTier: "standard" | "premium";
};
```

## 2. Create Simulation Configuration

Centralize:

- starting values
- decision bounds
- market size
- reference price
- elasticity
- employee capacity
- labor and fixed costs
- bean-tier multipliers
- reputation and loyalty weights

## 3. Implement Decision Validation

Validate price, marketing, staffing, and bean tier before any state mutation or AI call.

## 4. Implement Demand

Start with:

```text
base demand
× price factor
× reputation factor
× marketing factor
× competitor factor
× event factor
```

## 5. Implement Capacity and Sales

```text
capacity = staff count × capacity per employee
units sold = min(demand, capacity)
lost sales = demand − units sold
```

Exclude inventory constraints from the first MVP.

## 6. Implement Financial Results

Calculate:

- revenue
- bean cost
- labor cost
- fixed cost
- marketing cost
- net profit
- closing cash

Add a reconciliation assertion every quarter.

## 7. Implement State Updates

Update and clamp:

- cash
- reputation
- loyal customers
- staff morale
- quarter number

## 8. Build the Quarter Resolver

```text
resolveQuarter(
  previousState,
  playerDecision,
  competitorAction,
  marketEvent,
  simulationConfig
)
```

Return the quarter result, next state, and causal metrics.

## 9. Add Engine Tests

Test:

1. Default quarter
2. Very high price
3. Very low price
4. Zero marketing
5. Excessive marketing
6. Too few employees
7. Premium beans
8. Bankruptcy
9. Reconciliation
10. Deterministic replay

## 10. Create a CLI Harness

Run four quarters with hardcoded decisions and external factors.

## 11. Build the Browser Game with Mocked Agents

Create:

- start screen
- status cards
- decision form
- result summary
- P&L table
- demand-versus-capacity chart
- next-quarter flow

The complete game must already be playable here.

## 12. Add Persistence

Start with server memory. Add PostgreSQL after the core flow is stable.

The server remains authoritative.

## 13. Integrate the Professor Agent

Send trusted engine results and receive:

- headline
- explanation
- business concept
- Socratic question

## 14. Integrate the Competitor Agent

Give it only public information. Receive a bounded price change, marketing level, strategy, and public statement.

## 15. Integrate the Event Agent

Use a curated event library. The agent chooses event type, severity, and narrative. The engine maps those choices to numerical effects.

## 16. Add AI Reliability Controls

For every agent:

- schema validation
- hard bounds
- timeout
- fallback
- error logging
- input snapshot
- output snapshot
- fallback-used flag

## 17. Add a Fixed Demo Scenario

Create a reproducible seed with a meaningful market event, competitor response, and Professor explanation.

## 18. Add Kenji

Implement in this order:

1. hidden state
2. one trigger
3. short conversation
4. evaluator schema
5. structured promise
6. promise verification
7. Professor feedback

## 19. Add Advanced Features

Recommended order:

1. Wage modifier
2. Morale lag
3. Forward contracts
4. Bean inventory
5. Spoilage
6. Loyalty program
7. Loans
8. Second location
9. Renovation
10. Final report card

## 20. Prepare Submission

Prepare:

- public URL
- fixed demo seed
- architecture diagram
- README
- setup instructions
- fallback explanation
- demo video
- project description
- known limitations

## Final MVP Definition

The MVP is complete when it has:

- 4 playable quarters
- 4 player decisions
- deterministic accounting
- adaptive competitor
- controlled market events
- AI professor feedback
- validation and fallbacks
- charts and P&L
- public deployment
- repeatable demo
