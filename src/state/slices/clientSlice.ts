import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ClientState = {
  id: string | null;
  clients: [string, string][];
};

const initialState: ClientState = {
  id: null,
  clients: [],
};

const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    setClientId(state, action: PayloadAction<string>) {
      state.id = action.payload;
    },
    setClients(state, action: PayloadAction<[string, string][]>) {
      state.clients = action.payload;
    },
  },
});

export const { setClientId, setClients } = clientSlice.actions;
export default clientSlice.reducer;
