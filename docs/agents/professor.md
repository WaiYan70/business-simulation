# Professor Agent

## Purpose

The Professor is an educational narrative agent. It explains what happened during a quarter, why it happened, which player decisions mattered, and which business concept the player should learn.

```text
Simulation engine calculates.
Professor explains.
```

The Professor never calculates or changes authoritative game values.

## When it runs

1. The player submits a valid decision.
2. The simulation engine processes the turn.
3. The turn and new state are committed to the database.
4. The application builds a safe Professor context.
5. The Professor generates a structured explanation.
6. The output is validated and saved.
7. A deterministic fallback is used when generation fails.

The AI request must not be part of the financial transaction.

## Input contract

```text
ProfessorContext
- quarter
- previousStateSummary
- playerDecision
- turnResult
- calculationTrace
- activeEventSummary
- competitorActionSummary
- priorTeachingTopics
- playerExperienceLevel
```

Example input:

```json
{
  "quarter": 2,
  "previousStateSummary": {
    "cash": 800000,
    "reputation": 62,
    "loyalty": 58,
    "morale": 71,
    "capacity": 900
  },
  "playerDecision": {
    "sellingPrice": 780,
    "marketingSpend": 120000,
    "staffAction": "keep",
    "beanQuality": "premium"
  },
  "turnResult": {
    "potentialDemand": 1099,
    "capacity": 900,
    "unitsSold": 900,
    "lostSales": 199,
    "revenue": 702000,
    "expenses": 540000,
    "profit": 162000,
    "endingCash": 962000
  },
  "calculationTrace": {
    "baseDemand": 1000,
    "priceModifier": 0.88,
    "marketingModifier": 1.12,
    "qualityModifier": 1.05,
    "eventModifier": 1.2,
    "competitorModifier": 0.93
  }
}
```

## Output contract

```text
ProfessorExplanation
- headline
- summary
- causes[]
- businessConcept
- reflectiveQuestion
- nextQuarterConsideration
- confidence
```

Example output:

```json
{
  "headline": "Strong demand, limited capacity",
  "summary": "Your festival-quarter marketing created more demand than the shop could serve.",
  "causes": [
    {
      "factor": "Local festival",
      "effect": "Increased potential demand by 20 percent."
    },
    {
      "factor": "Premium price",
      "effect": "Reduced price attractiveness but protected revenue per sale."
    },
    {
      "factor": "Capacity",
      "effect": "Limited sales to 900 orders and created 199 lost sales."
    }
  ],
  "businessConcept": "capacity_constraint",
  "reflectiveQuestion": "Would more capacity create enough additional profit to justify its cost?",
  "nextQuarterConsideration": "Compare hiring or training costs with the value of recoverable lost sales.",
  "confidence": "high"
}
```

## Authority

The Professor may:

- explain trace-backed causes
- summarize tradeoffs
- choose a business concept from an approved catalog
- ask reflective questions
- suggest what the player should analyze next

The Professor may not:

- alter game state
- revise saved results
- grant additional games
- invent numbers
- introduce hidden modifiers
- guarantee a future strategy will win
- claim causes not supported by the trace

## Explanation rules

- Use the player's actual values.
- Mention the most important two or three factors.
- Explain positive and negative effects.
- Avoid repeating the same lesson every quarter.
- Distinguish direct causes from secondary effects.
- State uncertainty when several factors contributed.
- Keep the explanation concise enough for a game screen.

## Example 1 — Price increase

Input summary:

```text
Price increased from ¥650 to ¥760
Demand decreased from 1,000 to 870
Revenue increased from ¥650,000 to ¥661,200
Profit increased from ¥120,000 to ¥145,000
Loyalty decreased by 2 points
```

Good explanation:

```text
Your price increase reduced demand, but the higher revenue per sale more than
offset the lost volume this quarter. Profit improved by ¥25,000.

The tradeoff is customer loyalty. Because quality did not improve at the same
time, some customers perceived weaker value.

Business concept: price elasticity.

Question: How much additional quality would support the higher price without
losing loyalty?
```

Bad explanation:

```text
Your strategy was perfect. Keep increasing prices and profit will always grow.
```

Why it is bad:

- ignores the loyalty decline
- predicts future outcomes without evidence
- treats one result as a universal rule

## Example 2 — Marketing exceeds capacity

Input summary:

```text
Marketing increased demand by 18 percent
Potential demand reached 1,050
Capacity remained 800
Lost sales reached 250
```

Good explanation:

```text
Your marketing worked, but the shop could not convert all of the new interest
into sales. Capacity limited sales to 800 orders, leaving 250 lost sales.

Business concept: operational bottleneck.

Question: Would staff training or another employee generate a better return
than another marketing increase?
```

## Example 3 — Cost cutting

Input summary:

```text
Budget beans reduced variable cost by ¥70 per order
Product quality fell by 8 points
Profit increased by ¥45,000
Reputation fell by 3 points
```

Good explanation:

```text
The lower bean cost improved short-term profit, but the quality decline started
to weaken reputation. This is a short-term margin versus long-term brand-value
tradeoff.
```

## Deterministic fallback

```text
Quarter 2 result

Profit: ¥162,000

Main positive factor:
- Festival demand increased potential demand by 20 percent.

Main negative factor:
- Capacity limited sales to 900 orders.

Business concept:
- Capacity constraint

Consider whether additional capacity would produce enough profit to cover its
cost.
```

## Validation

Validate that:

- all required fields exist
- the business concept is approved
- numeric claims exist in the input
- each cause maps to a calculation-trace factor
- confidence uses an allowed value
- output stays within the length limit

Invalid output triggers one controlled repair attempt or the deterministic fallback.

## Tests

Unit tests:

- valid structured output
- malformed JSON
- missing field
- unsupported numeric claim
- unknown business concept
- timeout or refusal
- deterministic fallback

Integration tests:

- Professor receives a persisted turn result
- Professor failure does not roll back the turn
- explanation belongs to the correct game and quarter
- retries do not create duplicate required explanations

## MVP recommendation

The Professor should be the first LLM-backed agent. Keep competitor decisions and event selection deterministic until the core game works reliably.
