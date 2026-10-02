import { describe, expect, test } from "vitest";
import { forcaDaSenha, senhaAceitavel } from "./senha";

describe("forcaDaSenha", () => {
  test.each([
    ["abc", 0],
    ["aaaaaaaa", 0],
    ["12345678", 0],
    ["Senha123", 0],
    ["casaverde", 0],
    ["casaverde1", 1],
    ["Casaverde1", 2],
    ["Casaverde1!", 3],
    ["Casaverde1!x", 4],
  ] as const)("%s → %i", (senha, forca) => {
    expect(forcaDaSenha(senha)).toBe(forca);
  });
});

test("senhaAceitavel exige 8+, letra e número", () => {
  expect(senhaAceitavel("casaverde1")).toBe(true);
  expect(senhaAceitavel("casaverde")).toBe(false);
  expect(senhaAceitavel("1234567")).toBe(false);
});
