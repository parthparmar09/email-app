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

export const emailApi = createApi({
  reducerPath: "emailApi",
  baseQuery,
  tagTypes: ["Email", "EmailList"],
  endpoints: (builder) => ({
    getEmails: builder.query({
      query: ({ page, limit, category, searchTerm }) => ({
        url: "emails",
        params: { page, limit, category, searchTerm },
      }),
      providesTags: (result, error, { category }) =>
        result
          ? [
              { type: "EmailList", id: category },
              ...result.emails.map(({ _id }) => ({ type: "Email", id: _id })),
            ]
          : [{ type: "EmailList", id: category }],
    }),
    getEmailById: builder.query({
      query: (id) => `emails/${id}`,
      providesTags: (result, error, id) => [{ type: "Email", id }],
    }),
    createEmail: builder.mutation({
      query: (newEmail) => ({
        url: "emails",
        method: "POST",
        body: newEmail,
      }),
      invalidatesTags: [{ type: "EmailList", id: "ALL" }],
    }),
    updateEmail: builder.mutation({
      query: ({ id, updatedEmail }) => ({
        url: `emails/${id}`,
        method: "PUT",
        body: updatedEmail,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Email", id }],
    }),
    deleteEmail: builder.mutation({
      query: (id) => ({
        url: `emails/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Email", id }],
    }),
    updateRecipientMetadata: builder.mutation({
      query: ({ emailId, update }) => ({
        url: `emails/${emailId}/metadata`,
        method: "PATCH",
        body: update,
      }),
      invalidatesTags: (result, error, { emailId }) => [
        { type: "Email", id: emailId },
      ],
    }),
  }),
});

export const {
  useGetEmailsQuery,
  useGetEmailByIdQuery,
  useCreateEmailMutation,
  useUpdateEmailMutation,
  useDeleteEmailMutation,
  useUpdateRecipientMetadataMutation,
} = emailApi;
