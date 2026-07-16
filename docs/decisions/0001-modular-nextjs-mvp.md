# ADR 0001: Modular Next.js Monolith

## Status
Accepted.

## Decision
Use one Next.js repository and deployment. Separate UI, application, simulation, agents, auth, entitlements, and infrastructure internally. Keep simulation framework-independent.

## Why
This minimizes hackathon setup and deployment work while retaining boundaries that can later become monorepo packages.

## Consequences
Positive: faster delivery, one dependency graph, simple end-to-end changes, and future extraction path.

Negative: boundaries rely partly on discipline and lint/review; careless imports could couple simulation to Next.js.

## Rejected
Monorepo, separate simulation service, and microservices are rejected until there is a concrete multi-application or independent-deployment need.
