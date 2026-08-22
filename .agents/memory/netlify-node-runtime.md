---
name: Netlify Node runtime
description: Netlify dependency-install compatibility for this project
---

Netlify's default Node 22/npm 10.9 toolchain can fail during dependency installation for this project, while the Node 20/npm 10.8 toolchain succeeds. Its automatic dependency step can also omit Vite and related build tools, even when include-dev flags are configured.

**Why:** The project is configured and verified against Node 20. If Vite is missing, the local executable exits with code 127; allowing npx to download a fallback Vite version also breaks the project configuration.

**How to apply:** Keep the Netlify build environment pinned to Node 20 and npm 10.8. The static build command must explicitly install dev dependencies before invoking the repository-local Vite binary, unless the dependency handling is deliberately revalidated.