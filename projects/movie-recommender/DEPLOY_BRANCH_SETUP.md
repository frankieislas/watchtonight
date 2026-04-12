# WatchTonight Deploy Branch Setup

## Chosen publishing pattern
Use a dedicated `gh-pages` branch for GitHub Pages deployment.

## Why
- keeps source code separate from deployed static artifacts
- cleaner repeat deployment workflow
- easier to reason about what is live

## Current source build location
- `projects/movie-recommender/app`

## Current static export output
- `projects/movie-recommender/app/out`

## Recommended deployment flow
1. build the app from `projects/movie-recommender/app`
2. publish the contents of `app/out` to the `gh-pages` branch
3. set GitHub Pages to serve from the `gh-pages` branch root
4. verify the live deployment

## Operational note
The branch-publish path is selected, but the external GitHub Pages configuration change and push step should be done carefully as the next live deployment action.
