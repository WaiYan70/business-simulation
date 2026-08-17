export type UtcQuotaWindow = Readonly<{
  start: Date;
  end: Date;
}>

export function getUtcQuotaWindow(now: Date): UtcQuotaWindow{
  if (!Number.isFinite(now.getTime())) {
    throw new Error("Current time must be a valide date")
  }

  const start = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
  )

  const end = new Date(start);
  end.setUTCDate(end.getUTCDate() + 1);

  return {start, end}

}
