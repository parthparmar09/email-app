import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL + "/api",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    headers.set("Content-Type", "application/json");
    return headers;
  },
});
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery,
  endpoints: (builder) => ({
    getUserData: builder.query({
      query: () => "users",
    }),
    updateUser: builder.mutation({
      query: (userData) => ({
        url: `users`,
        method: "PUT",
        body: userData,
      }),
    }),
  }),
});

export const { useGetUserDataQuery, useUpdateUserMutation } = userApi;
