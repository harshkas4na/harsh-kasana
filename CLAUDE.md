# Portfolio — harshkasana.xyz

Next.js portfolio. The important artifact is `public/skills.md`, the AI-readable profile served
at https://harshkasana.xyz/skills.md — **read `instructions.md` before editing it.** That file
holds the mission, the voice guide and the interview-bank workflow, and it outranks anything
below on questions of tone.

## Lifelog sync (run at session start)

This repo is a **sink** of [lifelog](file:///Users/harshkasana/PROJECTS/Me/lifelog) — the
append-only log at `~/.lifelog/events.jsonl` that records every commit on this machine plus
whatever Harsh captures with ⇧⌘J. Its sink name is **`portfolio`**, and it owns:

- `public/skills.md` — §4.2 tools, §9 breadth table, skills inventory, timeline
- `app/data.ts` — only for work with a public link; every entry there renders as one

**At the start of every session, run `me sinks`.** Then:

1. **If `portfolio` has pending events, sync it** before doing other work — the files above are
   about to be read as if they were current, and stale is worse than empty. Use the `sync-me`
   skill, or by hand: `me digest --sink portfolio` → apply the edits → `me ack portfolio --id <id
   printed at the bottom of the digest>`.
2. **If a sibling sink is behind, sync that one too** — `secondbrain` (`~/Second Brain`),
   `jobops` (`~/PROJECTS/Me/job-ops`), `portfolio` (`~/PROJECTS/Me/portfolio`), `hackops`
   (`~/PROJECTS/Me/hack-ops`). The `sync-me` skill has each sink's file list. Whichever session
   gets there first does the work; the rest see a pending count of 0 and skip.

**Why this can't double-apply.** A sink is nothing but a cursor — "how far through the log have I
read". Applying is what moves it, so an event already applied is behind every cursor that has
seen it and can never come back, no matter which repo's session runs the sync. That is also why
re-reading a digest before acking is always safe, and why **you must not ack until the edits are
actually written** — acking early loses those events from the next digest for good.

**Rules that are not negotiable:**

- **The log never leaves this machine.** Never paste event contents into a web request, never
  commit anything from `~/.lifelog`, and never write a digest to a file inside a git repo — read
  it from stdout.
- **Apply only what the digest supports.** No inferred skill levels, no invented metrics. `deps
  added` is evidence of new tech; `initial stack (scaffolded)` is not.
- **Reconcile, don't rewrite.** Preserve Harsh's voice and structure, and anything the digest
  doesn't contradict.
- Commit activity says nothing about whether a deployed product is still live. "No commits in 184
  days" means exactly that.

If the digest is empty, say so and move on — do not invent an update.
