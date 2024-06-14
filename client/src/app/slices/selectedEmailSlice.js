import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const selectedEmailSlice = createSlice({
  name: "selectedEmail",
  initialState,
  reducers: {
    selectEmail(state, action) {
      return action.payload;
    },
  },
});

export const { selectEmail } = selectedEmailSlice.actions;
export default selectedEmailSlice.reducer;
