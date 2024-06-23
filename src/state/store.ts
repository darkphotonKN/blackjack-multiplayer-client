// src/store.ts
import { TypedUseSelectorHook } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import clientReducer from "./slices/clientSlice";
import gameReducer from "./slices/gameSlice";
import { useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    client: clientReducer,
    game: gameReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
