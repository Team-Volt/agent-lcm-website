# agent-lcm.com

The public site for [Agent LCM](https://github.com/Team-Volt/agent-lcm), shared local-first lossless context memory for coding-agent harnesses.

## Local preview

Requires Node.js 22.18 or newer.

```sh
npm install
npm run dev
```

Open `http://localhost:3000`.

## Checks

```sh
npm run lint
npm test
```

The production build is a static export in `dist/client`.

## GitHub Pages

Pushes to `main` run [the Pages workflow](.github/workflows/pages.yml). The workflow builds the site and deploys `dist/client`.

GitHub Pages uses **GitHub Actions** as its source and serves the custom domain `agent-lcm.com`. The build includes `public/CNAME` and `public/.nojekyll`.

## Brand assets

- Marketplace logo: [`public/agent-lcm-logo.svg`](public/agent-lcm-logo.svg), 1024×1024
- Social card: [`public/og.png`](public/og.png), 1731×909
- Favicon: [`public/favicon.svg`](public/favicon.svg)

The published logo URL is `https://agent-lcm.com/agent-lcm-logo.svg`.
