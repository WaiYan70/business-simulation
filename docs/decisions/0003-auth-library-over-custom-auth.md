# ADR 0003: Authentication Library Over Custom Password Auth

## Status
Accepted for MVP.

## Decision
Use a maintained Next.js-compatible authentication library with database-backed users and secure sessions. Start with one OAuth provider when practical. Hide library-specific session details behind `PlayerPrincipal`.

The project owns the guest identity mechanism because it is a pre-auth product identity, not a full account system.

## Why
Authentication is not the hackathon innovation. Building password storage, recovery, account linking, OAuth, and session security from scratch would consume time and increase risk.

## Consequences
Positive: faster and safer implementation, proven integrations, and less security code.

Negative: library-specific schema, dependency upgrades, provider configuration, and possible future migration cost.
