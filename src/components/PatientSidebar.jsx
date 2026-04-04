import { Link, useLocation, useNavigate } from 'react-router-dom'
import { 
  LayoutDashboard, 
  User, 
  Calendar, 
  FileText, 
  Activity, 
  LogOut,
  ChevronRight,
  Search
} from 'lucide-react'
import { toast } from 'sonner'

export const PatientSidebar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  
  const menuItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/patient/dashboard' },
    { label: 'My Appointments', icon: Calendar, path: '/patient/appointments' },
    { label: 'Find Doctors', icon: Search, path: '/doctors' },
    { label: 'Medical Documents', icon: FileText, path: '/patient/documents' },
    { label: 'Health Records', icon: Activity, path: '/patient/health-records' },
    { label: 'My Profile', icon: User, path: '/patient/profile' },
  ]

  const handleSignOut = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('user')
    toast.success('Signed out successfully')
    navigate('/')
  }

  const isActive = (path) => location.pathname === path

  return (
    <div className="w-72 bg-white h-screen sticky top-0 border-r border-gray-100 p-6 flex flex-col justify-between hidden lg:flex">
      <div className="space-y-10">
        <Link to="/" className="flex items-center gap-3 px-2">
           <div className="w-10 h-10 bg-teal-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-teal-100">
             H
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
           <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Support</p>
           <p className="text-sm font-bold text-gray-900 leading-tight">Need help with your records?</p>
           <button className="mt-3 text-xs font-bold text-teal-600 hover:underline flex items-center gap-1">
             Contact Center <ChevronRight size={12} />
           </button>
        </div>
        <button 
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-4 py-4 text-rose-500 hover:bg-rose-50 rounded-2xl transition-all font-bold"
        >
          <LogOut size={20} />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  )
}
