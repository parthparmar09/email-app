import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const selectedEmailSlice = createSlice({
  name: "selectedEmail",
  initialState,
  reducers: {
    selectEmail(state, action) {
      return action.payload;
    },
    updateMetadata(state, action) {
      state.userMetadata[action.payload.userId] = {
        ...state.userMetadata[action.payload.userId],
        ...action.payload.update,
      };
    },
  },
});

export const { selectEmail, updateMetadata } = selectedEmailSlice.actions;
export default selectedEmailSlice.reducer;
