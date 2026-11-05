import assert from "node:assert/strict";
import test from "node:test";
import schema from "../src/appmeta/settings.json" with { type: "json" };
import { AppModel } from "../src/model.ts";
import { schemaDefaults, type Settings } from "../src/lib.ts";
const NOW = 1700000000000;
const make = (values: Settings = {}, saved: Settings = {}, now = NOW) =>
  new AppModel({ ...schemaDefaults(schema.fields), ...values }, saved, now);

test("early presses are false starts and do not create scores", () => {
  const a = make();
  a.key("ok", 0, NOW);
  a.key("ok", 0, NOW + 10);
  assert.equal(a.phase, "Too soon");
  assert.equal(a.results.length, 0);
});
test("valid response updates and preserves the best score", () => {
  const a = make();
  a.key("ok", 0, NOW);
  a.tick(a.cueAt);
  a.key("ok", 0, a.cueAt + 230);
  assert.equal(a.result, 230);
  assert.equal(make({}, a.save()).best, 230);
});
