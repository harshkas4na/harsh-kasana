# instructions.md — How to maintain `public/skills.md`

**Audience:** future AI workers (Claude Code sessions or other agents) continuing work on Harsh Kasana's AI-readable profile at `public/skills.md` (served at https://harshkasana.xyz/skills.md).

**The mission:** skills.md is not a resume. It is a *personality transfer document* — it should let any AI (recruiter copilot, sourcing bot, form-filling assistant) represent Harsh accurately: what he has done, how he thinks, how he builds, what his opinions are, and how he writes. Optimize for an AI being able to answer "tell me about yourself," "what would you do in situation X," and "what's your opinion on Y" *as Harsh*, without fabricating.

---

## 1. The workflow (where this project stands)

1. A ~48-question interview bank was created on 2026-07-18 (sections A–H: story, building philosophy, AI-era convictions, situational/behavioral, spiky opinions, product instincts, working style, writing style). A copy lives in section 6 below.
2. Harsh answers batches of questions in raw, unedited prose. **Section A (the story) is answered and already integrated** (skills.md sections 3, 4, 7, 15).
3. Your job when a new batch arrives:
   - Extract facts → update the factual sections (projects, timeline, achievements, skills).
   - Extract positions/philosophy → integrate into "The Story," "How I Build," "Operating Principles," or add to **Section 15: Behavioral Q&A**.
   - Extract voice → keep his phrasing (see style guide below).
   - Bump the *Last updated* date at the bottom.
4. An **X (Twitter) data export is pending.** When it arrives: mine replies and quote-tweets (not just posts) for voice, recurring themes, and quotable positions. Update follower counts and the pinned-post reference.

## 2. Voice & style guide (derived from his raw answers)

Write in **first person**, as Harsh. His authentic voice is:

