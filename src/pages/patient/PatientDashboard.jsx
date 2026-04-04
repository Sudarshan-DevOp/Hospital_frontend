import { useGetProfileQuery } from '../../store/api/patientApi'
import { useGetAppointmentsQuery } from '../../store/api/appointmentApi'
import { useGetDocumentsQuery } from '../../store/api/documentApi'
import { Link } from 'react-router-dom'
import { 
  Calendar, 
  FileText, 
  User, 
  PlusCircle, 
  Clock, 
  ChevronRight,
  TrendingUp,
  Activity
} from 'lucide-react'

export const PatientDashboard = () => {
  const { data: profile } = useGetProfileQuery()
  const { data: appointments } = useGetAppointmentsQuery({ limit: 3 })
  const { data: documents } = useGetDocumentsQuery({ limit: 3 })

  const stats = [
    { label: 'Upcoming', value: appointments?.count || 0, icon: Calendar, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Records', value: documents?.count || 0, icon: FileText, color: 'text-teal-600', bg: 'bg-teal-50' },
    { label: 'Avg Pulse', value: '72 bpm', icon: Activity, color: 'text-rose-600', bg: 'bg-rose-50' },
  ]

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700">
      {/* Welcome Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, <span className="text-teal-600">{profile?.first_name || 'Patient'}</span>!
          </h1>
          <p className="text-gray-500 mt-1">Here's a summary of your health profile and upcoming tasks.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link 
            to="/patient/book-appointment" 
            className="flex items-center gap-2 px-4 py-2.5 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-all shadow-lg shadow-teal-100 font-medium"
          >
            <PlusCircle size={18} />
            Book Appointment
          </Link>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Appointments Section */}
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-50 flex items-center justify-between">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <Clock className="text-teal-600" size={20} />
                Upcoming Appointments
              </h2>
              <Link to="/patient/appointments" className="text-sm font-medium text-teal-600 hover:text-teal-700 flex items-center">
                View All <ChevronRight size={16} />
              </Link>
            </div>
            <div className="divide-y divide-gray-50">
              {appointments?.results?.length > 0 ? (
                appointments.results.map((apt) => (
                   <div key={apt.id} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="bg-gray-100 p-3 rounded-full">
                        <User className="text-gray-600" size={20} />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Dr. {apt.doctor_name || 'Specialist'}</p>
                        <p className="text-sm text-gray-500">{apt.appointment_date} at {apt.start_time}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      apt.status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {apt.status}
                    </span>
                  </div>
                ))
              ) : (
                <div className="p-12 text-center text-gray-500">
                  No upcoming appointments.
                </div>
              )}
            </div>
          </section>

          {/* Quick Actions / Health Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section className="bg-gradient-to-br from-teal-600 to-teal-700 rounded-2xl p-6 text-white shadow-xl shadow-teal-100">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Activity size={20} />
                Health Profile
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center bg-white/10 p-3 rounded-xl backdrop-blur-sm">
                  <span className="opacity-80">Blood Group</span>
                  <span className="font-bold">{profile?.blood_group || 'Not set'}</span>
                </div>
                <div className="flex justify-between items-center bg-white/10 p-3 rounded-xl backdrop-blur-sm">
                  <span className="opacity-80">Gender</span>
                  <span className="font-bold capitalize">{profile?.gender || 'Not set'}</span>
                </div>
                <div className="flex justify-between items-center bg-white/10 p-3 rounded-xl backdrop-blur-sm">
                  <span className="opacity-80">Age</span>
                  <span className="font-bold">24 Years</span>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-4">
                <Link to="/patient/documents/upload" className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-100 hover:border-teal-600 hover:bg-teal-50 transition-all text-gray-700 hover:text-teal-700">
                  <PlusCircle size={24} />
                  <span className="text-xs font-bold uppercase">Upload Report</span>
                </Link>
                <Link to="/doctors" className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-100 hover:border-teal-600 hover:bg-teal-50 transition-all text-gray-700 hover:text-teal-700">
                  <User size={24} />
                  <span className="text-xs font-bold uppercase">Find Doctor</span>
                </Link>
              </div>
            </section>
          </div>
        </div>

        {/* Sidebar: Recent Documents & Notifications */}
        <div className="space-y-8">
           <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-50 flex items-center justify-between">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <FileText className="text-teal-600" size={20} />
                Recent Documents
              </h2>
            </div>
            <div className="p-4 space-y-4">
              {documents?.results?.length > 0 ? (
                documents.results.map((doc) => (
                  <div key={doc.id} className="flex items-center gap-3 p-3 rounded-xl border border-gray-50 hover:border-teal-100 hover:bg-teal-50/30 transition-all cursor-pointer">
                    <div className="bg-teal-100 text-teal-700 p-2 rounded-lg">
                      <FileText size={18} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-gray-900 truncate">{doc.title}</p>
                      <p className="text-xs text-gray-500 capitalize">{doc.category.replace('_', ' ')}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center text-gray-500 italic text-sm">
                  No documents found.
                </div>
              )}
              <Link to="/patient/documents" className="block w-full py-3 text-center text-sm font-bold text-teal-600 border border-teal-600 rounded-xl hover:bg-teal-600 hover:text-white transition-all capitalize">
                All Documents
              </Link>
            </div>
          </section>

          {/* Quick Info Widget */}
          <div className="bg-gray-900 rounded-3xl p-6 text-white relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 bg-teal-500/10 w-32 h-32 rounded-full blur-3xl group-hover:bg-teal-500/20 transition-all duration-700" />
            <div className="relative z-10 space-y-4">
               <div className="flex items-center gap-2 text-teal-400 font-bold text-xs uppercase tracking-widest">
                <TrendingUp size={14} />
                Health Progress
              </div>
              <h4 className="text-xl font-bold">You're doing great!</h4>
              <p className="text-sm opacity-60 leading-relaxed">
                Complete your profile and keep your records updated for better consultation.
              </p>
              <button className="w-full py-3 bg-white text-black font-bold rounded-2xl hover:bg-teal-400 transition-colors">
                View Health Records
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
