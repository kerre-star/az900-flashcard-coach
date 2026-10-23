# Prompts log

I used Claude (claude.ai) to plan, build and review this project. This file records the prompts I actually sent, what each one was for, and what I learned. Prompts are quoted exactly as I typed them.

## 1. Choosing the challenge

**Prompt:** "between the smart quiz and flashcard coach, which stands out."

**Purpose:** compare two hackathon challenges against the judging criteria instead of just picking one.

**Result:** a comparison of technical creativity, content effort and fit for the time. Claude recommended the Flashcard Coach, mainly because "keep the cards you get wrong coming back" can be built as a real algorithm (a box system). I chose it.

## 2. Planning

**Prompt:** "we shall go with the flash card, how do we approach this?"

**Purpose:** get a plan, not code yet.

**Result:** a plan with content first, then the app, then the box system, progress, and the pitch, with a note to check the cards against the current Microsoft Learn skills outline.

## 3. Changing the scope

**Prompt:** "actually we shall do it in the as time allows not necessarily with the plan, got lots of things to do."

**Purpose:** I could not follow a day-by-day schedule.

**Result:** Claude rebuilt the plan as layers, so that stopping at any point still left a working submission: (1) flip cards, (2) the box system, (3) progress, (4) polish.

## 4. Grounding the content in what I studied

**Prompt:** I pasted my Microsoft Learn completion history, with "just copied what is in the az-900 what i completed."

**Purpose:** base the topics on the 3 learning paths and 12 modules I really completed.

**Result:** the decks follow those modules: core architecture, compute, networking, storage, and identity and security. Pasting the real source worked better than describing it.

## 5. Building the first version

**Prompt:** "we can start building"

**Result:** `index.html`, `style.css`, `cards.js` (21 cards), `script.js` (flip cards, box system, weak cards mode, saved progress) and a README.

## 6. Fixing a problem I found when testing

**Prompt:** "look at the site, there are no buttons, the count on what has been mastered does not change."

**Purpose:** report two bugs I saw on the live site.

**Result:** Claude found two causes. The answer buttons only appeared after flipping a card, and "mastered" needed three correct answers in a row on the same card. The fix was a visible "Show answer" button and a progress line showing "Known" and "Mastered".

**Lesson:** describing what I saw and what I expected gave a precise diagnosis.

## 7. Pitch deck

**Prompt:** "can the attached deck work or should we add something?"

**Result:** a review against the pitch criteria. It found claims in my first deck that the app did not support ("AI-powered", "Login", "Readiness Score", "Get Recommendations"). I removed them.

**Prompt:** "Create a spreadsheet from your last answer."

**Result:** a checklist of claims against the app, pitch criteria and slides.

**Prompt:** "generate the deck based on what we have build and the deliverables."

**Result:** a 7-slide deck that only describes features that exist and puts the unbuilt ideas under "Next (not built yet)".

## What worked, and what I would do differently

- **Pasting the real source** (the hackathon brief, my Learn history) gave better results than describing it.
- **Asking for a comparison against the judging criteria** helped me decide.
- **Asking Claude to check my deck against the real app** caught claims that were not true.
- **Next time I would write more specific prompts for the cards.** For example: "Write a flashcard for [term] from the Microsoft Learn module [module name], in my own words. The definition should be under 25 words, with one line on why it matters. Do not use real exam questions. Say which part of the module it comes from."

## Content and review status

- The 21 cards were drafted by Claude from general Azure Fundamentals knowledge and the Learn module titles, in its own words. No real exam questions and no Microsoft logos are used.
- Cards checked against Microsoft Learn by me: [UPDATE THIS: how many of the 21 you checked, and any you corrected]
