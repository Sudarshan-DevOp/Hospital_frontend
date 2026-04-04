import { useGetProfileQuery, useUpdateProfileMutation } from '../../store/api/patientApi'
import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { User, Phone, Mail, MapPin, Calendar, Heart, MessageSquare, Camera, Save, Loader2 } from 'lucide-react'

export const UserProfile = () => {
  const { data: profile, isLoading } = useGetProfileQuery()
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation()
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone_number: '',
    date_of_birth: '',
    gender: '',
    blood_group: '',
    address: '',
    emergency_contact_name: '',
    emergency_contact_phone: '',
  })

  useEffect(() => {
    if (profile) {
      setFormData({
        first_name: profile.first_name || '',
        last_name: profile.last_name || '',
        phone_number: profile.phone_number || '',
        date_of_birth: profile.date_of_birth || '',
        gender: profile.gender || '',
        blood_group: profile.blood_group || '',
        address: profile.address || '',
        emergency_contact_name: profile.emergency_contact_name || '',
        emergency_contact_phone: profile.emergency_contact_phone || '',
      })
    }
  }, [profile])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await updateProfile(formData).unwrap()
      toast.success('Profile updated successfully!')
    } catch (err) {
      toast.error('Failed to update profile.')
    }
  }

  if (isLoading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-teal-600" size={40} /></div>

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-10 space-y-10 animate-in slide-in-from-bottom duration-700">
      <div className="flex flex-col md:flex-row items-center gap-8 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-40 h-40 bg-teal-50 rounded-full blur-3xl -z-10 group-hover:bg-teal-100 transition-all duration-700" />
        <div className="relative group/avatar">
           <div className="w-32 h-32 rounded-3xl overflow-hidden border-4 border-white shadow-lg shadow-teal-100 bg-gray-100 flex items-center justify-center">
            {profile?.profile_picture ? (
              <img src={profile.profile_picture} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <User size={64} className="text-gray-400" />
            )}
          </div>
          <button className="absolute -bottom-2 -right-2 p-2 bg-teal-600 text-white rounded-xl border-4 border-white shadow-lg hover:bg-teal-700 transition-all">
            <Camera size={18} />
          </button>
        </div>
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-bold text-gray-900">{profile?.first_name} {profile?.last_name}</h1>
          <p className="text-gray-500 font-medium flex items-center justify-center md:justify-start gap-2 mt-1 italic capitalize">
            <Heart size={16} className="text-rose-500" />
            {(profile?.role || 'Patient')} | Blood Group: {profile?.blood_group || 'N/A'}
          </p>
          <div className="mt-4 flex flex-wrap gap-3 justify-center md:justify-start">
             <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1">
              <Mail size={12} /> {profile?.email}
            </span>
             <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1">
              <Phone size={12} /> {profile?.phone_number || 'No Phone'}
            </span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-gray-50">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 capitalize">
            <User size={20} className="text-teal-600" />
            Personal Information
          </h2>
        </div>
        
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8 text-black capitalize">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 uppercase tracking-widest">First Name</label>
            <input name="first_name" value={formData.first_name} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-100 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 transition-all outline-none" placeholder="John" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 uppercase tracking-widest">Last Name</label>
            <input name="last_name" value={formData.last_name} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-100 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 transition-all outline-none" placeholder="Doe" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 uppercase tracking-widest">Phone Number</label>
            <input name="phone_number" value={formData.phone_number} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-100 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 transition-all outline-none" placeholder="+1234567890" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 uppercase tracking-widest">Date of Birth</label>
            <input name="date_of_birth" type="date" value={formData.date_of_birth} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-100 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 transition-all outline-none" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 uppercase tracking-widest">Gender</label>
            <select name="gender" value={formData.gender} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-100 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 transition-all outline-none bg-white">
              <option value="">Select Gender</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHER">Other</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 uppercase tracking-widest">Blood Group</label>
            <select name="blood_group" value={formData.blood_group} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-100 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 transition-all outline-none bg-white">
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>
          <div className="md:col-span-2 space-y-2">
            <label className="text-sm font-bold text-gray-700 uppercase tracking-widest">Address</label>
            <textarea name="address" value={formData.address} onChange={handleChange} rows="3" className="w-full px-4 py-3 rounded-xl border border-gray-100 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 transition-all outline-none resize-none" placeholder="Enter your full address" />
          </div>
        </div>

        <div className="p-8 border-t border-gray-50 bg-gray-50/50">
           <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-6 capitalize">
            <MessageSquare size={20} className="text-rose-600" />
            Emergency Contact Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-black capitalize">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 uppercase tracking-widest">Contact Name</label>
              <input name="emergency_contact_name" value={formData.emergency_contact_name} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-100 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 transition-all outline-none bg-white font-bold" placeholder="Emergency Person Name" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 uppercase tracking-widest">Contact Phone</label>
              <input name="emergency_contact_phone" value={formData.emergency_contact_phone} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-100 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 transition-all outline-none bg-white font-bold" placeholder="+1234567890" />
            </div>
          </div>
        </div>

        <div className="p-8 border-t border-gray-50 flex justify-end bg-white">
          <button 
            type="submit" 
            disabled={isUpdating}
            className="flex items-center gap-2 px-8 py-3.5 bg-teal-600 text-white rounded-2xl hover:bg-teal-700 transition-all shadow-xl shadow-teal-100 font-bold disabled:opacity-70 disabled:cursor-not-allowed capitalize tracking-wide"
          >
            {isUpdating ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
            Save Profile Changes
          </button>
        </div>
      </form>
    </div>
  )
}
