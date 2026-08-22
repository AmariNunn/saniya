---
name: Netlify Node runtime
description: Netlify dependency-install compatibility for this project
---

Netlify's default Node 22/npm 10.9 toolchain can fail during dependency installation for this project, while the Node 20/npm 10.8 toolchain succeeds. The static compiler and its loaded plugins must be regular production dependencies.

**Why:** Netlify may skip its automatic dependency phase and omit dev dependencies. A regular npm install in the build command can crash before Vite is installed, while a clean lockfile-based install creates the expected compiler binary. If Vite is missing, the local executable exits with code 127; allowing npx to download a fallback Vite version also breaks the project configuration.

**How to apply:** Keep the Netlify build environment pinned to Node 20 and npm 10.8. When Netlify does not install dependencies itself, run npm ci with production-only dependencies before invoking the repository-local Vite binary. When build configuration imports a package, ensure that package is available from production dependencies.