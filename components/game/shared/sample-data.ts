export const stateSnapshot = {
  cashOnHand: "¥5,840,000",
  cashChange: "+¥620,000 last quarter",
  marketShare: 42,
} as const;

export const stateStats = [
  ["Net profit (Q2)", "¥620,000"],
  ["Loyal customers", "923 ▲"],
  ["Demand", "1000"],
  ["Staff morale", "48 / 100"],
] as const;

export const incomeStatementStats = [
  ["Sale Revenue", "¥2,000,000"],
  ["Total Cost of Good Sold", "¥200,000"],
  ["Gross Profit", "¥893,000"],
  ["Expense", "¥418,000"],
  ["Debt", "¥198,000"],
] as const;
