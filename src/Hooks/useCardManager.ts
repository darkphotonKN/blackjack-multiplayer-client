import { useEffect, useState } from "react";
import { drawCard, initalizeDeck, shuffleDeck } from "../app/game/cards";
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
    const drawnCardAndDeck = drawCard(deck);
    if (drawnCardAndDeck) {
      const { drawnCard, remainingDeck } = drawnCardAndDeck;

      const drawnCardAndRemainingDeck = drawCard(remainingDeck);
      if (drawnCardAndRemainingDeck) {
        const {
          drawnCard: secondDrawnCard,
          remainingDeck: remainingDeckDrawnTwo,
        } = drawnCardAndRemainingDeck;

        if (drawnCard && secondDrawnCard) {
          setDealerHand([drawnCard, secondDrawnCard]);
        }

        // update remaining deck
        if (remainingDeckDrawnTwo) {
          setDeck(remainingDeckDrawnTwo);
        } else {
          // reset game
        }
      }
    }
  }, []);

  return { deck, dealerHand, playersHand };
};

export default useCardManager;
