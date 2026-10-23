// ---------- 1. Elements and settings ----------
const topicSelect = document.querySelector("#topic-select");
const weakOnly = document.querySelector("#weak-only");
const flashcard = document.querySelector("#flashcard");
const cardTopic = document.querySelector("#card-topic");
const cardMain = document.querySelector("#card-main");
const cardExtra = document.querySelector("#card-extra");
const hint = document.querySelector("#hint");
const answerButtons = document.querySelector("#answer-buttons");
const missBtn = document.querySelector("#miss-btn");
const gotBtn = document.querySelector("#got-btn");
const flipBtn = document.querySelector("#flip-btn");
const progressText = document.querySelector("#progress-text");
const barFill = document.querySelector("#bar-fill");
const resetBtn = document.querySelector("#reset-btn");

const STORAGE_KEY = "az900-flashcards";
const MAX_BOX = 5;
const KNOWN_BOX = 2; // answered "Got it" at least once and not missed since
const MASTERED_BOX = 4;
// The lower the box, the more often a card is shown (box 1 = 16x box 5)
const WEIGHTS = { 1: 16, 2: 8, 3: 4, 4: 2, 5: 1 };

let progress = loadProgress(); // { cardId: { box, misses } }
let current = null;
let flipped = false;

// ---------- 2. Saved progress ----------
function loadProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return saved && typeof saved === "object" ? saved : {};
  } catch (error) {
    return {};
  }
}

function saveProgress() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (error) {
    // storage not available: the app still works, it just will not remember
  }
}

function stateOf(card) {
  return progress[card.id] || { box: 1, misses: 0 };
}

// ---------- 3. Choosing the next card (the box system) ----------
function cardPool() {
  return CARDS.filter((card) => {
    if (topicSelect.value !== "all" && card.topic !== topicSelect.value) {
      return false;
    }
    if (weakOnly.checked) {
      const state = stateOf(card);
      return state.misses > 0 && state.box <= 2;
    }
    return true;
  });
}

function pickCard() {
  let cards = cardPool();
  if (cards.length > 1 && current) {
    cards = cards.filter((card) => card.id !== current.id); // no immediate repeat
  }
  if (cards.length === 0) return null;

  const total = cards.reduce((sum, card) => sum + WEIGHTS[stateOf(card).box], 0);
  let roll = Math.random() * total;
  for (const card of cards) {
    roll -= WEIGHTS[stateOf(card).box];
    if (roll < 0) return card;
  }
  return cards[cards.length - 1];
}

// ---------- 4. Drawing the page ----------
function render() {
  flashcard.classList.toggle("flipped", flipped);

  if (!current) {
    cardTopic.textContent = "";
    cardMain.textContent = weakOnly.checked
      ? "No weak cards yet. Mark some cards as “Still learning” and they will appear here."
      : "No cards in this topic.";
    cardExtra.textContent = "";
    hint.textContent = "";
    answerButtons.hidden = true;
    flipBtn.hidden = true;
    return;
  }

  if (flipped) {
    cardTopic.textContent = current.term;
    cardMain.textContent = current.definition;
    cardExtra.textContent = "Why it matters: " + current.why;
    hint.textContent = "Did you remember it? Use the buttons, or the left and right arrow keys.";
  } else {
    cardTopic.textContent = current.topic;
    cardMain.textContent = current.term;
    cardExtra.textContent = "";
    hint.textContent = "Think of the definition, then press “Show answer” (or Space).";
  }
  answerButtons.hidden = !flipped;
  flipBtn.hidden = flipped;
}

function updateProgress() {
  const known = CARDS.filter((card) => stateOf(card).box >= KNOWN_BOX).length;
  const mastered = CARDS.filter((card) => stateOf(card).box >= MASTERED_BOX).length;
  progressText.textContent =
    `Known ${known} of ${CARDS.length} cards · Mastered ${mastered} (answered correctly 3 times in a row)`;
  barFill.style.width = `${(known / CARDS.length) * 100}%`;
}

// ---------- 5. Actions ----------
function showNext() {
  current = pickCard();
  flipped = false;
  render();
}

function flip() {
  if (!current) return;
  flipped = !flipped;
  render();
}

function answer(gotIt) {
  if (!current || !flipped) return;
  const state = stateOf(current);
  if (gotIt) {
    state.box = Math.min(MAX_BOX, state.box + 1); // move up a box
  } else {
    state.box = 1; // back to box 1: it will come back soon
    state.misses += 1;
  }
  progress[current.id] = state;
  saveProgress();
  updateProgress();
  showNext();
  flashcard.focus({ preventScroll: true });
}

// ---------- 6. Set up and listen ----------
[...new Set(CARDS.map((card) => card.topic))].forEach((topic) => {
  const option = document.createElement("option");
  option.value = topic;
  option.textContent = topic;
  topicSelect.appendChild(option);
});

flashcard.addEventListener("click", flip);
gotBtn.addEventListener("click", () => answer(true));
missBtn.addEventListener("click", () => answer(false));
flipBtn.addEventListener("click", flip);
topicSelect.addEventListener("change", showNext);
weakOnly.addEventListener("change", showNext);

resetBtn.addEventListener("click", () => {
  if (confirm("Reset all your progress?")) {
    progress = {};
    saveProgress();
    updateProgress();
    showNext();
  }
});

document.addEventListener("keydown", (event) => {
  const tag = document.activeElement.tagName;
  if (tag === "SELECT" || tag === "INPUT") return;
  if (event.key === "ArrowRight" && flipped) {
    answer(true);
  } else if (event.key === "ArrowLeft" && flipped) {
    answer(false);
  } else if (event.key === " " && tag !== "BUTTON") {
    event.preventDefault();
    flip();
  }
});

updateProgress();
showNext();
