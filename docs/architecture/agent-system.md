# Agent System Architecture

## Principle
Agents add teaching, personality, and constrained decisions around the simulation. They do not own numerical truth.

## Agent categories
- deterministic policy agent: ordinary code and predefined rules
- LLM narrative agent: constrained natural-language output
- hybrid agent: deterministic authority plus LLM expression

## Required contract
Each agent defines purpose, input schema, permitted context, output schema, authority, forbidden actions, timeout behavior, and fallback.

## Professor
Input: player decision, previous state summary, turn result, calculation trace, and selected business concepts.

Output: concise summary, cause-and-effect explanation, one business lesson, one reflective question, and optional consideration.

The Professor cannot change state, revise financial results, grant quota, or claim unsupported causes.

## Competitor
Prefer deterministic policy for MVP. It returns constrained pricing, marketing, and quality choices, which the application validates before the next simulation.

## Events
Select from an approved event catalog with predefined numeric modifiers. An LLM may narrate the selected event but may not invent unrestricted effects.

## Reliability
All LLM output is runtime validated. Invalid or unavailable output triggers a controlled retry or deterministic fallback. Gameplay transactions never depend on narrative success.

## Data safety
Do not provide agents session tokens, cookies, credentials, secrets, or unrelated personal data. Treat generated output as untrusted.
