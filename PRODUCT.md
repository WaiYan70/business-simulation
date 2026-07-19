# Product

## Register

product

## Platform

web

## Users

The primary user is a new or returning player who wants to practice business decision-making through a compact, replayable simulation. They are managing a Japanese specialty coffee shop one quarter at a time and need to understand the relationship between price, demand, capacity, staffing, quality, morale, loyalty, reputation, profit, and cash without needing specialist finance knowledge.

The product must support both guests, who can complete one trial game without registration, and authenticated players, who can complete up to three games per UTC day and retain game history. In either state, the player's central job is the same: review the shop, make a small set of consequential decisions, understand the result, and adjust the next-quarter strategy.

## Product Purpose

Kissaten Tycoon is a four-quarter educational business simulation built around transparent, deterministic cause and effect. It exists to make business tradeoffs understandable through play: every important numerical outcome comes from the simulation engine, while the Professor and other narrative systems explain or contextualize those outcomes without inventing financial truth.

Success means a visitor can start quickly, complete a full run, understand why major outcomes occurred, recognize at least one meaningful tradeoff, and want to replay with a different strategy. The experience must remain complete when AI-generated teaching content is unavailable by using deterministic fallback explanations.

## Positioning

Kissaten Tycoon is a compact management game where every consequential number is reproducible and every important result can be explained.

## Brand Personality

The experience is warm, tactile, thoughtful, calm, and strategic. It should feel nostalgic and approachable, like working through a well-kept shop ledger at the counter, while still communicating that quarterly decisions have meaningful and sometimes uncomfortable consequences.

The voice is observant and grounded. It explains business concepts in plain language, respects the player's agency, and invites reflection instead of prescribing a single perfect move. Japanese specialty-coffee context should give the product character without turning the interface into a decorative theme.

## Anti-references

Kissaten Tycoon must not resemble a generic SaaS dashboard. Avoid anonymous enterprise analytics styling, interchangeable metric cards, and visual structure that makes the game feel like office software.

It must also avoid crypto dashboards, casino-style mobile games, neon cyberpunk styling, excessive glassmorphism, and unnecessary card-heavy layouts. Nostalgia must not become faux paper texture, ornamental clutter, or stereotyped Japanese decoration.

## Design Principles

1. **Make consequences legible.** Show the current condition, the player's decision, the resulting change, and the explanation as one understandable chain.
2. **Keep numerical truth distinct from narrative.** Engine-owned values must look authoritative and inspectable; AI-generated or role-play content must read as interpretation, not calculation.
3. **Create depth through tradeoffs, not control count.** Keep the quarterly decision surface small and make interactions between decisions carry the complexity.
4. **Use warmth with restraint.** Build atmosphere through typography, language, rhythm, and tactile interaction rather than decoration or visual effects.
5. **Support deliberate play.** Make comparison easy, preserve context while decisions are being made, and clearly communicate when an action is final.

## Accessibility & Inclusion

The product targets WCAG 2.2 AA. Text and interactive controls must meet the relevant contrast requirements; all gameplay actions must be keyboard accessible; focus must remain visible; and status, selection, warnings, and trends must never depend on color alone.

Motion must respect `prefers-reduced-motion` and should communicate state rather than decorate the page. Charts and visual indicators require text equivalents. Financial values, units, quarter labels, validation feedback, and irreversible actions must remain readable and unambiguous at supported viewport sizes and zoom levels.

## Assumptions

- The documentation defines a "new player" but does not name a demographic persona. Until user research says otherwise, the primary audience is assumed to include business-curious adults, students, aspiring operators, and casual strategy players without specialist finance training.
- The current implementation establishes a desktop-first dashboard that collapses responsively, but the product documents do not define a dedicated mobile gameplay flow. Mobile web remains supported in principle; its interaction model requires validation.
- English is the current interface language, with Japanese terms used selectively for setting and identity. Localization and Japanese-language support are not yet specified.
- The existing semantic theme tokens and current dashboard components are treated as the visual baseline. Their values may change later without changing the product strategy captured here.
