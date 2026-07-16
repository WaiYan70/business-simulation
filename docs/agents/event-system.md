# Event System

## Purpose

The Event System introduces business conditions that affect a quarter. Events create replayability and require adaptation.

The Event System is not necessarily an AI agent.

```text
Event system selects conditions.
Simulation engine applies effects.
AI may narrate the event.
```

For the MVP, selection and numeric effects should be deterministic code.

## What counts as an event?

An event is a discrete business condition with:

- a known source
- a trigger
- a duration
- predefined effects
- a player-visible explanation

Examples:

- local festival
- heavy rain
- bean shortage
- machine breakdown
- influencer visit
- utility price increase

## What is not an event?

Normal consequence:

```text
Higher price -> lower price attractiveness
```

This belongs to simulation rules.

Competitor action:

```text
Competitor lowers price
```

This belongs to the competitor system, although it may appear in the news feed.

Professor explanation is narration, not an event.

## Event sources

### External

Outside the player's control.

Examples:

- festival
- weather
- tourism change
- economic slowdown

### Triggered

Caused when game state meets a condition.

Examples:

- low morale triggers burnout
- high reputation triggers media attention
- repeated lost sales trigger complaints

### Scheduled

Defined by the scenario or quarter.

Examples:

- rainy season in quarter 2
- holiday season in quarter 4

### Competitor-originated

Displayed as business news but produced by the competitor system.

## Event categories

- market
- supply
- operational
- customer_and_reputation
- economic_and_regulatory

Use regulatory events sparingly in the MVP.

## Trigger types

```text
scheduled
seeded_random
condition
competitor
```

## Event schema

```text
BusinessEventDefinition
- id
- name
- category
- source
- triggerType
- duration
- eligibilityRules
- modifiers
- playerSummary
- narrativeKey
- severity
- version
```

Example:

```json
{
  "id": "local_festival",
  "name": "Local Festival",
  "category": "market",
  "source": "external",
  "triggerType": "seeded_random",
  "duration": 1,
  "eligibilityRules": {
    "quarters": [2, 3, 4]
  },
  "modifiers": {
    "demandMultiplier": 1.2,
    "marketingEffectivenessMultiplier": 1.1
  },
  "playerSummary": "A local festival increases foot traffic.",
  "narrativeKey": "event.local_festival",
  "severity": "positive",
  "version": 1
}
```

## Selection order

```text
1. Resolve mandatory scheduled event
2. Evaluate triggered events
3. Resolve seeded random event
4. Resolve competitor action separately
5. Build SimulationContext
6. Run simulation
7. Narrate the selected event
```

## Stacking rules

For the MVP:

- allow at most one numeric external event per quarter
- competitor effects may also apply
- triggered warnings may appear without numeric effects
- avoid the same event in consecutive quarters unless explicitly allowed
- record every applied modifier in the calculation trace

## Seeded randomness

Do not use uncontrolled `Math.random()`.

Derive event selection from values such as:

```text
gameSeed + quarter + eventSelectionNamespace
```

The same game state, seed, and configuration should select the same event.

## Eligibility rules

An event may define:

- allowed quarters
- minimum reputation
- maximum morale
- required prior event
- cooldown
- scenario tags
- incompatible events

## Duration

MVP duration values:

- instant
- one_quarter
- remaining_game

Prefer one-quarter events. Long-duration events require explicit expiration logic.

## Allowed modifier types

```text
demandMultiplier
marketingEffectivenessMultiplier
capacityMultiplier
variableCostMultiplier
fixedCostDelta
qualityDelta
moraleDelta
reputationDelta
```

Every modifier must be:

- predefined
- bounded
- documented with units
- visible in traces
- tested

## Example 1 — Local festival

```text
Category: market
Duration: one quarter
Effects:
- demand × 1.20
- marketing effectiveness × 1.10
```

Player message:

```text
A neighborhood festival is bringing more visitors to the area this quarter.
```

## Example 2 — Heavy rain

```text
Category: market
Duration: one quarter
Effect:
- walk-in demand × 0.85
```

If delivery is not in the MVP, do not add delivery-specific effects.

## Example 3 — Premium bean shortage

```text
Category: supply
Duration: one quarter
Effect:
- premium bean cost × 1.25
```

Keep premium beans available initially. Temporary unavailability requires more UI and decision validation.

## Example 4 — Espresso machine breakdown

```text
Category: operational
Duration: one quarter
Effects:
- capacity × 0.80
- maintenance fixed cost + ¥80,000
```

## Example 5 — Influencer visit

Eligibility:

```text
reputation >= 75
```

Effects:

```text
demand × 1.15
```

Optional post-turn result:

```text
reputation +2 only if service quality and capacity were adequate
```

The reward should depend on actual execution, not only the event appearing.

## Example 6 — Staff burnout

Condition:

```text
morale < 25
and capacity utilization > 90%
for two consecutive quarters
```

Effects:

```text
capacity × 0.90
morale -5
```

This is indirectly caused by the player's earlier decisions.

## Example 7 — Customer complaint warning

Condition:

```text
lost sales rate > 25%
```

First occurrence:

- show warning
- no extra numeric penalty

Repeated occurrence:

```text
reputation -2
```

## Full resolution example

Inputs:

```text
Quarter: 2
Game seed: 48152
Eligible events:
- local_festival
- heavy_rain
- supplier_discount
- no_event
```

Selected event:

```text
local_festival
```

Simulation context:

```json
{
  "activeEvent": {
    "id": "local_festival",
    "version": 1,
    "demandMultiplier": 1.2,
    "marketingEffectivenessMultiplier": 1.1
  }
}
```

Trace:

```json
{
  "baseDemand": 1000,
  "eventDemandModifier": 1.2,
  "marketingModifierBeforeEvent": 1.08,
  "marketingModifierAfterEvent": 1.188
}
```

## AI narration

Optional narration input:

- selected event definition
- quarter
- public market context
- shop name

Example output:

```text
Festival banners fill the neighborhood, and foot traffic begins rising around the station.
```

AI may not change the event or its numeric effects.

## Failure behavior

- Selection failure: use `no_event`.
- Invalid catalog configuration: fail during startup or tests.
- Narration failure: show the predefined player summary.
- Unknown saved event version: use migration or explicit compatibility logic.

Do not silently invent replacement effects.

## Persistence and versioning

Save:

- event ID
- event version
- resolved numeric modifiers
- trigger source
- quarter

Persisting resolved modifiers keeps old results auditable after balance changes.

## Tests

Catalog tests:

- unique event IDs
- valid categories and triggers
- bounded modifiers
- valid duration
- valid eligibility rules

Selection tests:

- same seed selects the same event
- ineligible events are excluded
- cooldown works
- scheduled event has priority
- `no_event` fallback works

Trigger tests:

- burnout requires all conditions
- influencer visit requires reputation threshold
- complaint warning follows lost-sales rate
- events do not fire repeatedly by mistake

Integration tests:

- modifiers enter `SimulationContext`
- trace records each effect
- event system cannot mutate game state directly
- narration failure does not block the turn
- saved results retain resolved event details

## Recommended MVP catalog

External events:

1. Local festival
2. Heavy rain
3. Tourism increase
4. Economic slowdown
5. Premium bean shortage
6. Supplier discount
7. Espresso machine breakdown
8. Utility price increase
9. Influencer visit
10. No event

Triggered notifications:

1. Staff burnout warning
2. Customer complaint warning
3. Cash-pressure warning
4. Strong-reputation opportunity

## MVP recommendation

Start with one event per quarter, ten predefined events, seeded selection, two triggered warnings, and optional AI narration only.
