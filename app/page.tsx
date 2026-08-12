/* eslint-disable @next/next/no-img-element */
export default function Home() {
  const github = "https://github.com/Team-Volt/agent-lcm";
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Agent LCM",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "macOS, Linux, Windows",
    description: "Shared local-first lossless context memory for agent harnesses.",
    url: "https://agent-lcm.com",
    codeRepository: github,
    license: "https://opensource.org/license/mit",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Agent LCM home">
          <span className="brand-mark" aria-hidden="true"><img src="/agent-lcm-logo.svg" alt="" /></span><span>agent-lcm</span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#why">Why LCM</a><a href="#install">Install</a>
          <a className="nav-github" href={github}>GitHub <span aria-hidden="true">↗</span></a>
        </nav>
      </header>

      <main id="top">
        <section className="hero shell">
          <div className="hero-copy">
            <p className="eyebrow"><span /> Open source · local first</p>
            <h1>Every coding agent.<br /><em>One shared memory.</em></h1>
            <p className="hero-lede">Agent LCM captures work from Codex, Cursor, VS Code, GitHub Copilot, Kiro, and Claude Code, then makes that history searchable from any of them.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#install">Install Agent LCM <span aria-hidden="true">↓</span></a>
              <a className="button button-secondary" href={github}>View source <span aria-hidden="true">↗</span></a>
            </div>
            <p className="requirement">Requires Node.js 22.18 or newer</p>
          </div>

          <div className="memory-shell" role="img" aria-label="Six agent harnesses writing to one local memory">
            <div className="memory-panel">
              <div className="panel-bar"><span>LOCAL MEMORY</span><span className="live"><i /> CAPTURING</span></div>
              <div className="memory-flow">
                <div className="sources" aria-hidden="true">
                  {[["CX", "Codex", "session_019f"], ["CU", "Cursor", "chat_7c31"], ["VS", "VS Code", "thread_82ab"], ["GH", "GitHub Copilot", "run_4e16"], ["KR", "Kiro", "task_b911"], ["CL", "Claude Code", "session_a84c"]].map(([badge, name, id]) => (
                    <div className="source-row" key={name}><span className="source-badge">{badge}</span><span>{name}<small>{id}</small></span><span className="source-pulse" /></div>
                  ))}
                </div>
                <div className="memory-core" aria-hidden="true">
                  <span className="core-orbit" /><span className="core-orbit orbit-two" />
                  <img className="core-mark" src="/agent-lcm-logo.svg" alt="" />
                  <p>agent-lcm<small>one private store</small></p>
                </div>
              </div>
              <div className="panel-status"><span>6 harnesses connected</span><span>~/.agent-lcm</span></div>
            </div>
          </div>
        </section>

        <section className="compat shell" aria-label="Supported coding agents"><p>Works where you work</p><div><span>Codex</span><span>Cursor</span><span>VS Code</span><span>GitHub Copilot</span><span>Kiro</span><span>Claude Code</span></div></section>

        <section className="why shell" id="why">
          <div className="section-heading"><p className="eyebrow"><span /> Why Agent LCM</p><h2>Context should outlive<br />the window.</h2></div>
          <div className="feature-list">
            <article><span>01</span><div><h3>Resume with evidence</h3><p>Return to earlier work with source-backed history, not a fuzzy recollection of it.</p></div></article>
            <article><span>02</span><div><h3>Search across harnesses</h3><p>Find Claude Code work from Codex, Copilot work from Kiro, or any other supported combination.</p></div></article>
            <article><span>03</span><div><h3>Keep it on your machine</h3><p>One private store per user and machine. No embeddings, external API, or cloud memory service required.</p></div></article>
            <article><span>04</span><div><h3>Rebuild from the source</h3><p>The sanitized event archive stays authoritative. Search indexes, summaries, and graphs can be rebuilt.</p></div></article>
          </div>
        </section>

        <section className="install shell" id="install">
          <div className="install-copy">
            <p className="eyebrow"><span /> Start here</p><h2>Install the CLI.<br />Connect each harness.</h2>
            <p>Run these commands for the CLI and capture hooks. For Claude Code, run <code>agent-lcm setup claude</code>. Claude support is live capture only; Agent LCM does not import earlier Claude sessions.</p>
            <a href={github + "#install-in-each-harness"}>Plugin setup by harness <span aria-hidden="true">↗</span></a>
          </div>
          <div className="code-shell">
            <div className="code-bar"><span><i /><i /><i /></span><b>TERMINAL</b></div>
            <pre><code><span className="prompt">$</span> npm install --global @team-volt/agent-lcm{"\n"}<span className="prompt">$</span> agent-lcm setup all</code></pre>
            <div className="code-result"><span className="check">✓</span><div><b>CLI and hooks ready</b><small>Next: install the plugin in each harness</small></div></div>
          </div>
        </section>

        <section className="trust shell">
          <p className="eyebrow"><span /> Built for trust</p>
          <div><h2>Local by design.<br />Lossless by architecture.</h2><p>Capture hooks sanitize events before they enter a private on-disk inbox. One authenticated local daemon writes the raw archive and updates SQLite, so every harness reads from the same source of truth.</p></div>
        </section>

        <section className="final-cta shell">
          <div className="brand-mark large" aria-hidden="true"><img src="/agent-lcm-logo.svg" alt="" /></div><h2>Give your agents<br />a memory that lasts.</h2>
          <div className="hero-actions"><a className="button button-primary" href="#install">Get started <span aria-hidden="true">↓</span></a><a className="button button-secondary" href={github}>Star on GitHub <span aria-hidden="true">↗</span></a></div>
        </section>
      </main>

      <footer className="shell">
        <a className="brand" href="#top"><span className="brand-mark" aria-hidden="true"><img src="/agent-lcm-logo.svg" alt="" /></span><span>agent-lcm</span></a>
        <p>Shared local-first lossless context memory for agent harnesses.</p>
        <div><a href={github}>GitHub</a><a href="/agent-lcm-logo.svg" download>Logo asset</a><span>MIT License</span><span>© 2026 Team Volt</span></div>
      </footer>
    </>
  );
}
