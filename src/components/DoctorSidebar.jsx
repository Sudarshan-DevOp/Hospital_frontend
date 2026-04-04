import { Link, useLocation, useNavigate } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  FileText, 
  Clock, 
  LogOut,
  ChevronRight,
  Settings,
  Bell
} from 'lucide-react'
import { toast } from 'sonner'

export const DoctorSidebar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  
  const menuItems = [
    { label: 'Overview', icon: LayoutDashboard, path: '/doctor/dashboard' },
    { label: 'Apointment Requests', icon: Clock, path: '/doctor/appointments/requests' },
    { label: 'Schedule Manager', icon: Calendar, path: '/doctor/schedule' },
    { label: 'Patient Database', icon: Users, path: '/doctor/patients' },
    { label: 'Medical Reports', icon: FileText, path: '/doctor/reports' },
    { label: 'Settings', icon: Settings, path: '/doctor/settings' },
  ]

  const handleSignOut = () => {
    localStorage.clear()
    toast.success('Signed out successfully')
    navigate('/')
  }

  const isActive = (path) => location.pathname === path

  return (
    <div className="w-72 bg-white h-screen sticky top-0 border-r border-gray-100 p-6 flex flex-col justify-between hidden lg:flex shadow-sm">
      <div className="space-y-10">
        <Link to="/" className="flex items-center gap-3 px-2">
           <div className="w-10 h-10 bg-teal-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-teal-100">
             D
           </div>
           <span className="text-xl font-bold text-gray-900 tracking-tight">HealthCare</span>
        </Link>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Link 
              key={item.path}
              to={item.path}
              className={`flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-300 group ${
                isActive(item.path) 
                ? 'bg-teal-600 text-white shadow-xl shadow-teal-100' 
                : 'text-gray-500 hover:bg-teal-50 hover:text-teal-600'
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon size={20} className={isActive(item.path) ? 'text-white' : 'text-gray-400 group-hover:text-teal-600'} />
                <span className="font-bold text-sm tracking-tight">{item.label}</span>
              </div>
              {isActive(item.path) && <ChevronRight size={16} />}
            </Link>
          ))}
        </nav>
      </div>

      <div className="space-y-4">
        <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
           <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Priority</p>
           <p className="text-sm font-bold text-gray-900 leading-tight">2 New Appointment Requests</p>
           <button className="mt-3 text-xs font-bold text-teal-600 hover:underline flex items-center gap-1">
             View All Alerts <ChevronRight size={12} />
           </button>
        </div>

        <div className="flex items-center gap-4 px-2">
           <div className="w-12 h-12 rounded-2xl bg-gray-50 border-2 border-teal-600/10 overflow-hidden">
             <img src={`https://ui-avatars.com/api/?name=${user.first_name}+${user.last_name}&background=0d9488&color=fff`} alt="pro" />
           </div>
           <div className="flex-1 overflow-hidden">
             <p className="text-sm font-black text-gray-900 truncate">Dr. {user.last_name}</p>
             <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest truncate">{user.specialization || 'Attending'}</p>
           </div>
           <button 
             onClick={handleSignOut}
             className="p-2 text-gray-400 hover:text-rose-500 transition-colors"
           >
             <LogOut size={20} />
           </button>
        </div>
      </div>
    </div>
  )
}
