import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ClientInformation } from "../../types/message";

type ClientState = {
  id: string | null;
  clients: ClientInformation;
};

const initialState: ClientState = {
  id: null,
  clients: {
    clientId: "",
    clientIdList: [],
  },
};

const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    setClientId(state, action: PayloadAction<string>) {
      state.id = action.payload;
    },
    setClientInformation(state, action: PayloadAction<ClientInformation>) {
      state.clients = action.payload;
    },
  },
});

export const { setClientId, setClientInformation } = clientSlice.actions;
export default clientSlice.reducer;
