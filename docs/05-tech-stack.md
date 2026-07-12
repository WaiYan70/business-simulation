# Kissaten Tycoon — Recommended Tech Stack

## Architecture

Use a single full-stack Next.js application for the hackathon MVP.

```text
Browser
  ↓
Next.js application
  ├── React game interface
  ├── server routes
  ├── deterministic TypeScript engine
  ├── OpenAI agent adapters
  └── database access
```

## Core Stack

### Language

- TypeScript

### Web Framework

- Next.js
- React
- App Router

### UI

- Tailwind CSS
- shadcn/ui
- Lucide icons

### Charts

- Recharts

Recommended charts:

- cash by quarter
- profit by quarter
- demand versus capacity
- reputation trend
- market-share trend

### Validation

- Zod

Use it for:

- player decisions
- route inputs
- game-state persistence
- agent outputs
- evaluator outputs

### AI

- Official OpenAI JavaScript/TypeScript SDK
- GPT-5.6
- Structured Outputs

Suggested modules:

```text
agents/
  professor.ts
  competitor.ts
  event.ts
  kenji.ts
  kenji-evaluator.ts
  schemas.ts
  clamps.ts
  fallbacks.ts
```

### Simulation Engine

Use plain TypeScript with no React, Next.js, OpenAI, or database dependency.

```text
engine/
  config.ts
  types.ts
  validate-decisions.ts
  demand.ts
  capacity.ts
  finance.ts
  loyalty.ts
  morale.ts
  reputation.ts
  resolve-quarter.ts
```

### Testing

- Vitest

Prioritize:

- formula correctness
- state transitions
- reconciliation
- clamping
- fallback behavior
- deterministic seeds
- bankruptcy
- extreme decisions

### Persistence

For the earliest prototype:

- in-memory game state
- JSON fixtures

For the deployed MVP:

- PostgreSQL
- Neon
- Drizzle ORM

Suggested tables:

- games
- game_states
- quarter_decisions
- quarter_results
- agent_outputs
- kenji_conversations
- promises

### Deployment

- Vercel
- Neon

### Authentication

Do not build authentication for the first MVP.

Use generated game IDs and temporary browser session identifiers.

## Money Representation

Store money as integer yen.

```ts
const revenueYen = unitsSold * priceYen;
```

Avoid floating-point money values.

## Environment Variables

```text
OPENAI_API_KEY
DATABASE_URL
APP_URL
DEMO_SEED
```

Never expose the OpenAI API key to the browser.

## Why a Single Next.js App?

It avoids:

- two deployments
- CORS setup
- duplicated contracts
- extra environment configuration

A separate backend can be introduced later if needed.
