# Kissaten Tycoon — Purpose and Goals

## Purpose

Kissaten Tycoon helps learners understand business decisions through direct cause and effect.

Instead of reading definitions, the player experiences how decisions interact:

```text
Marketing increases demand
        ↓
Insufficient staffing creates lost sales
        ↓
Lost sales weaken reputation
        ↓
Lower reputation reduces future demand
```

## Problem

Traditional business education often separates pricing, marketing, operations, staffing, customer loyalty, competition, and financial management.

In a real business, these decisions affect one another.

Spreadsheet-based simulations can model numbers, but they often lack adaptive competitors, realistic narratives, human conversations, personalized explanations, and memory of earlier decisions.

## Solution

Kissaten Tycoon combines:

- a deterministic business engine
- AI-controlled market actors
- an AI professor
- persistent game history
- later, an AI employee relationship system

The engine provides trustworthy results. The AI layer makes the simulation adaptive, contextual, and human.

## Learning Goals

The MVP should teach:

1. Price elasticity
2. Demand versus capacity
3. Revenue versus profit
4. Fixed and variable costs
5. Marketing efficiency
6. Customer loyalty
7. Competitor reactions
8. Short-term versus long-term decisions

Later versions can teach contribution margin, operating leverage, inventory management, hedging, debt, expansion, motivation, trust, and organizational behavior.

## Hackathon Goal

The hackathon version should prove that:

1. A deterministic business model can work safely with AI agents.
2. AI agents can adapt without controlling financial truth.
3. An AI professor can explain causal relationships.
4. The game is understandable in a short demo.
5. The architecture can support advanced business and human-management mechanics.

## Success Criteria

A new player should be able to:

- understand the current condition
- make decisions without confusion
- see clear consequences
- understand why those consequences occurred
- complete the game without technical failure
- remember at least one business lesson

## Design Principles

### The engine owns the numbers

No AI response directly sets revenue, profit, cash, or accounting results.

### AI output is bounded

Every AI response uses a strict schema, validation, clamping, and fallback behavior.

### Cause and effect stays visible

```text
Decision → Immediate result → Delayed consequence
```

### Reliability is more important than feature count

A smaller complete game is better than a large unstable demo.

### AI must serve the learning experience

Every agent should improve the simulation, explanation, or emotional experience.
