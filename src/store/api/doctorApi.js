import { apiSlice } from './apiSlice'

export const doctorApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSpecializations: builder.query({
      query: () => 'doctors/specializations/',
      providesTags: ['Specialization'],
    }),
    getDoctors: builder.query({
      query: (params) => ({
        url: 'doctors/doctor-profile/',
        params,
      }),
      providesTags: ['Doctor'],
    }),
    getDoctor: builder.query({
      query: (id) => `doctors/doctor-profile/${id}/`,
      providesTags: ['Doctor'],
    }),
    getDoctorAvailability: builder.query({
      query: (doctorId) => ({
        url: 'doctors/availability-slots/',
        params: { doctor_id: doctorId },
      }),
      providesTags: ['Availability'],
    }),
  }),
})

export const {
  useGetSpecializationsQuery,
  useGetDoctorsQuery,
  useGetDoctorQuery,
  useGetDoctorAvailabilityQuery,
} = doctorApi
