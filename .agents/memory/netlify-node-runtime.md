---
name: Netlify Node runtime
description: Netlify dependency-install compatibility for this project
---

Netlify's npm CLI repeatedly crashes during dependency installation for this project. Keep Node 20, but use Netlify's first-party pnpm detection with an exact package-manager pin and a committed pnpm lockfile.

**Why:** Both npm install and npm ci terminate with npm's “Exit handler never called” defect in Netlify's CI environment. pnpm avoids that npm failure and is officially detected by Netlify from its lockfile and packageManager declaration.

**How to apply:** Keep the Netlify build environment pinned to Node 20, keep one pnpm lockfile rather than an npm lockfile, and invoke Vite through pnpm. When build configuration imports a package, ensure that package is available from production dependencies.