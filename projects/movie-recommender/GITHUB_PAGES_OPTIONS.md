# GitHub Pages Options for WatchTonight MVP

## Option 1: Deploy static export to a dedicated publish branch
### Pros
- clean separation between source and built site
- common Pages workflow
- easier to reason about deployment artifacts

### Cons
- adds branch management overhead

## Option 2: Deploy static export into a publish directory in the main repo
### Pros
- simpler branch structure
- fewer moving parts

### Cons
- build artifacts live alongside source
- can get messy over time

## Recommendation
Use a **dedicated publish branch** if we expect repeated deployments.
Use a **publish directory** only if we want the fastest possible first ship and accept some mess.

## My recommendation
For WatchTonight, I recommend the **dedicated publish branch** path if you want a cleaner deployment setup from the start.
