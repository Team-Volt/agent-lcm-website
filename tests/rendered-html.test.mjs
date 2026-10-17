import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { access } from "node:fs/promises";
import test from "node:test";
import facts from "../lib/product-facts.json" with { type: "json" };

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

test("server-renders the Agent LCM landing page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Agent LCM — One shared memory for coding agents<\/title>/i);
  assert.match(html, /Every coding agent\.<br\/?><em>One shared context\.<\/em>/);
  assert.match(html, new RegExp(escapeRegExp(facts.installCommands[0])));
  assert.match(html, new RegExp(escapeRegExp(facts.installCommands[1])));
  assert.match(html, new RegExp(escapeRegExp(facts.github)));
  assert.match(html, new RegExp(escapeRegExp(facts.pluginNextStep)));
  assert.match(html, /Then install the Agent LCM plugin in each harness you use/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/);
  assert.doesNotMatch(html, /Hooks installed · daemon starts on demand/);

  for (const harness of facts.harnesses) {
    assert.match(html, new RegExp(escapeRegExp(harness.label)));
    if (harness.importPolicy === "supported") {
      assert.doesNotMatch(
        html,
        new RegExp(`does not import earlier ${escapeRegExp(harness.label)} sessions`, "i"),
      );
    }
  }

  const claude = facts.harnesses.find((harness) => harness.id === "claude");
  if (claude?.importPolicy === "supported") {
    assert.match(html, /~\/\.claude\/projects/);
    assert.doesNotMatch(html, /Claude support is live capture only/i);
  }

  assert.match(html, new RegExp(`${facts.harnesses.length} harnesses connected`));
});

test("exports a GitHub Pages site and square marketplace logo", async () => {
  const [html, cname, logo] = await Promise.all([
    readFile(new URL("../dist/client/index.html", import.meta.url), "utf8"),
    readFile(new URL("../dist/client/CNAME", import.meta.url), "utf8"),
    readFile(new URL("../dist/client/agent-lcm-logo.svg", import.meta.url), "utf8"),
  ]);

  assert.match(html, /agent-lcm/);
  for (const harness of facts.harnesses) {
    assert.match(html, new RegExp(escapeRegExp(harness.label)));
  }
  assert.equal(cname.trim(), "agent-lcm.com");
  assert.match(logo, /width="1024" height="1024" viewBox="0 0 1024 1024"/);
  await access(new URL("../dist/client/.nojekyll", import.meta.url));
  await access(new URL("../dist/client/og.png", import.meta.url));
});
