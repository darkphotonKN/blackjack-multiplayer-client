import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit/react";
import { Deck, Hand } from "../../types/game/card";
import { Players } from "../../types/game";

type GameState = {
  deck: Deck;
  players: Players;
};

const initialState: GameState = {
  deck: [],
  players: [],
};

const gameSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    setDeck(state, action: PayloadAction<Deck>) {
      state.deck = action.payload;
    },
    setPlayers(state, action: PayloadAction<Players>) {
      state.players = action.payload;
    },
  },
});

export const { setDeck, setPlayers } = gameSlice.actions;
export default gameSlice.reducer;
