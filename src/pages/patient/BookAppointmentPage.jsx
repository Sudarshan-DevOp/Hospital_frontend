import { useGetProfileQuery } from '../../store/api/patientApi'
import { useBookAppointmentMutation } from '../../store/api/appointmentApi'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { 
  Calendar, 
  User, 
  Phone, 
  MessageSquare, 
  Save, 
  Loader2, 
  ArrowLeft,
  Search,
  CheckCircle2,
  Clock
} from 'lucide-react'

// Mock doctors for now, in a real app these come from API
const SPECIALIZATIONS = [
  'General Medicine', 'Cardiology', 'Dermatology', 'Pediatrics', 'Neurology', 'Orthopedics'
]

export const BookAppointmentPage = () => {
  const navigate = useNavigate()
  const { data: profile } = useGetProfileQuery()
  const [bookAppointment, { isLoading: isBooking }] = useBookAppointmentMutation()

  const [formData, setFormData] = useState({
    doctor: 1, // Defaulting to doctor ID 1 for demonstration
    appointment_date: '',
    start_time: '',
    end_time: '',
    reason: '',
    notes: ''
  })

  const handleTimeChange = (e) => {
    const startTime = e.target.value
    if (!startTime) return

    // Calculate end time (30 mins later)
    const [hours, minutes] = startTime.split(':').map(Number)
    let endHours = hours
    let endMinutes = minutes + 30
    
    if (endMinutes >= 60) {
      endHours += 1
      endMinutes -= 60
    }
    
    const endTime = `${String(endHours).padStart(2, '0')}:${String(endMinutes).padStart(2, '0')}`
    setFormData({ ...formData, start_time: startTime, end_time: endTime })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await bookAppointment(formData).unwrap()
      toast.success('Appointment booked successfully!')
      navigate('/patient/appointments')
    } catch (err) {
      const msg = err?.data?.detail || err?.data?.non_field_errors?.[0] || 'Failed to book appointment.'
      toast.error(msg)
    }
  }

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto space-y-10 animate-in slide-in-from-right duration-700">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-500 hover:text-teal-600 transition-all font-bold group"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        Back
      </button>

      <header className="space-y-4">
         <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
           <Calendar className="text-teal-600" size={36} />
           Book an Appointment
         </h1>
         <p className="text-gray-500 font-medium italic">Select your preferred doctor and time slot to schedule a consultation.</p>
      </header>

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-8 space-y-8">
           {/* Section 1: Doctor Selection */}
          <div className="space-y-6">
            <h3 className="text-sm font-bold text-teal-600 uppercase tracking-widest flex items-center gap-2">
              <span className="bg-teal-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px]">1</span>
              Specialization & Doctor
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Select Specialization</label>
                <select className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-100 focus:bg-white focus:ring-1 focus:ring-teal-600 outline-none font-bold text-black capitalize">
                  {SPECIALIZATIONS.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Available Doctors</label>
                <div className="relative">
                   <select 
                    value={formData.doctor} 
                    onChange={(e) => setFormData({...formData, doctor: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-100 focus:bg-white focus:ring-1 focus:ring-teal-600 outline-none font-bold text-black appearance-none"
                  >
                    <option value="1">Dr. John Wilson (General)</option>
                    <option value="2">Dr. Sarah Jenkins (Cardiology)</option>
                  </select>
                  <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                </div>
              </div>
            </div>
          </div>

          <hr className="border-gray-50" />

          {/* Section 2: Date & Time */}
          <div className="space-y-6">
             <h3 className="text-sm font-bold text-teal-600 uppercase tracking-widest flex items-center gap-2">
              <span className="bg-teal-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px]">2</span>
              Schedule
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Preferred Date</label>
                <input 
                  type="date" 
                  required
                  value={formData.appointment_date}
                  onChange={(e) => setFormData({...formData, appointment_date: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-100 focus:bg-white focus:ring-1 focus:ring-teal-600 outline-none font-bold text-black" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Time Slot</label>
                <div className="relative">
                  <select 
                   required
                   value={formData.start_time}
                   onChange={handleTimeChange}
                   className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-100 focus:bg-white focus:ring-1 focus:ring-teal-600 outline-none font-bold text-black appearance-none"
                  >
                    <option value="">Select Time</option>
                    <option value="09:00">09:00 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="14:00">02:00 PM</option>
                    <option value="15:00">03:00 PM</option>
                  </select>
                  <Clock className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                </div>
              </div>
            </div>
          </div>

          <hr className="border-gray-50" />

          {/* Section 3: Additional Details */}
          <div className="space-y-6">
             <h3 className="text-sm font-bold text-teal-600 uppercase tracking-widest flex items-center gap-2">
              <span className="bg-teal-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px]">3</span>
              Reason for Visit
            </h3>
            <div className="space-y-6">
               <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Reason / Symptoms</label>
                <input 
                  required
                  placeholder="e.g. Regular checkup, severe headache"
                  className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-100 focus:bg-white focus:ring-1 focus:ring-teal-600 outline-none font-bold text-black"
                  value={formData.reason}
                  onChange={(e) => setFormData({...formData, reason: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Additional Notes</label>
                <textarea 
                  rows="3"
                  className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-100 focus:bg-white focus:ring-1 focus:ring-teal-600 outline-none resize-none italic font-medium"
                  placeholder="Any previous history or specific concerns..."
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 border-t border-gray-50 bg-gray-50/50 flex justify-end items-center gap-6">
           <div className="hidden md:flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-tighter italic">
              <CheckCircle2 size={14} className="text-teal-500" /> Secure scheduling verified
           </div>
           <button 
             type="submit" 
             disabled={isBooking}
             className="px-10 py-4 bg-gray-900 text-white rounded-2xl hover:bg-black transition-all shadow-xl shadow-gray-200 font-bold uppercase tracking-widest text-sm flex items-center gap-3"
           >
             {isBooking ? <Loader2 className="animate-spin" size={20} /> : <Calendar size={20} />}
             Confirm Appointment
           </button>
        </div>
      </form>
    </div>
  )
}
