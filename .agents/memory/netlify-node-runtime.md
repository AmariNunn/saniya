---
name: Netlify Node runtime
description: Netlify dependency-install compatibility for this project
---

Netlify's default Node 22/npm 10.9 toolchain can fail during dependency installation for this project, while the Node 20/npm 10.8 toolchain succeeds. The static compiler and its loaded plugins must be regular production dependencies.

**Why:** Netlify may omit dev dependencies, and invoking a second npm install from the build command can crash before Vite is installed. If Vite is missing, the local executable exits with code 127; allowing npx to download a fallback Vite version also breaks the project configuration.

**How to apply:** Keep the Netlify build environment pinned to Node 20 and npm 10.8. Keep the Netlify command focused on the repository-local Vite binary; do not run npm install inside it. When build configuration imports a package, ensure that package is available from production dependencies.