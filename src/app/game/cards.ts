// Suit Possibilties and Type Definiton
const suits = {
  CLUBS: "clubs",
  SPADES: "spades",
  HEARTS: "hearts",
  DIAMONDS: "diamonds",
} as const;
type Suit = (typeof suits)[keyof typeof suits];

// Card values Possibilties and Type Definiton
const values = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
] as const;
type Value = (typeof values)[number];

export type Deck = { suit: Suit; value: Value }[];

// initialize deck
export function initalizeDeck(): Deck {
  let deck: Deck = [];

  // create deck

  for (let value of values) {
    for (let suit of Object.keys(suits)) {
      deck.push({ value, suit: suits[suit as keyof typeof suits] });
    }
  }

  return deck;
}

// shuffing using Phisher-Yates Algorithm
export function shuffleDeck(deck: Deck): Deck {
  const copiedDeck = [...deck];

  // loop from highest number to lowest
  for (let i = copiedDeck.length - 1; i > 0; i--) {
    // pick a random number between 0 to the current remaining iteration range
    const randomIndex = Math.floor(Math.random() * (i + 1));

    const temp = copiedDeck[i];
    copiedDeck[i] = copiedDeck[randomIndex];
    copiedDeck[randomIndex] = temp;
  }

  return copiedDeck;
}
