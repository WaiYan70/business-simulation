<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Kissaten Tycoon — Codex Instructions

## Project purpose

Kissaten Tycoon is a web-based business simulation game in which the
player manages an existing Japanese specialty coffee shop.

The MVP should teach business decision-making through transparent,
deterministic cause-and-effect.

The simulation engine is the authority for game numbers.
LLMs may explain results, role-play characters, or propose constrained
decisions, but they must not invent or directly mutate financial results.

## Current project stage

This repository is a hackathon MVP built as a modular Next.js application.

Do not introduce a monorepo, microservices, message queues, event sourcing,
or distributed infrastructure unless the user explicitly requests it.

Optimize for:

1. A complete playable gameplay loop
2. Understandable simulation rules
3. Deterministic and testable calculations
4. Clear separation between engine, application, UI and AI
5. Fast hackathon delivery without blocking future extraction

## Source-of-truth documentation

Read relevant documents before designing or changing behavior:

- Product vision: `docs/product/game-vision.md`
- MVP scope: `docs/product/mvp-scope.md`
- Gameplay loop: `docs/product/gameplay-loop.md`
- Architecture: `docs/architecture/overview.md`
- Engine rules: `docs/architecture/simulation-engine.md`
- Agent boundaries: `docs/architecture/agent-system.md`
- Domain vocabulary: `docs/domain/glossary.md`
- Turn lifecycle: `docs/domain/turn-processing.md`
- Business formulas: `docs/domain/formulas.md`

When implementation and documentation disagree, report the disagreement.
Do not silently choose one.

## Communication modes

The user is learning how simulation engines, domain models and AI agents work.

### Learning mode

Use learning mode when the user asks to:

- explain
- teach
- guide
- help me build it myself
- give hints
- review my understanding
- plan without editing

In learning mode:

1. Do not edit files unless explicitly requested.
2. Explain the problem and desired outcome first.
3. Explain the mental model.
4. Identify inputs, outputs, invariants and edge cases.
5. Present the processing flow or pseudocode.
6. Give the user a small implementation task to attempt.
7. Prefer hints over complete implementation.
8. Review the user's attempt and explain mistakes precisely.
9. Do not reveal a full solution merely because it is faster.

### Implementation mode

Use implementation mode only when the user explicitly asks Codex to:

- implement
- create
- edit
- fix
- refactor
- write the feature

In implementation mode:

1. Inspect existing code and relevant documentation first.
2. State a concise implementation plan.
3. Keep changes within the requested scope.
4. Do not redesign unrelated modules.
5. Add or update tests.
6. Run applicable validation commands.
7. Report changed files, behavior, tests and remaining risks.
8. Explain important code so the user can learn from the implementation.

If the user's intent is ambiguous or confusing or unclear, default to analysis and planning without
editing files.

## Architecture boundaries

The main dependency flow is:

`UI -> application use cases -> simulation/domain`

Infrastructure supplies external implementations for application interfaces.

### Simulation layer

Files under `src/simulation/` must:

- use framework-independent TypeScript
- be deterministic for identical input and random seed
- avoid React, Next.js, database and network dependencies
- avoid reading environment variables
- avoid calling an LLM
- receive all required data through function parameters
- return new state instead of mutating input state
- provide enough calculation detail to explain results
- be covered by unit tests

The simulation engine owns numerical truth, including:

- demand
- capacity
- units sold
- revenue
- expenses
- profit
- cash
- morale
- quality
- reputation
- loyalty

### Application layer

Files under `src/application/` coordinate use cases such as:

- starting a game
- loading a game
- submitting decisions
- advancing a quarter
- persisting results
- requesting agent outputs

Application use cases may orchestrate modules but should not contain
low-level business formulas.

### Agent layer

Files under `src/agents/` may:

- observe validated game state
- inspect turn results and calculation traces
- produce structured explanations
- propose constrained actions
- generate narrative text

Agents must not:

