import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      if (action.payload.token) {
        localStorage.setItem("authToken", action.payload.token);
      }
      return action.payload.user;
    },
    clearUser() {
      localStorage.removeItem("authToken");
      return null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
