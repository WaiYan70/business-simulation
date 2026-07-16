# Game State

## Purpose
`GameState` is the complete authoritative domain state needed to process the next turn. It is not a React state object or a database row.

## Suggested structure
```text
GameState
- gameId
- scenarioId
- version
- currentQuarter
- status
- shop
- market
- competitor
- activeEvent
- cumulative
```

## Shop
Finance: cash, selling price, previous revenue, expenses, and profit.

Customers: baseline demand, loyalty, reputation, prior demand, units sold, and lost sales.

Staff: count, payroll, morale, productivity, and training.

Operations: bean tier, product quality, service quality, and capacity.

## Market
Baseline demand, seasonality, economy, competition intensity, and trend.

## Competitor
Price position, marketing intensity, quality position, strategy, and reputation.

## Active event
Catalog ID, quarter, predefined modifiers, and player-visible description key.

## Cumulative
Revenue, expenses, profit, units sold, lost sales, and summaries needed for the final report.

## Units
Document every unit: yen, yen/order, orders/quarter, score 0–100, or multiplier around 1.0.

## Invariants
- version is non-negative
- quarter and status agree
- money values are finite integers
- staff and capacity are non-negative
- bounded scores stay within 0–100
- units sold do not exceed demand or capacity
- cumulative values reconcile with turn history

## Mutation
Simulation receives readonly state and returns a new state. Persistence-to-domain mapping must be explicit and tested.
