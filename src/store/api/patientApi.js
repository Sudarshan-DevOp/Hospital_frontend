import { apiSlice } from './apiSlice'

export const patientApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => 'patient/profile/',
      providesTags: ['Patient'],
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: 'patient/profile/',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Patient'],
    }),
    getHealthRecord: builder.query({
      query: () => 'health-records/',
      providesTags: ['HealthRecord'],
    }),
    updateHealthRecord: builder.mutation({
      query: (data) => ({
        url: 'health-records/',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['HealthRecord'],
    }),
  }),
})

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useGetHealthRecordQuery,
  useUpdateHealthRecordMutation,
} = patientApi
