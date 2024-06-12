import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ClientState {
	id: string | null;
}

const initialState: ClientState = {
	id: null,
};

const clientSlice = createSlice({
	name: "client",
	initialState,
	reducers: {
		setClientId(state, action: PayloadAction<string>) {
			state.id = action.payload;
		},
	},
});

export const { setClientId } = clientSlice.actions;
export default clientSlice.reducer;
