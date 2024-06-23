import { Hand } from "./card";

export const gameState = {
  INIT_GAME: 0x20,
  RESET_GAME: 0x21,
} as const;
export type GameState = (typeof gameState)[keyof typeof gameState];

export const gameAction = {
  DRAW_CARD: 0x30,
  SKIP_TURN: 0x31,
  JOIN: 0x32,
  FORFEIT: 0x33,
} as const;
export type GameAction = (typeof gameAction)[keyof typeof gameAction];

export type Player = {
  clientId: string;
  hand: Hand;
};
export type Players = Player[];
