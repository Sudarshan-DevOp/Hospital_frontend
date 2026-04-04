import { useGetAppointmentsQuery } from '../../store/api/appointmentApi'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Users, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  TrendingUp, 
  Activity, 
  Search,
  MoreVertical,
  MessageSquare,
  Phone,
  ArrowRight,
  Loader2,
  User,
  CalendarClock
} from 'lucide-react'

const StatCard = ({ label, value, trend, icon: Icon, color }) => (
  <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm shadow-gray-100/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group">
    <div className="flex justify-between items-start mb-6">
      <div className={`w-14 h-14 rounded-2xl ${color} bg-opacity-10 flex items-center justify-center transition-colors group-hover:bg-opacity-20`}>
        <Icon className={color.replace('bg-', 'text-')} size={28} />
      </div>
      <div className="flex flex-col items-end">
        <span className="text-xs font-black text-gray-400 uppercase tracking-widest">{label}</span>
        <h3 className="text-3xl font-black text-gray-900 mt-1">{value}</h3>
      </div>
    </div>
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1 text-emerald-500 bg-emerald-50 px-2 py-1 rounded-lg text-xs font-black italic">
        <TrendingUp size={14} />
        {trend}
      </div>
      <span className="text-xs font-bold text-gray-400 capitalize italic">than last month</span>
    </div>
  </div>
)