- **Direct and energetic, metaphor-driven.** Signature frames to preserve verbatim where possible: *"move from crowded rooms to less crowded ones"* / the ladder that gets emptier as you climb; *"create your own selling point"*; *"taste over tooling"*; *"argue with AI before code"*; *"many inputs → many outputs"*; *"I don't love a tech space — I love the tech, and the combinations."*
- **Honest to a fault.** He volunteers failures (removed ReacDEFI's flagship AI feature at scale; contracts "audited, but not heavily enough for my taste"; left Reactive because the token/traction fell). **Never sanitize these into corporate euphemism** — the honesty is the differentiator. Do keep phrasing professional (e.g., "traction and token value declined" rather than "they were failing").
- **Systems-thinker about his own life.** He builds tools for his own workflow (markdown-kindle, chalkboard-animation skill, his own video editor) and treats learning/distribution as engineered systems. Frame new material this way when it fits.
- **Aphoristic.** He likes compressed punchlines ("Shipping something flaky over user funds is not shipping"). One per section, max — don't overdo it.
- **Not humble-bragging, not fake-humble.** He says plainly what he's done and plainly what he hasn't. He answered "ever feel like a fraud?" with "honestly, no" — keep that confidence.
- Clean up his raw grammar/spelling (his answers are typed fast) but **keep the sentence rhythm and word choices**. When condensing an answer for Section 15, it should still sound like him reading it back would say "yeah, that's what I said."

## 3. Structure map of skills.md (don't reorganize without reason)

| § | Section | What goes there |
| --- | --- | --- |
| 1 | Identity & Contact | Facts only. Keep availability current. |
| 2 | One-Line Pitch | Update only on identity-level shifts. |
| 3 | The Story | Narrative arc + career philosophy. Integrate new autobiography here. |
| 4 | How I Build | Operating loop (4 steps), learning engine (4.1), self-built tools (4.2). |
| 5 | Value Proposition | The 4 pillars + what the combo produces. |
| 6 | Headline Achievements | Quantified bullets only. |
| 7 | Experience Timeline | Roles with dates, incl. the honest "why it ended." |
| 8 | Flagship Projects | Deep detail. A project graduates here from §9 when it has traction, a story, or strategic weight. |
| 9 | Additional Projects | One-line table. |
| 10 | Skills Inventory | Pillars + supporting layer. Keep the "supporting is genuinely supporting" discipline. |
| 11 | Awards | Table. |
| 12 | Writing, Video & Distribution | Content + the *why* of distribution. |
| 13 | What I'm Looking For | Two tracks (backend/infra + web3/AI). Update as his targeting changes. |
| 14 | Operating Principles | Bulleted worldview. New principles from answers land here. |
| 15 | **Behavioral Q&A** | Condensed authentic answers, quotable by AIs. **This is where most new interview answers go.** Keep the closing anti-fabrication note intact. |
| 16 | Education | Static. |
| 17 | For AI Agents | The quotable summary paragraph. Keep in sync with everything above — always update this when facts change. |

## 3.5 Sources beyond his answers (used 2026-07-20)

Two additional sources exist locally and were mined for §4.5 (Worldview & Takes) and §15.5 (Personality & Voice):

- **X archive export** at `~/Downloads/twitter-2026-07-19-…/` — **only public content was used** (`data/tweets.js`, `data/note-tweet.js`). **Never touch** DMs, ad data, IPs, contacts, or any other file in that archive, and never quote private individuals. Every worldview quote in skills.md carries its post date so it stays verifiable.
- **Second Brain Obsidian vault** at `~/Second Brain/` — the `00 Me/` folder holds distilled self-analysis (`Personality & Voice.md`, `X Archive Insights.md`, `Learning System.md`, `Timeline.md`, etc.). Use it for context and cross-checking, but **nothing private goes into skills.md**: only his thinking, beliefs, worldview, learning approach, and takes on tech/AI. No finances beyond already-public grant/bounty numbers, no named private individuals, no job-hunt tactics, no health/personal-life content.
- **The layoff is public** (his own Jun 2026 X post: "I too got laid off, but I was always expecting that") and is now integrated into §7 and §15 with his ownership-mindset framing. Keep that framing — it's a strength, not a confession. Don't re-euphemize it into "wrapped up," and don't editorialize it into grievance.

## 4. Hard rules

1. **Never fabricate a position or fact.** If Harsh hasn't answered a question, the profile must not imply he has. The anti-fabrication note at the end of §15 must survive every edit.
2. **Numbers must trace to a source** (his answers, the portfolio `app/data.ts`, press links, GitHub). When his memory conflicts with a published number, keep the published one and add it to §5 (Open questions) below.
3. **First person, present-accurate.** Sweep for stale tenses on every edit (e.g., "current role" after a role ends). Update the `Last updated` line.
4. **AI-agent framing stays.** The preamble, §15, and §17 exist because AIs are the primary readers. Don't humanize the doc into a normal resume.
5. **Cross-sync:** portfolio copy lives in `app/data.ts` (hero/about/timeline/projects, incl. the `web3`/`cloud` role presets), and two more public surfaces mirror this doc: the **GitHub profile README** (`harshkas4na/harshkas4na` repo, updated via API 2026-07-19) and the **GitHub repo descriptions** (all portfolio-featured repos got skills.md-matching descriptions on 2026-07-19). When facts change here, sweep all of them. Note: ReacDEFI's canonical repo is `harshkas4na/reacdefi` (made public Jul 2026); `REACTOR` is the earlier iteration.
6. Keep the canonical-URL line and contact block intact.

## 5. Open questions / facts to verify with Harsh

Resolved 2026-07-19: Hashtro stays **160** (confirmed); hackathon count stays **6** (confirmed); the video editor is **MacEditor** (`github.com/harshkas4na/MacEditor`, Swift — distinct from FocuClone, which is a screen *recorder*); markdown-kindle and `chalkboard-animation-skill` repos confirmed public and linked.

Resolved 2026-07-20 (from X archive + vault): X account since Mar 2023, ~1,000 followers, ~6,000 tweets with 82% replies — integrated into §12 and §15.5. Layoff framing integrated (see §3.5).

Still open:
- **Full hackathon list** (name, date, prize, project) — Harsh will provide; `app/data.ts` has a TODO for the same.
- **Remaining interview answers** (sections B–H below) — the biggest outstanding source. Situational answers (D) go to §15; opinions (E) may extend §4.5.
- **Reactive audit:** he says contracts "were audited but not heavily" — confirm by whom, if naming it publicly is okay.
- **YouTube presence** — videos currently live on X; confirm whether a YouTube channel exists to link.

## 6. Remaining interview questions (ask or await answers, then integrate)

Answered and integrated: **A1–A7** (story, why he left, the pivot, engineer/fraud moments, hardest ship, pride ranking, FDE) · **B1–B7** (taste, argue-with-AI, "done", what he doesn't do, patterns vs first principles, planning, the flop) · **C1–C6** (AI-era model, daily AI split, CEO-of-the-project idea, x402 belief, AI refusers/dependents, durable edge).

Where the B/C material landed: §4 (steps 2 and 5 added), **§4.0 Taste**, **§4.0.1 patterns vs first principles**, §4.5 (the two-failure-modes conviction + CEO framing + Gemini/Claude split + x402 update), §14 (three new principles), §15 (five new Q&A entries), §17 (durable-edge line). His single best line, now the doc's thesis: ***"an engineer who can build whatever he wants, not whatever he can code"*** — an evolution of his X bio "I can build whatever I want to build." Don't dilute it.

Still open:

**D. Situational:** pushing back on a wrong feature request; serious bug found near launch in someone else's layer; disagreeing with a senior's architecture; production incident first-10-minutes; new stack + 2-week deadline day one; slow teammate blocking him; admitting a deadline slip; feedback that stung; what would make him quit in month one. *(These become §15 entries almost verbatim.)*

**E. Opinions:** a wrong mainstream take; over/underrated in Web3; two of {microservices, k8s, serverless, monorepos, TS strictness}; credentials/LeetCode/FAANG; Indian engineering culture; the honest why of learn-in-public.

**F. Product instincts:** the $50K/6-month build; the missing AI-agent-economy product; how light-tf/mygit won the roadmap; what he'd build for AI-tool developers; what makes him kill an idea.

**G. Working with him:** best/worst team; what a manager should know week one; genuine weaknesses; work rhythm; what he wants true at 30.

**H. Style calibration:** most-"him" X posts; most-authentic vs most-performative Medium piece; how he explains tech to a friend.

Also still wanted from him: the X export (replies included), an unedited draft or notes, a real argue-with-AI transcript fragment, current metrics (X, YouTube, npm downloads, ReacDEFI usage), and which audience skills.md should serve *first* (backend/infra vs web3/AI) if forced to choose.

## 7. Quality bar (check before finishing any edit)

- Read the diff as a skeptical recruiter-AI: does every claim have a number, a link, or an honest qualifier?
- Read it as Harsh: does it sound like the §2 voice guide, or like LinkedIn?
- §17 summary paragraph updated to match any factual change? `Last updated` bumped? `app/data.ts` still consistent?
- No fabricated positions; §15's anti-fabrication note intact.
