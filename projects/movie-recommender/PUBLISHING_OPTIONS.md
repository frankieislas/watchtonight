# Publishing Options

## Goal
Identify the simplest path to get the WatchTonight waitlist page live with email-only signup.

## Recommended priority order

### Option 1: Static page + lightweight form backend
Best overall first real launch path.

Why:
- simple
- cheap
- fast
- enough for validation
- no heavy backend required

Typical setup:
- static HTML page
- static hosting
- form submission handled by a lightweight form service or simple endpoint

### Option 2: Keep it local while refining
Useful if the page still needs more work before any public exposure.

Why:
- zero external setup
- safe for internal iteration
- no rush to create external accounts

Downside:
- cannot validate real signup interest publicly

### Option 3: Full custom backend too early
Not recommended yet.

Why not:
- overkill for validation
- slower
- adds unnecessary complexity before proving demand

## Recommendation
When ready to publish, use:
- a static page
- email-only form
- the lightest possible form backend

## What matters most
- page is live
- signup works reliably
- collected emails are accessible
- setup is simple enough to maintain

## What does not matter yet
- advanced analytics
- custom auth
- deep backend architecture
- polished app infrastructure
