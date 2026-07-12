# Kissaten Tycoon — Project Summary

## Overview

Kissaten Tycoon is an AI-powered educational business simulation game delivered as a web application.

The player manages a specialty coffee shop in Tokyo and makes quarterly decisions about pricing, marketing, staffing, bean quality, competition, and market changes.

The game combines two systems:

1. A deterministic simulation engine that calculates every business and financial result.
2. AI agents that control behavior, narratives, competitor strategy, teaching feedback, and later employee conversations.

The deterministic engine owns every number. AI agents never calculate revenue, profit, cash, demand, or accounting results directly.

## Product Category

Kissaten Tycoon is:

- a web application from a software perspective
- a turn-based simulation game from a user-experience perspective
- an educational product from a learning perspective
- an AI-agent application from a technical perspective

## Core Gameplay Loop

```text
Player reviews the current business situation
        ↓
Player makes quarterly decisions
        ↓
AI competitor and market agents respond
        ↓
Deterministic engine calculates business results
        ↓
AI professor explains the consequences
        ↓
Player starts the next quarter
```

## Initial MVP Scope

The first MVP contains:

- 4 simulated quarters
- 1 coffee shop
- 4 player decisions
- deterministic business calculations
- 1 AI competitor
- 1 AI market event per quarter
- 1 AI professor explanation per quarter
- basic charts and a profit-and-loss summary
- fallback behavior if an AI response fails

The MVP does not initially include:

- user authentication
- multiple locations
- bank loans
- complex inventory accounting
- forward contracts
- employee conversations
- arbitrary promises
- real-time market data
- multiplayer
- classroom administration

## Main Differentiator

> Deterministic code simulates the business. AI simulates the people and market behavior around the business.

This makes the game financially consistent, explainable, testable, and resilient to unreliable AI output.
