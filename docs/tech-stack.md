# Kissaten Tycoon — Technology Stack

## Architecture

The MVP uses a modular monolith inside one Next.js repository.

```text
Next.js UI and request layer
    -> application use cases
        -> simulation domain
        -> authentication and entitlements
        -> agent interfaces
        -> repositories
    -> infrastructure implementations
```

The simulation remains framework-independent TypeScript.

## Core stack

### Framework

- Next.js
- App Router
- React
- TypeScript

Reasons:

- one application for UI and server logic
- fast hackathon delivery
- simple deployment
- straightforward auth and persistence integration
- future package extraction remains possible

### Styling

- Tailwind CSS
- shadcn/ui
- Lucide icons
- Motion (animation)

### Client state

Use local React state for forms and small UI interactions. Add Zustand only when cross-component client state becomes difficult.

Authoritative game state must remain server-side.

### Validation

- Zod

Use it for request input, player decisions, agent structured output, environment variables, and persistence boundaries.

Domain invariants should still be enforced inside the simulation layer.

## Authentication

Recommended:

- Better Auth
- Google OAuth first
- database-backed sessions
- Secure, HttpOnly cookies

Do not build password storage, recovery, or session security from scratch for the hackathon.

## Guest identity

Use:

- cryptographically random opaque token
- Secure, HttpOnly, SameSite=Lax cookie
- database guest record

Do not store trusted quota counts or full game state in the cookie.

## Database

Recommended:

- PostgreSQL
- Neon for managed hosting
- Drizzle ORM

Prisma is also acceptable, but choose one ORM only.

PostgreSQL is preferred because the project needs transactions, ownership constraints, idempotency, and safe quota enforcement.

## Simulation engine

- pure TypeScript
- immutable state transitions
- injected seeded randomness
- centralized balance configuration
- no React, Next.js, database, or LLM imports

Suggested structure:

```text
src/simulation/
├── engine/
├── models/
├── rules/
├── scenarios/
├── random/
├── config/
└── tests/
```

## AI integration

Create a project-owned provider interface so the rest of the application does not depend directly on one vendor SDK.

MVP usage:

- Professor: LLM-backed with structured output and fallback
- Competitor: deterministic policy first
- Events: controlled catalog with optional AI narration

Validate all agent output with Zod. Keep AI calls outside authoritative database transactions.

## Testing

- Vitest
- React Testing Library
- Playwright optionally for one complete end-to-end flow

Test:

- simulation rules
- full turn processing
- deterministic replay
- immutable state
- entitlement calculations
- guest-to-user claim
- duplicate completion protection
- agent validation and fallback

## Charts

- Recharts

Use for revenue, profit, cash, demand, morale, quality, loyalty, and reputation trends.

## Rate limiting

Apply server-side rate limits to:

- authentication
- guest creation
- game creation
- turn submission
- Professor generation

Rate limiting is separate from the daily game-completion quota.

## Deployment

MVP:

- Vercel
- Neon PostgreSQL
- external AI provider
- OAuth provider

Expected environment variables:

```text
DATABASE_URL
BETTER_AUTH_SECRET
BETTER_AUTH_URL
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
AI_PROVIDER_API_KEY
AUTHENTICATED_DAILY_COMPLETION_LIMIT
GUEST_COOKIE_SECRET
```

Never expose server secrets through `NEXT_PUBLIC_`.

## Future production structure

```text
apps/
├── web/
└── worker/

packages/
├── simulation-engine/
├── domain-models/
├── agent-system/
├── database/
└── shared/
```

Do not introduce this monorepo until reuse or deployment boundaries justify it.
