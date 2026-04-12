# WatchTonight Deployment Target Recommendation

## Recommendation
Use **GitHub Pages** for the immediate WatchTonight MVP deployment.

## Why this is the recommendation
- the repo already exists on GitHub
- the project was just prepared for static deployment
- GitHub Pages matches the current lightweight setup
- it avoids introducing another hosting surface right now
- it is the lowest-friction path to getting this MVP live

## When Vercel would be better
Use Vercel later if:
- the app moves beyond static export
- backend features grow
- preview deployments become important
- server-side capabilities become necessary

## Current decision
For the next deployment step, choose the hosting path with the fewest new moving parts.
That means GitHub Pages first.
