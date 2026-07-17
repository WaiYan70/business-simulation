# Player Status

## Purpose

This document defines the different meanings of player status in Kissaten Tycoon.

The project must keep identity, access entitlement, game lifecycle, business performance, and final outcome as separate concepts.

Do not use one generic field such as:

```text
playerStatus = "active"
```

That value is ambiguous because it could mean:

- the player is signed in
- the account is allowed to play
- a game is currently active
- the business is still operating
- the daily limit has not been reached

Use explicit status types instead.

---

## 1. Player identity

Player identity describes who is making the request.

```text
PlayerPrincipal
- kind
- id
```

### Principal kinds

```text
guest
user
```

### Guest

A guest is identified by a secure guest cookie and a corresponding database record.

A guest may:

- start one trial game
- resume one active guest game
- complete one guest game
- sign in and claim eligible guest history

### User

A user is authenticated through the configured authentication system.

A user may:

- access owned games
- retain game history
- complete games within the daily allowance
- resume an active authenticated game

### Example

```json
{
  "kind": "user",
  "id": "usr_123"
}
```

Identity does not describe whether the player may start another game. That belongs to entitlement status.

---

## 2. Access entitlement status

Access entitlement describes whether the current principal may create, resume, or complete a game.

Recommended statuses:

```text
guest_trial_available
guest_trial_completed
authenticated_allowance_available
authenticated_limit_reached
active_game_exists
account_required
```

### Entitlement result

```text
PlayerEntitlementStatus
- status
- canStartGame
- canResumeGame
- canCompleteGame
- completedGamesToday
- dailyLimit
- remainingGames
- resetAt
- activeGameId
- reason
```

### Example: guest trial available

```json
{
  "status": "guest_trial_available",
  "canStartGame": true,
  "canResumeGame": false,
  "canCompleteGame": true,
  "completedGamesToday": null,
  "dailyLimit": 1,
  "remainingGames": 1,
  "resetAt": null,
  "activeGameId": null,
  "reason": "Guest has not completed the free trial."
}
```

### Example: authenticated allowance available

```json
{
  "status": "authenticated_allowance_available",
  "canStartGame": true,
  "canResumeGame": false,
  "canCompleteGame": true,
  "completedGamesToday": 2,
  "dailyLimit": 3,
  "remainingGames": 1,
  "resetAt": "2026-07-18T00:00:00Z",
  "activeGameId": null,
  "reason": "One authenticated completion remains in the current UTC window."
}
```

### Example: daily limit reached

```json
{
  "status": "authenticated_limit_reached",
  "canStartGame": false,
  "canResumeGame": false,
  "canCompleteGame": false,
  "completedGamesToday": 3,
  "dailyLimit": 3,
  "remainingGames": 0,
  "resetAt": "2026-07-18T00:00:00Z",
  "activeGameId": null,
  "reason": "The authenticated daily completion limit has been reached."
}
```

### Source of truth

Entitlement status is derived from server-side records.

Do not trust:

- client counters
- local storage
- hidden form values
- cookie fields containing remaining-game counts

---

## 3. Game lifecycle status

Game lifecycle status describes the persistence and progression state of one game.

Recommended MVP values:

```text
active
completed
archived
```

Optional future value:

```text
expired
```

### Active

The game has started and still has a pending quarter.

### Completed

The final quarter has been processed successfully.

A completed game:

- cannot accept another turn
- has a final report
- has one unique completion record
- counts toward the appropriate allowance

### Archived

The game was intentionally abandoned or replaced.

An archived game:

- cannot be resumed
- does not count as completed
- may remain available for audit or history

### Expired

Optional future status for inactive guest games. Do not add this until automatic expiry behavior is implemented.

### Example

```json
{
  "gameId": "game_123",
  "status": "active",
  "currentQuarter": 3,
  "version": 2
}
```

---

## 4. Business health status

Business health describes how the coffee shop is performing inside an active game.

Recommended MVP values:

```text
growing
stable
struggling
critical
```

Business health should be derived from authoritative metrics. It should not replace those metrics.

Relevant inputs may include:

- current cash
- profit trend
- cash runway
- reputation
- loyalty
- morale
- quality
- capacity utilization
- lost-sales rate

### Growing

Possible conditions:

- current profit is positive
- cash increased
- reputation or loyalty improved
- the business is not under dangerous capacity or morale pressure

### Stable

Possible conditions:

- cash remains positive
- profit is near break-even or moderately positive
- no major metric is deteriorating rapidly

### Struggling

Possible conditions:

- profit is negative for two consecutive quarters
- reputation or loyalty is falling
- capacity problems repeatedly create lost sales
- morale is low but not yet critical

### Critical

Possible conditions:

- cash is zero or negative
- cash runway is less than one quarter
- morale is dangerously low
- the business faces multiple severe operational risks

---

## 5. Recommended business-health rules

For the MVP, prefer clear ordered rules over a hidden weighted score.

```text
if cash <= 0:
    critical

else if cash_runway < 1 quarter:
    critical

else if morale < 20:
    critical

else if profit is negative for 2 consecutive quarters:
    struggling

else if reputation decreased for 2 consecutive quarters:
    struggling

else if profit > 0
and cash increased
and reputation did not decline
and morale >= 50:
    growing

else:
    stable
```

The first matching rule wins.

Ordered rules are easier to explain, test, balance, and display in a calculation trace.

