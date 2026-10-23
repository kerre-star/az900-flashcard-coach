# AZ-900 Flashcard Coach (Unofficial)

**Live demo:** https://az-900flashcard.netlify.app/

A flashcard tool for revising Microsoft Azure Fundamentals (AZ-900). It uses a box system: cards you get right move up a box and appear less often, and cards you miss drop back to box 1 and come back sooner. This is an unofficial study aid and is not affiliated with or endorsed by Microsoft.

## Features

- Flip cards by topic: core architecture, compute, networking, storage, identity and security
- "Got it" and "Still learning" buttons that move cards between boxes
- "Weak cards only" mode that focuses on the cards you keep getting wrong
- Progress line and bar showing how many cards you know and have mastered
- Progress saved in your browser with `localStorage`
- Keyboard shortcuts: Space to flip, left and right arrows to answer

## How to run

No installation is needed. Clone the repository and open `index.html` in a browser.

## Content

The cards are written in my own words from the public Microsoft Learn Azure Fundamentals modules. No real exam questions and no Microsoft logos are used.

## How AI was used

The cards and code were drafted with Claude. The prompts I used, and the review status of the cards, are in `PROMPTS.md`.
