import { describe, expect, test } from "vitest";
import {
  diaDaSemanaCurto,
  diaISO,
  formatarDataCurta,
  formatarDataLonga,
  formatarDataMedia,
  haQuantoTempo,
  lerData,
  mesCurto,
} from "./datas";

test("lerData usa o horário local, não UTC", () => {
  const d = lerData("2021-01-28");
  expect([d.getFullYear(), d.getMonth(), d.getDate(), d.getHours()]).toEqual([2021, 0, 28, 0]);
});

test("lerData recusa formato estranho", () => {
  expect(() => lerData("28/01/2021")).toThrow(RangeError);
});

test("diaISO usa o dia local, mesmo às 23h", () => {
  expect(diaISO(new Date(2026, 9, 2, 23, 30))).toBe("2026-10-02");
});

test("formatarDataLonga", () => {
  expect(formatarDataLonga("2021-01-28")).toBe("28 de janeiro de 2021");
});

test("formatarDataMedia cabe numa linha e ignora a hora", () => {
  expect(formatarDataMedia("2026-09-28T09:12")).toBe("28 set 2026");
  expect(formatarDataMedia("2021-01-05")).toBe("5 jan 2021");
});

describe("formatarDataCurta", () => {
  test("sem hora", () => {
    expect(formatarDataCurta("2021-01-25")).toBe("25 jan");
  });
  test("com hora", () => {
    expect(formatarDataCurta("2021-01-28T12:30")).toBe("28 jan, 12:30");
  });
});

test("rótulos de eixo sem ponto", () => {
  expect(mesCurto("2021-08-01")).toBe("ago");
  expect(diaDaSemanaCurto("2026-10-03")).toBe("sáb");
});

describe("haQuantoTempo", () => {
  const hoje = new Date(2026, 9, 2, 9, 0);
  test.each([
    ["2026-10-02", "hoje"],
    ["2026-10-01T23:59", "ontem"],
    ["2026-09-27", "há 5 dias"],
  ])("%s → %s", (data, esperado) => {
    expect(haQuantoTempo(data, hoje)).toBe(esperado);
  });
});
