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

export const emailApi = createApi({
  reducerPath: "emailApi",
  baseQuery,
  tagTypes: ["Email"],
  endpoints: (builder) => ({
    getEmails: builder.query({
      query: ({ page, limit, category, searchTerm }) => ({
        url: "emails",
        params: { page, limit, category, searchTerm },
      }),
      providesTags: ["Email"],
    }),
    getEmailById: builder.query({
      query: (id) => `emails/${id}`,
      providesTags: (result, error, id) => [{ type: "Email", id }],
    }),
    createEmail: builder.mutation({
      query: ({ data, id }) => ({
        url: `emails/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Email"],
    }),

    deleteEmail: builder.mutation({
      query: (id) => ({
        url: `emails/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Email"],
    }),
    updateRecipientMetadata: builder.mutation({
      query: ({ emailId, update }) => ({
        url: `emails/${emailId}/metadata`,
        method: "PATCH",
        body: update,
      }),
      invalidatesTags: ["Email"],
    }),
  }),
});

export const {
  useGetEmailsQuery,
  useGetEmailByIdQuery,
  useCreateEmailMutation,
  useDeleteEmailMutation,
  useUpdateRecipientMetadataMutation,
} = emailApi;
