# Kissaten Tycoon — Game Vision

## Product statement
Kissaten Tycoon is a web-based educational business simulation in which the player manages an existing Japanese specialty coffee shop over eight quarterly turns.

The game combines deterministic business simulation, meaningful strategy, explainable cause-and-effect, and AI-assisted teaching.

## Player fantasy
The player takes responsibility for a two-year-old kissaten that is stable but not optimized. The shop already has customers, staff, a menu, supplier relationships, operating history, reputation, and cash.

The player acts as the owner and balances growth, profitability, quality, employee health, and customer trust.

## Core loop
1. Review the business state.
2. Choose quarterly actions.
3. Advance the simulation.
4. Observe operational and financial results.
5. Read a transparent explanation.
6. Adjust the next strategy.

## Design pillars
### Explainable causality
Every important outcome must be traceable through a calculation trace.

### Deterministic numerical truth
The simulation engine owns revenue, expenses, profit, cash, demand, capacity, morale, quality, loyalty, and reputation. LLMs may explain or role-play, but they may not invent authoritative numbers.

### Meaningful tradeoffs
No decision should be universally best. Higher price may improve margin but reduce demand. Premium beans improve quality but increase cost. Marketing may create demand the shop cannot serve.

### Small decision surface
The MVP exposes a few decisions per quarter while interactions create depth.

### Educational feedback
The Professor explains business concepts using actual game results without prescribing one perfect move.

## MVP success criteria
A new player can:

- understand the game from the landing page
- start and complete one eight-quarter guest game without registering
- understand why major outcomes occurred and recognize at least one tradeoff
- sign in with Google before playing again
- complete up to three authenticated games per UTC day
- revisit completed authenticated games through game history

The experience should make the player want to replay with another strategy without hiding the rules or requiring an account before the first game.

## Long-term possibilities
Multiple scenarios, richer inventory, employee personalities, suppliers, loans, branches, competitor memory, scenario creation, and other business types are future work, not MVP requirements.
