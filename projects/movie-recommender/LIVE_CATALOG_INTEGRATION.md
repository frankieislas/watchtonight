# WatchTonight Live Catalog Integration

## What is already done
- Added a server-side live pool adapter scaffold in `app/src/app/lib/live-pool.ts`
- Added shared live query/result types in `app/src/app/lib/live-recommendation-types.ts`
- Added an API route in `app/src/app/api/recommendations/route.ts`
- Updated the ranking engine so it can rank an injected movie pool instead of only the hardcoded catalog

## Current behavior
- If no live API key is present, the app falls back to the curated local movie catalog
- The API route still returns pool metadata so we can inspect readiness and pool size

## API key needed next
Set this environment variable when ready:
- `STREAMING_AVAILABILITY_API_KEY`

## Next implementation step once key is available
Wire `fetchStreamingAvailabilityCandidates()` in `app/src/app/lib/live-pool.ts` to the chosen provider.

## Desired end state
- fetch live candidate movies by selected providers/services
- normalize them into the WatchTonight movie shape
- rank them with the existing recommendation engine
- return live top picks with curated explanations
