import { apiSlice } from './apiSlice'

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: 'auth/token/',
        method: 'POST',
        body: credentials,
      }),
    }),
    refreshToken: builder.mutation({
      query: (data) => ({
        url: 'auth/token/refresh/',
        method: 'POST',
        body: data,
      }),
    }),
  }),
})

export const { useLoginMutation, useRefreshTokenMutation } = authApi
