# WatchTonight Deploy Commands

## Build static export
```bash
cd /home/userfrankie/.openclaw/workspace/projects/movie-recommender/app
npm run build
```

## Output directory
```text
/home/userfrankie/.openclaw/workspace/projects/movie-recommender/app/out
```

## Intended next deployment action
Publish the contents of `app/out` to the `gh-pages` branch and configure GitHub Pages to serve that branch.

## Reason for separating this step
This is the first live deployment action and should be treated as a distinct approval boundary.
