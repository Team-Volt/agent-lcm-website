import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

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

test("server-renders the Agent LCM landing page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Agent LCM — One shared memory for coding agents<\/title>/i);
  assert.match(html, /Every coding agent\./);
  assert.match(html, /npm install --global @team-volt\/agent-lcm/);
  assert.match(html, /https:\/\/github\.com\/Team-Volt\/agent-lcm/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/);
});

test("exports a GitHub Pages site and square marketplace logo", async () => {
  const [html, cname, logo] = await Promise.all([
    readFile(new URL("../dist/client/index.html", import.meta.url), "utf8"),
    readFile(new URL("../dist/client/CNAME", import.meta.url), "utf8"),
    readFile(new URL("../dist/client/agent-lcm-logo.svg", import.meta.url), "utf8"),
  ]);

  assert.match(html, /agent-lcm/);
  assert.equal(cname.trim(), "agent-lcm.com");
  assert.match(logo, /width="1024" height="1024" viewBox="0 0 1024 1024"/);
  await access(new URL("../dist/client/.nojekyll", import.meta.url));
  await access(new URL("../dist/client/og.png", import.meta.url));
});