- directly update persisted game state
- calculate authoritative revenue or profit
- bypass application validation
- return unrestricted arbitrary objects
- conceal whether output came from deterministic rules or an LLM

All agent outputs must be schema-validated before use.

### UI layer

React components must not contain simulation formulas.

UI components may:

- collect decisions
- display state
- display calculations and explanations
- invoke application-facing actions

## Domain terminology

Use these terms consistently:

- `GameState`: complete authoritative state at a point in time
- `PlayerDecision`: choices submitted for one turn
- `SimulationContext`: external deterministic inputs for the turn
- `TurnResult`: calculated outcome of processing a decision
- `CalculationTrace`: structured explanation of intermediate calculations
- `Domain model`: TypeScript representation of game concepts
- `AI model`: external language model; never abbreviate this to just
  "model" when ambiguity is possible
- `Agent`: component that observes context and returns a constrained action
  or explanation
- `Rule`: focused deterministic business calculation
- `Engine`: orchestrator that applies rules in a defined order

Update `docs/domain/glossary.md` when introducing important domain language.

## Simulation design rules

Every rule should make the following clear:

- input
- output
- units
- valid range
- formula or decision table
- assumptions
- edge cases
- interaction with other rules

Avoid unexplained magic numbers.

Put tunable values in named configuration objects rather than scattering
numeric literals across functions.

For important calculations, return or record a trace such as:

- base value
- modifiers
- capped or clamped value
- final value
- reasons

Do not use uncontrolled `Math.random()` in simulation logic.
Randomness must come from an injected seeded random source.

## State safety

Treat game state as immutable input.

Do not mutate objects received by simulation functions.

Validate invariants after processing a turn, including:

- values expected to be non-negative remain non-negative
- percentages remain in their defined range
- quarter progression is valid
- all numeric outputs are finite
- cash movement reconciles with profit and other explicit cash movements

When an invariant fails, throw a domain-specific error rather than silently
repairing unknown corruption.

## Testing expectations

Test simulation behavior using Arrange, Act, Assert.

For each important rule, test:

- normal case
- minimum boundary
- maximum boundary
- invalid input
- interaction with at least one relevant modifier

For the full turn engine, test:

- same state + same decision + same seed gives the same result
- input state is not mutated
- financial calculations reconcile
- calculation trace matches the result
- output satisfies all invariants

Avoid tests that only duplicate implementation details.
Prefer behavior-oriented assertions.

## Scope discipline

For every task, identify:

- requested outcome
- affected module
- out-of-scope concerns
- completion criteria

Do not add abstractions merely because they may be useful later.

Create an abstraction when at least one of these is true:

- there are already multiple implementations
- an external side effect needs isolation
- a boundary is required for deterministic testing
- the domain concept is independently meaningful

## Dependency policy

Before installing a production dependency:

1. Explain the problem it solves.
2. Check whether the existing stack already solves it.
3. Explain its maintenance and bundle/runtime cost.
4. Ask for approval unless the user explicitly requested that dependency.

Prefer platform and existing-project capabilities for small utilities.

## Commands

Use the package manager indicated by the repository lockfile.

Before declaring an implementation complete, run the applicable commands:

- type checking
- linting
- unit tests
- production build when the change affects integration or deployment

Never claim a command passed unless it was executed successfully.

If a command cannot run, state exactly why.

## Git and change safety

- Do not discard user changes.
- Do not reset, clean, force-push or rewrite history without explicit approval.
- Do not commit generated secrets or `.env` files.
- Keep changes narrowly related to the requested task.
- Do not create commits unless asked.
- Show unexpected pre-existing changes before modifying related files.

## Definition of done

A simulation feature is complete only when:

- its behavior and boundaries are documented
- inputs and outputs are typed
- formulas or decision rules are explicit
- edge cases are handled
- tests cover meaningful behavior
- no forbidden dependency enters the simulation layer
- applicable checks pass
- the final response explains what changed and what remains