---

## 6. Business-health explanation

The derived status should include reasons.

```text
BusinessHealthResult
- status
- reasons
- warnings
- calculatedAtQuarter
```

Example:

```json
{
  "status": "struggling",
  "reasons": [
    "Profit was negative for two consecutive quarters.",
    "Reputation decreased from 61 to 56."
  ],
  "warnings": [
    "Current cash covers approximately 1.4 quarters of recent expenses."
  ],
  "calculatedAtQuarter": 3
}
```

The UI should display the reasons rather than only showing a colored badge.

---

## 7. Bankruptcy behavior

For the hackathon MVP, a business may become financially critical before the fourth quarter, but the game should continue.

Recommended policy:

```text
GameStatus remains active until quarter four.
BusinessHealth may become critical.
FinalOutcome may become failed after quarter four.
```

Continuing allows the player to experience the complete loop, attempt recovery, receive the final Professor assessment, and reach the final report during a demonstration.

A later version may add early bankruptcy or emergency financing.

---

## 8. Final outcome

Final outcome is calculated after the game is completed.

Recommended values:

```text
excellent
successful
survived
struggling
failed
```

### Failed

Possible condition:

- ending cash is zero or negative

### Struggling

Possible conditions:

- ending cash is positive
- final profit is negative
- major health metrics remain weak

### Survived

Possible conditions:

- ending cash is positive
- the business remains operational
- growth and profitability are limited

### Successful

Possible conditions:

- final profit is positive
- cash is healthy
- reputation and loyalty are maintained or improved
- morale remains acceptable

### Excellent

Possible conditions:

- strong cumulative profit
- strong ending cash
- improved reputation and loyalty
- healthy morale
- no severe unresolved risks

---

## 9. Example final-outcome rules

```text
if ending_cash <= 0:
    failed

else if final_profit < 0
or reputation < 35
or morale < 25:
    struggling

else if cumulative_profit <= 0:
    survived

else if cumulative_profit is positive
and ending_cash increased
and reputation >= initial_reputation
and morale >= 50:
    successful

if successful conditions exceed defined high thresholds:
    excellent
```

Exact thresholds belong in centralized balance configuration. Do not scatter them across UI components.

---

## 10. Recommended TypeScript concepts

```ts
type PrincipalKind = "guest" | "user";

type AccessStatus =
  | "guest_trial_available"
  | "guest_trial_completed"
  | "authenticated_allowance_available"
  | "authenticated_limit_reached"
  | "active_game_exists"
  | "account_required";

type GameStatus =
  | "active"
  | "completed"
  | "archived";

type BusinessHealth =
  | "growing"
  | "stable"
  | "struggling"
  | "critical";

type FinalOutcome =
  | "excellent"
  | "successful"
  | "survived"
  | "struggling"
  | "failed";
```

These are conceptual examples. Final implementation names should remain consistent with project conventions.

---

## 11. Full player-view example

```json
{
  "identity": {
    "kind": "user",
    "id": "usr_123"
  },
  "entitlement": {
    "status": "authenticated_allowance_available",
    "canStartGame": false,
    "canResumeGame": true,
    "completedGamesToday": 1,
    "dailyLimit": 3,
    "remainingGames": 2,
    "resetAt": "2026-07-18T00:00:00Z",
    "activeGameId": "game_123"
  },
  "currentGame": {
    "status": "active",
    "currentQuarter": 3,
    "businessHealth": {
      "status": "struggling",
      "reasons": [
        "Profit was negative for two consecutive quarters."
      ]
    }
  }
}
```

This is clearer than:

```json
{
  "playerStatus": "active"
}
```

---

## 12. Stored versus derived values

### Store

- player identity records
- game status
- game ownership
- completion records
- authoritative game metrics
- final outcome after completion
- optional health snapshot for historical reports

### Derive

- remaining daily allowance
- whether the player can start another game
- current business health
- warnings
- cash runway
- trend labels

Derived values may be cached, but authoritative metrics must remain available for recalculation.

---

## 13. UI guidance

### Header or account area

Show:

- guest or signed-in identity
- remaining games
- reset time when relevant

### Game dashboard

Show:

- current quarter
- business-health label
- main reasons
- important warnings

### Final report

Show:

- final outcome
- supporting metrics
- major strengths
- major weaknesses
- Professor assessment

Avoid showing too many status badges simultaneously.

---

## 14. Testing

### Identity tests

- guest principal resolves correctly
- authenticated principal resolves correctly
- claimed guest no longer owns transferred games

### Entitlement tests

- unused guest trial is available
- completed guest trial blocks a second guest game
- authenticated allowance decreases after completion
- fourth authenticated completion is rejected
- UTC reset restores allowance
- active-game status is returned correctly

### Game-status tests

- new game is active
- final turn marks game completed
- completed game rejects new turns
- restarted game becomes archived

### Business-health tests

- negative cash produces critical
- low runway produces critical
- two negative-profit quarters produce struggling
- healthy positive trends produce growing
- default mixed state produces stable
- first matching rule is applied consistently

### Final-outcome tests

- insolvent ending produces failed
- weak but solvent ending produces struggling
- break-even operation produces survived
- healthy profitable ending produces successful
- high-performing balanced ending produces excellent

---

## Core rule

> Identity status, entitlement status, game status, business health, and final outcome are separate domain concepts and must not share one generic status field.
