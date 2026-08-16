import { describe, expect, it } from "vitest";

import { parseProfessorState } from "./professor-state";

describe("parseProfessorState", () => {
  it.each(["loading", "slow", "error", "fallback"] as const)(
    "accepts the supported %s state",
    (state) => {
      expect(parseProfessorState(state)).toBe(state);
    },
  );

  it.each([
    ["a missing parameter", undefined],
    ["an unsupported state", "ready"],
    ["an empty state", ""],
    ["a repeated parameter", ["slow", "error"]],
  ] as const)("defaults %s to loading", (_description, value) => {
    expect(parseProfessorState(value)).toBe("loading");
  });
});
