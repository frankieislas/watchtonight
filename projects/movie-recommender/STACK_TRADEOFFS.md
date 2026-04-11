# Stack Tradeoffs

## Recommended option
### Next.js + React

#### Pros
- fast iteration
- widely understood
- easy to build both marketing and product surfaces in one place
- flexible routing and UI composition
- good fit for a recommendation product

#### Cons
- still more framework than a super-minimal static app
- can invite overbuilding if discipline is lost

## Alternative option
### Very lightweight plain HTML/CSS/JS app

#### Pros
- minimal setup
- very fast for tiny experiments
- easy to understand

#### Cons
- gets messy faster once product logic grows
- weaker fit for evolving flows and profile memory
- harder to scale cleanly into a true MVP app

## Why Next.js wins
WatchTonight is already moving beyond a simple landing page. The product now needs a real input/output experience and likely evolving logic. Next.js is still lightweight enough for MVP speed while giving enough structure to avoid a fragile front-end mess.
