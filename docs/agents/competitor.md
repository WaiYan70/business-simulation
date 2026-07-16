# Competitor Agent

## Purpose

The Competitor system represents a rival coffee shop. It chooses constrained business actions that influence the market and create strategic pressure.

```text
Competitor chooses actions.
Simulation engine calculates effects.
```

The competitor never directly edits the player's demand, revenue, profit, cash, loyalty, or reputation.

## MVP implementation

Use a deterministic policy agent first.

An LLM may later generate:

- short rationale
- business-news text
- competitor personality

The authoritative action must still come from validated policy logic.

## Competitor state

```text
CompetitorState
- id
- name
- strategyType
- pricePosition
- marketingIntensity
- qualityPosition
- reputation
- cashPressure
- aggression
- lastAction
- actionHistory
```

## Strategy types

### Cost leader

- prefers lower prices
- uses standard quality
- increases marketing when losing market share

### Premium specialist

- prefers higher prices
- invests in quality
- avoids aggressive discounts

### Aggressive growth

- uses strong marketing
- accepts lower short-term margin
- reacts quickly to player growth

### Conservative local shop

- changes slowly
- protects cash
- prefers stable pricing

For the MVP, one competitor and one strategy are enough.

## Input contract

```text
CompetitorContext
- quarter
- competitorState
- marketState
- playerPublicState
- playerPreviousDecision
- previousTurnResultSummary
- activeEvent
- strategyConfiguration
- seededRandomSource
```

The competitor may observe:

- public selling price
- visible marketing activity
- public reputation
- market trend
- approximate player momentum

It should not know:

- hidden player cash
- internal staff morale
- future events
- private implementation details

## Output contract

```text
CompetitorDecision
- priceAction
- marketingAction
- qualityAction
- rationaleCode
- confidence
```

Example:

```json
{
  "priceAction": "decrease_small",
  "marketingAction": "increase_medium",
  "qualityAction": "keep",
  "rationaleCode": "defend_market_share",
  "confidence": "medium"
}
```

## Allowed actions

Price:

- decrease_small
- keep
- increase_small

Marketing:

- decrease
- keep
- increase_medium
- increase_high

Quality:

- reduce
- keep
- improve

The application maps these categories to configured values. The agent does not return arbitrary percentages.

## Decision flow

```text
Read strategy
    -> inspect market and player-visible results
    -> evaluate policy rules
    -> resolve equal choices with seeded randomness
    -> emit constrained decision
    -> validate decision
    -> include it in the next SimulationContext
```

## Example policy rules

```text
If strategy is aggressive_growth
and player market share increased strongly:
    increase marketing

If competitor price is much higher than player price:
    decrease price slightly

If premium demand increases:
    consider improving quality

Otherwise:
    keep the current position
```

## Example 1 — Defend market share

Context:

```text
Player market share increased from 28% to 36%
Player used high marketing
Competitor strategy: aggressive growth
Competitor cash pressure: low
```

Decision:

```json
{
  "priceAction": "keep",
  "marketingAction": "increase_high",
  "qualityAction": "keep",
  "rationaleCode": "defend_market_share",
  "confidence": "high"
}
```

The simulation engine maps this to a configured market-pressure modifier for the next quarter.

## Example 2 — Premium competitor during shortage

Context:

```text
Strategy: premium specialist
Event: premium bean shortage
Quality position: premium
```

Decision:

```json
{
  "priceAction": "increase_small",
  "marketingAction": "keep",
  "qualityAction": "keep",
  "rationaleCode": "protect_margin_during_shortage",
  "confidence": "medium"
}
```

## Example 3 — Conservative competitor

Context:

```text
Player lowered price slightly
Market demand is stable
Strategy: conservative local shop
```

Decision:

```json
{
  "priceAction": "keep",
  "marketingAction": "keep",
  "qualityAction": "keep",
  "rationaleCode": "maintain_stability",
  "confidence": "high"
}
```

Not every quarter requires a dramatic response.

## Anti-cheating rules

The competitor must not:

- inspect hidden future events
- use private player financial data
- react before the player's prior turn is committed
- directly reduce player metrics
- exceed configured action bounds
- receive unlimited money or capacity
- switch personality without a defined reason

## Memory

MVP memory can contain:

- last three competitor decisions
- last three public player decisions
- market-share trend
- current strategy type

Do not add vector memory or conversational memory initially.

## Optional LLM narration

Input:

- validated competitor decision
- competitor name and strategy
- public market context

Output example:

```text
Hikari Coffee launches a neighborhood campaign after losing market share.
```

The narration cannot change the action.

## Validation

Validate:

- actions belong to approved enums
- the combination is permitted
- price and marketing bounds are respected
- the quarter matches the expected quarter
- the rationale code is approved

## Tests

Policy tests:

- aggressive strategy reacts to player growth
- premium strategy protects quality
- conservative strategy changes slowly
- cash pressure limits aggressive spending
- same state and seed reproduce the same action

Boundary tests:

- maximum marketing action is respected
- invalid actions are rejected
- unknown strategy uses a safe fallback

Integration tests:

- competitor action enters the next simulation context
- competitor cannot mutate game state directly
- decisions are stored in history
- narration failure does not block gameplay

## MVP recommendation

Start with one competitor:

```text
Name: Hikari Coffee
Strategy: aggressive growth
```

Use only price, marketing, and quality actions until this creates understandable pressure.
