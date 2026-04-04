import { apiSlice } from './apiSlice'

export const documentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDocuments: builder.query({
      query: (params) => ({
        url: 'documents/',
        params,
      }),
      providesTags: ['Document'],
    }),
    uploadDocument: builder.mutation({
      query: (formData) => ({
        url: 'documents/upload/',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Document'],
    }),
    deleteDocument: builder.mutation({
      query: (id) => ({
        url: `documents/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Document'],
    }),
  }),
})

export const {
  useGetDocumentsQuery,
  useUploadDocumentMutation,
  useDeleteDocumentMutation,
} = documentApi
