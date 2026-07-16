# MVP Formula Specification

## Status
Initial calibration framework. Coefficients must be named, centralized, documented, and playtested.

## Conventions
- currency: integer yen
- demand and capacity: orders per quarter
- scores: 0–100
- multipliers: centered on 1.0
- round demand/capacity to whole orders

## Demand
```text
relative_price = player_price / reference_price
price_modifier = clamp(1 - sensitivity * (relative_price - 1), min, max)
marketing_modifier = clamp(1 + effectiveness * log(1 + spend / scale), 1, max)
reputation_modifier = 1 + weight * ((reputation - neutral) / 100)
loyalty_modifier = 1 + weight * ((loyalty - neutral) / 100)

potential_demand = round(clamp(
  base_demand
  * seasonality
  * economy
  * event_modifier
  * price_modifier
  * marketing_modifier
  * reputation_modifier
  * loyalty_modifier
  * quality_value_modifier,
  0,
  maximum_market_demand
))
```
Use a lookup table for price-versus-quality value in MVP rather than an unnecessarily complex continuous formula.

## Capacity
```text
capacity = round(max(0,
  staff_count
  * orders_per_staff
  * productivity_modifier
  * morale_modifier
  * training_modifier
  * event_capacity_modifier
))
```

## Sales
```text
units_sold = min(potential_demand, capacity)
lost_sales = max(0, potential_demand - units_sold)
```

## Financials
```text
revenue = units_sold * selling_price
variable_cost = units_sold * variable_cost_per_unit
fixed_cost = rent + payroll + utilities + marketing + training + other_fixed
expenses = variable_cost + fixed_cost
profit = revenue - expenses
new_cash = prior_cash + profit
```

## State updates
Morale, quality, loyalty, and reputation update through named bounded deltas. Reputation should change more slowly than one-turn quality. Over-capacity pressure may reduce service quality and loyalty.

## Trace
Record base values, every modifier, caps, rounding, revenue and expense components, state deltas, and final values.

## Calibration scenarios
Baseline, low-price growth, premium quality, aggressive marketing with insufficient capacity, cost cutting, training investment, worst reasonable combination, and best reasonable combination. No strategy should dominate all scenarios.
