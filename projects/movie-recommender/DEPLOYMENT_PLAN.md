# WatchTonight MVP Deployment Plan

## Goal
Prepare the current Next.js MVP to be deployable as a static build.

## Current direction
Use static export so the app can be deployed with simple static hosting.

## What was done
- configured Next.js for static export
- kept image handling compatible with static hosting
- preserved the current MVP routes for deployment readiness

## Local deploy test flow
From `projects/movie-recommender/app`:

```bash
npm run build
```

If successful, the export output will be generated for static deployment.

## Recommended next deployment targets
- GitHub Pages
- Netlify
- Vercel

## Recommendation
For fastest continuation, deploy the MVP to a simple hosting target once the static build is confirmed.
