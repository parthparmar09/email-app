import { configureStore } from "@reduxjs/toolkit";
import { emailApi, emailComposeSlice } from "@features/emails/";
import { userApi, userSlice } from "@features/users";
import { authApi } from "@features/auth";
import categoryReducer from "./slices/categorySlice";
import selectedEmailReducer from "./slices/selectedEmailSlice";

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [emailApi.reducerPath]: emailApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    user: userSlice.reducer,
    emailCompose: emailComposeSlice.reducer,
    category: categoryReducer,
    selectedEmail: selectedEmailReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(emailApi.middleware)
      .concat(userApi.middleware),
});

export default store;
