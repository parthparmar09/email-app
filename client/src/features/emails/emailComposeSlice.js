import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  emailData: {
    _id: "",
    subject: "",
    recipientIds: [],
    ccIds: [],
    bccIds: [],
    body: "",
  },
};

export const emailComposeSlice = createSlice({
  name: "emailCompose",
  initialState,
  reducers: {
    openCompose(state, action) {
      state.isOpen = true;
      if (action.payload) {
        state.emailData = action.payload;
      }
    },
    closeCompose(state) {
      state.isOpen = false;
      state.emailData = initialState.emailData;
    },
    updateEmailData(state, action) {
      state.emailData = { ...state.emailData, ...action.payload };
    },
  },
});

export const { openCompose, closeCompose, updateEmailData } =
  emailComposeSlice.actions;
