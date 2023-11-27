import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const Authapi = createApi({
  reducerPath: "Authapi",
  baseQuery: fetchBaseQuery({
    baseUrl: "  https://contact-app.mmsdev.site/api/v1/",
  }),
  tagTypes: ["Authapi"],
  endpoints: (builder) => ({
    getSignIn: builder.mutation({
      query: (user) => ({
        url: "register",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["Authapi"],
    }),
    getLogin: builder.mutation({
      query: (user) => ({
        url: "login",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["Authapi"],
    }),
  }),
});

export const { useGetSignInMutation, useGetLoginMutation } = Authapi;
