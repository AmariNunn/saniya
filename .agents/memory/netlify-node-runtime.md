---
name: Netlify Node runtime
description: Netlify dependency-install compatibility for this project
---

Netlify's default Node 22/npm 10.9 toolchain can fail during dependency installation for this project, while the Node 20/npm 10.8 toolchain succeeds.

**Why:** The project is configured and verified against Node 20, and the failure occurs during Netlify's install phase before the build starts.

**How to apply:** Keep the Netlify build environment pinned to Node 20 and npm 10.8 unless the dependency set is deliberately revalidated on a newer runtime.