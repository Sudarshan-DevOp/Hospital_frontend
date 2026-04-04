import { useGetAppointmentsQuery, useCancelAppointmentMutation } from '../../store/api/appointmentApi'
import { useState } from 'react'
import { toast } from 'sonner'
import { 
  Calendar, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Clock, 
  User, 
  XCircle, 
  CheckCircle2, 
  AlertCircle,
  PlusCircle,
  ChevronLeft,
  ChevronRight,
  Loader2
} from 'lucide-react'
import { Link } from 'react-router-dom'

export const AppointmentsPage = () => {
  const [page, setPage] = useState(1)
  const [statusFilter, setStatusFilter] = useState('')
  const { data: appointments, isLoading } = useGetAppointmentsQuery({ 
    page, 
    status: statusFilter 
  })
  const [cancelAppointment, { isLoading: isCancelling }] = useCancelAppointmentMutation()

  const handleCancel = async (id) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      try {
        await cancelAppointment(id).unwrap()
        toast.success('Appointment cancelled successfully.')
      } catch (err) {
        toast.error('Failed to cancel appointment.')
      }
    }
  }

  const getStatusStyle = (status) => {
    switch (status) {
      case 'approved': return 'bg-emerald-100 text-emerald-700 border-emerald-200'
      case 'pending': return 'bg-amber-100 text-amber-700 border-amber-200'
      case 'completed': return 'bg-blue-100 text-blue-700 border-blue-200'
      case 'cancelled': return 'bg-rose-100 text-rose-700 border-rose-200'
      default: return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved': return <CheckCircle2 size={14} />
      case 'pending': return <Clock size={14} />
      case 'completed': return <CheckCircle2 size={14} />
      case 'cancelled': return <XCircle size={14} />
      default: return <AlertCircle size={14} />
    }
  }

  if (isLoading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-teal-600" size={40} /></div>

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-top duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">My Appointments</h1>
          <p className="text-gray-500 mt-2 font-medium">Manage and track your schedule with doctors.</p>
        </div>
        <Link 
          to="/patient/book-appointment" 
          className="flex items-center justify-center gap-2 px-6 py-3.5 bg-gray-900 text-white rounded-2xl hover:bg-black transition-all shadow-xl shadow-gray-200 font-bold"
        >
          <PlusCircle size={20} />
          Book Appointment
        </Link>
      </header>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by doctor or reason..." 
            className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-teal-500/20 transition-all outline-none text-black font-bold" 
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="text-gray-400" size={18} />
          <select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-gray-50 px-4 py-3 rounded-xl border-none focus:ring-2 focus:ring-teal-500/20 transition-all outline-none font-bold text-black"
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Appointments List */}
      <div className="grid grid-cols-1 gap-6">
        {appointments?.results?.length > 0 ? (
          appointments.results.map((apt) => (
            <div key={apt.id} className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:shadow-lg hover:shadow-teal-100/30 transition-all border-l-8 border-l-teal-600">
              <div className="flex items-center gap-6">
                <div className="bg-gray-100 w-16 h-16 rounded-2xl flex items-center justify-center text-gray-500 border border-gray-200">
                  <User size={32} />
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-bold text-gray-900 uppercase tracking-widest leading-none">Dr. {apt.doctor?.user?.first_name || 'Specialist'}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border flex items-center gap-1.5 ${getStatusStyle(apt.status)}`}>
                      {getStatusIcon(apt.status)}
                      {apt.status}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-3 text-sm text-gray-500 font-medium">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-teal-600" />
                      {apt.appointment_date}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-teal-600" />
                      {apt.start_time} - {apt.end_time}
                    </div>
                  </div>
                  {apt.reason && (
                    <p className="mt-3 text-sm text-gray-600 italic">
                      <span className="font-bold uppercase text-xs mr-2 text-teal-600">REASON:</span> {apt.reason}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3 w-full md:w-auto">
                <button className="flex-1 md:flex-none px-6 py-3 bg-gray-50 text-gray-700 font-bold rounded-xl hover:bg-gray-100 transition-all text-sm uppercase tracking-wide">
                  Details
                </button>
                {apt.status === 'pending' && (
                  <button 
                    onClick={() => handleCancel(apt.id)}
                    disabled={isCancelling}
                    className="flex-1 md:flex-none px-6 py-3 bg-rose-50 text-rose-600 font-bold rounded-xl hover:bg-rose-600 hover:text-white transition-all text-sm uppercase tracking-wide border border-rose-100"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="p-20 text-center bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
            <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
              <Calendar size={40} className="text-gray-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">No appointments found</h3>
            <p className="text-gray-500 mt-2">Book your first consultation today!</p>
            <Link to="/patient/book-appointment" className="inline-block mt-6 px-8 py-3 bg-teal-600 text-white font-bold rounded-2xl hover:bg-teal-700 transition-all shadow-lg shadow-teal-100">
              Book Now
            </Link>
          </div>
        )}
      </div>

      {/* Pagination */}
      {appointments?.count > 10 && (
         <div className="flex items-center justify-center gap-4 py-8">
          <button 
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="p-3 rounded-xl border border-gray-100 bg-white hover:bg-teal-50 hover:text-teal-600 transition-all disabled:opacity-50"
          >
            <ChevronLeft size={20} />
          </button>
          <span className="font-bold text-gray-900">Page {page}</span>
          <button 
             onClick={() => setPage(p => p + 1)}
             disabled={!appointments.next}
             className="p-3 rounded-xl border border-gray-100 bg-white hover:bg-teal-50 hover:text-teal-600 transition-all disabled:opacity-50"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  )
}
