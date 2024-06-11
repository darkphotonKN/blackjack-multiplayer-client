import { useEffect, useState } from "react";
import { drawCard, initalizeDeck, shuffleDeck } from "../game/cards";
import { Hand } from "../types/game/card.types";

const useCardManager = () => {
  const [deck, setDeck] = useState(shuffleDeck(initalizeDeck()));

  // dealer's cards
  const [dealerHand, setDealerHand] = useState<Hand>();

  // all player's cards
  const [playersHand, setPlayerHand] = useState<Hand[]>();

  // setup inital deck and hands
  useEffect(() => {
    // setup dealer's cards
    const { drawnCard: firstDrawnCard, remainingDeck } = drawCard(deck) || {};

    if (!remainingDeck) {
      throw new Error("Deck has no remaining cards");
    }

    const { drawnCard: secondDrawnCard, remainingDeck: remainingDeckSecond } =
      drawCard(remainingDeck) || {};

    if (!remainingDeckSecond) {
      throw new Error("Deck has no remaining cards");
    }

    const { drawnCard: thirdDrawnCard, remainingDeck: remainingDeckThird } =
      drawCard(remainingDeckSecond) || {};

    if (!remainingDeckThird) {
      throw new Error("Deck has nor emaining cards");
    }
    const { drawnCard: fourthDrawnCard, remainingDeck: remainingDeckFourth } =
      drawCard(remainingDeckThird) || {};

    if (
      firstDrawnCard &&
      secondDrawnCard &&
      thirdDrawnCard &&
      fourthDrawnCard &&
      remainingDeckFourth
    ) {
      // set player's cards
      const firstPlayerHand = [secondDrawnCard, fourthDrawnCard] as Hand;

      setPlayerHand([firstPlayerHand, firstPlayerHand]);

      // set hosts's cards
      setDealerHand([firstDrawnCard, thirdDrawnCard]);

      // update remaining deck
      setDeck(remainingDeckFourth);
    }
  }, []);

  console.log("deck:", deck);

  console.log("playersHand:", playersHand);

  console.log("dealerHand:", dealerHand);

  return { deck, dealerHand, playersHand };
};

export default useCardManager;
