import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "/api",
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
      query: () => "user",
    }),
    updateUser: builder.mutation({
      query: ({ userId, userData }) => ({
        url: `user/${userId}`,
        method: "PUT",
        body: userData,
      }),
    }),
  }),
});

export const { useGetUserDataQuery, useUpdateUserMutation } = userApi;