export const DoctorDashboard = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const { data: appointmentsData, isLoading } = useGetAppointmentsQuery({ page_size: 10 })
  
  const appointments = appointmentsData?.results || []
  
  const today = new Date().toISOString().split('T')[0]
  const todayAppointments = appointments.filter(apt => apt.appointment_date === today)
  const pendingAppointments = appointments.filter(apt => apt.status === 'pending').length
  const approvedAppointments = appointments.filter(apt => apt.status === 'approved').length

  const stats = [
    { label: 'Today\'s Appointments', value: todayAppointments.length, trend: '+18%', icon: Calendar, color: 'bg-teal-600' },
    { label: 'Pending Approval', value: pendingAppointments, trend: '+5%', icon: Clock, color: 'bg-amber-600' },
    { label: 'Approved', value: approvedAppointments, trend: '+12%', icon: CheckCircle2, color: 'bg-emerald-600' },
    { label: 'Total Patients', value: appointmentsData?.count || 0, trend: '+8%', icon: Users, color: 'bg-blue-600' },
  ]

  const getStatusStyle = (status) => {
    switch (status) {
      case 'approved': return 'bg-emerald-100 text-emerald-700 border-emerald-200'
      case 'pending': return 'bg-amber-100 text-amber-700 border-amber-200'
      case 'completed': return 'bg-blue-100 text-blue-700 border-blue-200'
      case 'cancelled': return 'bg-rose-100 text-rose-700 border-rose-200'
      default: return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="animate-spin text-teal-600" size={48} />
      </div>
    )
  }

  return (
    <div className="p-10 space-y-12 max-w-7xl mx-auto animate-in fade-in duration-1000">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4">
           <div className="flex items-center gap-2 text-teal-600 bg-teal-50 px-4 py-2 rounded-full w-fit">
              <span className="w-2 h-2 rounded-full bg-teal-600 animate-pulse"></span>
              <span className="text-xs font-black uppercase tracking-widest italic">Live Dashboard</span>
           </div>
           <h1 className="text-5xl font-black text-gray-900 tracking-tighter">Welcome back, <span className="text-teal-600">Dr. {user.last_name || 'Wilson'}</span></h1>
           <p className="text-gray-400 font-bold italic text-lg leading-relaxed">System operational. You have {todayAppointments.length} scheduled consultations today.</p>
        </div>
        <div className="flex items-center gap-4 bg-white p-2 rounded-3xl border border-gray-100 shadow-sm shadow-gray-100/50">
           <Search size={20} className="ml-4 text-gray-400" />
           <input 
             placeholder="Search patient records..." 
             className="px-4 py-3 bg-transparent outline-none font-bold text-gray-900 w-64 placeholder:text-gray-300"
           />
           <button className="bg-gray-900 text-white p-3 rounded-2xl hover:bg-black transition-all">
             <Search size={20} />
           </button>
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, idx) => (stat && <StatCard key={idx} {...stat} />))}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-3">
              Today's Appointments
              <span className="bg-teal-600 text-white px-3 py-1 rounded-full text-xs animate-none font-black italic">{appointments.length}</span>
            </h2>
            <button className="text-sm font-bold text-teal-600 hover:underline flex items-center gap-1 group">
              View Calendar <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="space-y-6">
            {appointments.length > 0 ? appointments.map((apt) => (
              <motion.div 
                key={apt.id}
                whileHover={{ scale: 1.01, x: 5 }}
                className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm shadow-gray-100/50 flex flex-col md:flex-row items-center justify-between gap-6 transition-all border-l-4 border-l-teal-600"
              >
                <div className="flex items-center gap-6 w-full md:w-auto">
                   <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center">
                     <User className="text-teal-600" size={24} />
                   </div>
                   <div className="flex-1 overflow-hidden">
                     <h4 className="font-black text-gray-900 text-lg truncate">
                       {apt.patient?.first_name} {apt.patient?.last_name}
                     </h4>
                     <p className="text-xs font-bold uppercase tracking-widest text-teal-600 italic">{apt.reason || 'Consultation'}</p>
                   </div>
                </div>

                <div className="flex items-center gap-12 w-full md:w-auto justify-between md:justify-end">
                   <div className="text-center hidden md:block">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Time Slot</p>
                      <p className="font-black text-gray-900 italic">{apt.start_time} - {apt.end_time}</p>
                   </div>
                   <div className="flex items-center gap-4">
                      <button className="p-3 text-gray-400 hover:text-teal-600 hover:bg-teal-50 rounded-xl transition-all">
                        <Phone size={20} />
                      </button>
                      <button className="p-3 text-gray-400 hover:text-teal-600 hover:bg-teal-50 rounded-xl transition-all">
                        <MessageSquare size={20} />
                      </button>
                      <span className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider border ${getStatusStyle(apt.status)}`}>
                        {apt.status}
                      </span>
                   </div>
                </div>
              </motion.div>
            )) : (
              <div className="text-center py-12 bg-gray-50 rounded-3xl">
                <CalendarClock className="mx-auto text-gray-300 mb-4" size={48} />
                <p className="text-gray-500 font-medium">No appointments scheduled for today.</p>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-8">
           <div className="flex items-center justify-between px-2">
             <h2 className="text-2xl font-black text-gray-900 tracking-tight">System Status</h2>
             <MoreVertical size={20} className="text-gray-400 cursor-pointer" />
           </div>

           <div className="bg-gray-900 rounded-[2.5rem] p-10 text-white space-y-10 shadow-2xl shadow-teal-200/20 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-teal-600/20 rounded-full -mr-32 -mt-32 blur-3xl"></div>
             <div className="relative z-10 flex flex-col items-center text-center space-y-6">
                <div className="w-20 h-20 rounded-3xl bg-teal-600 flex items-center justify-center animate-pulse">
                   <Activity size={40} className="text-white" />
                </div>
                <div className="space-y-2">
                   <h3 className="text-3xl font-black">Performance</h3>
                   <p className="text-teal-300 font-bold italic opacity-80">Your metrics are in the top 5% of this hospital network.</p>
                </div>
                <div className="w-full h-px bg-white/10"></div>
                <div className="w-full grid grid-cols-2 gap-6">
                   <div className="text-center">
                      <p className="text-4xl font-black">98.2<span className="text-teal-500 font-bold text-xl">%</span></p>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-teal-400">Success Rate</p>
                   </div>
                   <div className="text-center">
                      <p className="text-4xl font-black">4.8<span className="text-teal-500 font-bold text-xl">m</span></p>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-teal-400">Avg Session</p>
                   </div>
                </div>
                <button className="w-full py-4 bg-white text-gray-900 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-teal-50 transition-all">
                  Show Full Analytics
                </button>
             </div>
           </div>
        </div>
      </div>
    </div>
  )
}
