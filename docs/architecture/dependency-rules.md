# Dependency Rules

## Direction
```text
app/features -> application -> simulation/domain
application -> auth, entitlement, repository, and agent interfaces
infrastructure -> implementations of those interfaces
```

## Rules
### App and features
May use presentation types and application entry points. Must not contain or import private simulation rule implementations.

### Application
May orchestrate domain APIs and interfaces. Must not import React components or contain detailed business formulas.

### Simulation
May use only framework-independent utilities. Must not import Next.js, React, database clients, auth libraries, cookies, headers, LLM SDKs, environment configuration, or infrastructure implementations.

### Agents
May use agent contracts, simulation result types, validation, and provider interfaces. Must not persist authoritative game state directly.

### Auth
May use the selected auth library, database adapter, cryptography, and request/session helpers. Must not import simulation rules.

### Entitlements
May use principal types, repository interfaces, clock abstraction, and policy configuration. Must not trust client state.

### Infrastructure
May use external SDKs and implement application interfaces.

## Shared code
Do not turn `src/shared` into an unowned dumping ground. Modules expose small public APIs, and code should not deep-import private implementations.
