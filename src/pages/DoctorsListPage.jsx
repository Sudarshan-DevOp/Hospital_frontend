import { useState } from 'react'
import { useGetDoctorsQuery, useGetSpecializationsQuery } from '../store/api/doctorApi'
import { Link } from 'react-router-dom'
import { 
  Search, 
  Filter, 
  MapPin, 
  Star, 
  Clock,
  Loader2,
  Stethoscope,
  User,
  ChevronRight,
  Calendar
} from 'lucide-react'

export const DoctorsListPage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSpecialization, setSelectedSpecialization] = useState('')
  const { data: doctors, isLoading } = useGetDoctorsQuery({
    specialization: selectedSpecialization,
    search: searchQuery,
  })
  const { data: specializations } = useGetSpecializationsQuery()

  const getStatusColor = (isAvailable) => {
    return isAvailable 
      ? 'bg-emerald-100 text-emerald-700 border-emerald-200' 
      : 'bg-gray-100 text-gray-500 border-gray-200'
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="animate-spin text-teal-600" size={48} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <header className="mb-10">
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">
            Find a <span className="text-teal-600">Doctor</span>
          </h1>
          <p className="text-gray-500 mt-2 font-medium">
            Browse our qualified healthcare professionals and book an appointment.
          </p>
        </header>

        <div className="bg-white rounded-3xl p-6 mb-8 shadow-sm border border-gray-100">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by doctor name or specialty..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl border border-gray-100 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 outline-none transition-all font-medium text-gray-900"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <select
                value={selectedSpecialization}
                onChange={(e) => setSelectedSpecialization(e.target.value)}
                className="w-full pl-12 pr-8 py-4 bg-gray-50 rounded-2xl border border-gray-100 focus:border-teal-600 outline-none transition-all font-bold text-gray-900 appearance-none cursor-pointer"
              >
                <option value="">All Specializations</option>
                {specializations?.results?.map((spec) => (
                  <option key={spec.id} value={spec.id}>
                    {spec.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors?.results?.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group"
            >
              <div className="p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-16 h-16 bg-teal-50 rounded-2xl flex items-center justify-center text-teal-600">
                    <User size={32} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900">
                      Dr. {doctor.user?.first_name} {doctor.user?.last_name}
                    </h3>
                    <p className="text-sm text-teal-600 font-medium mt-1">
                      {doctor.specialization_name || doctor.specialization?.name}
                    </p>
                    <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${getStatusColor(doctor.is_available)}`}>
                      {doctor.is_available ? 'Available' : 'Unavailable'}
                    </span>
                  </div>
                </div>

                <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-6">
                  {doctor.bio || 'Experienced specialist providing quality healthcare services.'}
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Clock size={16} className="text-teal-600" />
                    <span>{doctor.experience_years || 0} years experience</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Stethoscope size={16} className="text-teal-600" />
                    <span>₹{doctor.consultation_fee || 'N/A'}</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Link
                    to={`/patient/book-appointment?doctor=${doctor.id}`}
                    className="flex-1 py-3 bg-teal-600 text-white rounded-2xl font-bold text-center hover:bg-teal-700 transition-all flex items-center justify-center gap-2"
                  >
                    <Calendar size={18} />
                    Book Now
                  </Link>
                  <button className="px-4 py-3 bg-gray-50 text-gray-700 rounded-2xl font-bold hover:bg-gray-100 transition-all">
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {(!doctors?.results || doctors.results.length === 0) && (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-100">
            <User size={64} className="mx-auto text-gray-200 mb-4" />
            <h3 className="text-xl font-bold text-gray-900">No doctors found</h3>
            <p className="text-gray-500 mt-2">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </div>
  )
}
