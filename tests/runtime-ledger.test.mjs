import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const ledgerPath = new URL(
  "../new website made on 6th october/closed-loop/data/runtime-ledger.json",
  import.meta.url,
);
const ledger = JSON.parse(await readFile(ledgerPath, "utf8"));

test("runtime ledger reproduces the provisional subtotal", () => {
  const total = ledger.counted_intervals.reduce(
    (sum, row) => sum + row.documented_hours,
    0,
  );
  assert.equal(ledger.counted_intervals.length, 13);
  assert.equal(Number(total.toFixed(2)), 399.56);
  assert.equal(Number((total / 24).toFixed(4)), 16.6483);
});

test("cumulative values reconcile in source order", () => {
  let cumulative = 0;
  for (const row of ledger.counted_intervals) {
    cumulative += row.documented_hours;
    assert.equal(
      Number(cumulative.toFixed(2)),
      Number(row.cumulative_hours.toFixed(2)),
      `cumulative mismatch at ${row.run_id}`,
    );
  }
});

test("V11 feedback subset is not counted twice", () => {
  const v11 = ledger.counted_intervals.filter((row) => row.run_id === "V11");
  assert.equal(v11.length, 1);
  assert.equal(v11[0].documented_hours, 33.36);
  assert.match(v11[0].why_distinct, /31\.44 is subset/);
  assert.equal(
    ledger.counted_intervals.some((row) => row.documented_hours === 31.44),
    false,
  );
});

test("pending candidates remain excluded and public sources stay public", () => {
  const countedIds = new Set(ledger.counted_intervals.map((row) => row.run_id));
  for (const candidate of ledger.not_yet_counted_candidates) {
    assert.equal(countedIds.has(candidate.run_id), false);
  }
  for (const record of [
    ...ledger.counted_intervals,
    ...ledger.not_yet_counted_candidates,
  ]) {
    assert.match(
      record.source_url,
      /^https:\/\/github\.com\/Biswajit1999\/Master-Thesis-2024\/blob\/main\//,
    );
  }
});
