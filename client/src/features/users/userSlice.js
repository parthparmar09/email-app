import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: "666a8f6461b0e48b0c961640",
  username: "Eve Doe",
  email: "evedoe@gmail.com",
  password: "$2a$10$nz91DoTHnk188hPvtTUUve6DfOK1mX7uN1of64b.mNNC5ESp26Bcm",
  createdAt: "2024-06-13T06:19:16.443Z",
  updatedAt: "2024-06-13T06:19:16.443Z",
  __v: 0,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      localStorage.setItem("authToken", action.payload.token);
      return action.payload.user;
    },
    clearUser() {
      localStorage.removeItem("authToken");
      return null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
