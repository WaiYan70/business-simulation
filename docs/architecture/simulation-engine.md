# Simulation Engine Architecture

## Contract
```text
simulateTurn(currentState, playerDecision, simulationContext)
  -> { nextState, turnResult, calculationTrace, domainEvents }
```

## Requirements
- identical state, decision, configuration, context, and seed produce identical output
- input state is immutable
- no React, Next.js, cookies, sessions, database, network, filesystem, LLM, or environment access
- all external values arrive through parameters
- important calculations expose traces

## Pipeline
1. normalize context
2. calculate potential demand
3. calculate capacity
4. calculate units sold and lost sales
5. calculate revenue
6. calculate variable costs
7. calculate fixed costs
8. calculate profit and cash
9. update morale and quality
10. update loyalty and reputation
11. update cumulative metrics
12. advance the quarter
13. validate invariants

## Numerical rules
- use integer currency units where practical
- document rounding boundaries
- reject non-finite values
- use consistent score and modifier ranges
- do not mix monthly and quarterly units without conversion
- use injected seeded randomness instead of uncontrolled `Math.random()`

## Invariants
- quarter advances once
- numbers are finite
- bounded metrics stay in range
- units sold do not exceed demand or capacity
- profit reconciles with revenue and expenses
- cash reconciles with prior cash and explicit movements
- input state is unchanged

## Testing
Test rules for normal, boundary, invalid, interaction, and rounding cases. Test the engine for replay, immutability, pipeline order, reconciliation, trace consistency, and invariants.
