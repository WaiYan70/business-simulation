# ADR 0002: Guest Trial and Daily Completion Limit

## Status
Accepted for MVP.

## Decision
- one completed game per signed guest identity
- authentication required afterward
- three completed games per authenticated user per UTC day
- count final completions, not starts
- one active game per principal
- server-side enforcement
- unique completion usage record per game
- guest trial does not consume authenticated daily allowance
- timestamp-window calculation instead of a reset cron job

## Why
It gives immediate value before registration, treats crashes fairly, controls recurring cost, and remains straightforward to explain.

## Tradeoffs
Guest limits can be bypassed with another browser or cleared cookies. UTC reset is simpler but less personal than local midnight. Final-turn concurrency requires transactional enforcement.

## Rejected
Login-first flow, start-based counting, IP quota, invasive fingerprinting, and account-local reset for MVP.
