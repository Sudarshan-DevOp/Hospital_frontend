import { apiSlice } from './apiSlice'

export const appointmentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAppointments: builder.query({
      query: (params) => ({
        url: 'appointments/',
        params,
      }),
      providesTags: ['Appointment'],
    }),
    bookAppointment: builder.mutation({
      query: (data) => ({
        url: 'appointments/',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Appointment'],
    }),
    cancelAppointment: builder.mutation({
      query: (id) => ({
        url: `appointments/${id}/`,
        method: 'PATCH',
        body: { status: 'cancelled' },
      }),
      invalidatesTags: ['Appointment'],
    }),
  }),
})

export const {
  useGetAppointmentsQuery,
  useBookAppointmentMutation,
  useCancelAppointmentMutation,
} = appointmentApi
