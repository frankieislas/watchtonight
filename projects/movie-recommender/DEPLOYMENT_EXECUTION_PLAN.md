# WatchTonight Deployment Execution Plan

## Goal
Deploy the current WatchTonight MVP build as a live static site.

## Recommended target
- GitHub Pages

## Execution sequence
1. build the static export from `projects/movie-recommender/app`
2. verify the exported output directory
3. decide whether to:
   - publish from a dedicated deployment branch, or
   - publish from a docs/output directory workflow
4. connect the exported MVP to the chosen GitHub Pages publish path
5. test the live deployment

## Why this path
This is the simplest way to ship the MVP live without adding extra infrastructure.

## Immediate next operational decision
Choose the exact GitHub Pages publishing pattern.

## Recommended pattern
Use a dedicated deployment output path/workflow that keeps the Next.js app source separate from the published static site artifacts.
