# Access and Game-Limit Policy

## Policy
| Player | Allowance | Reset |
|---|---:|---|
| Guest | 1 completed game | none |
| Authenticated user | 3 completed games | 00:00 UTC daily |

## What consumes allowance?
Only a successfully persisted final-quarter completion. Starting, abandoning, intermediate quarters, failed transactions, and Professor retries do not consume allowance.

## Guest identity
A guest receives a cryptographically random opaque identifier in a signed, Secure, HttpOnly, SameSite=Lax cookie. Trusted game state and quota counts remain in the database, not the cookie.

## Guest limitations
A guest may create or resume one active game, complete one game, view the report, and then sign in. After completion, another game requires authentication.

## Limitation of guest enforcement
A cookie cannot prove a unique human identity. Clearing cookies, using private browsing, another browser, or another device may produce another guest trial. MVP guest limiting is a friction and cost-control mechanism, not strong fraud prevention. Do not add invasive browser fingerprinting.

## Authenticated allowance
```text
window_start = 00:00 UTC today
window_end   = 00:00 UTC tomorrow
remaining    = configured_limit - completions_in_window
```
The server is authoritative. The UI only displays the server result.

## Active game rule
One active game per principal prevents unlimited unfinished games. Players may resume or deliberately restart, which archives the prior game.

## Guest conversion
The guest trial does not consume one of the user's three authenticated daily games. Eligible guest history may be claimed after sign-in.

## Enforcement
- check ownership and entitlement on the server
- re-check entitlement in the final completion transaction
- enforce unique completion per game
- never trust a browser-provided count
- rate-limit requests separately from usage quota
- do not use IP address as the primary identity
