import assert from "node:assert/strict";
import test from "node:test";
import facts from "../lib/product-facts.json" with { type: "json" };

const README_URL = "https://raw.githubusercontent.com/Team-Volt/agent-lcm/main/README.md";

function parseSetupIds(readme) {
  const heading = "## Install in each harness";
  const start = readme.indexOf(heading);
  assert.notEqual(start, -1, "README is missing the install-in-each-harness table");
  const table = readme.slice(start, readme.indexOf("\n## ", start + heading.length));
  const ids = [...table.matchAll(/`agent-lcm setup ([a-z]+)`/g)].map((match) => match[1]);
  return [...new Set(ids)];
}

test("product facts match the agent-lcm README install table", async () => {
  const response = await fetch(README_URL, { signal: AbortSignal.timeout(15_000) });
  assert.equal(response.ok, true, `README fetch failed: ${response.status} ${README_URL}`);
  const readme = await response.text();
  const readmeIds = parseSetupIds(readme);
  const localIds = facts.harnesses.map((harness) => harness.id);

  assert.deepEqual(
    [...localIds].sort(),
    [...readmeIds].sort(),
    `site harness ids ${localIds.join(",")} vs README ${readmeIds.join(",")}`,
  );

  const supportsClaudeImport = /import sessions already stored under `~\/\.claude\/projects`/i.test(readme)
    || /Import sessions that Claude Code already saved/i.test(readme)
    || /Capture Claude Code sessions through live hooks and import sessions/i.test(readme);
  assert.equal(supportsClaudeImport, true, "README does not explicitly confirm Claude Code session import support");
  const claude = facts.harnesses.find((harness) => harness.id === "claude");
  assert.equal(claude?.importPolicy, "supported");
});
