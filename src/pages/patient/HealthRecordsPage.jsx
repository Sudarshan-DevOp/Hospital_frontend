import { useGetHealthRecordQuery, useUpdateHealthRecordMutation } from '../../store/api/patientApi'
import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { 
  Activity, 
  History, 
  AlertCircle, 
  Pill, 
  ShieldAlert, 
  Plus, 
  Save, 
  Loader2,
  Calendar,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react'

export const HealthRecordsPage = () => {
  const { data: record, isLoading } = useGetHealthRecordQuery()
  const [updateRecord, { isLoading: isUpdating }] = useUpdateHealthRecordMutation()
  const [formData, setFormData] = useState({
    medical_history: '',
    allergies: '',
    current_medications: '',
    chronic_diseases: ''
  })

  useEffect(() => {
    if (record) {
      setFormData({
        medical_history: record.medical_history || '',
        allergies: record.allergies || '',
        current_medications: record.current_medications || '',
        chronic_diseases: record.chronic_diseases || ''
      })
    }
  }, [record])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await updateRecord(formData).unwrap()
      toast.success('Health record updated successfully!')
    } catch (err) {
      toast.error('Failed to update record.')
    }
  }

  if (isLoading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-teal-600" size={40} /></div>

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-10 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-50/50 rounded-full blur-3xl -z-10 group-hover:bg-teal-100/50 transition-all duration-700" />
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
             <Activity className="text-teal-600" size={32} />
             Electronic Health Records
          </h1>
          <p className="text-gray-500 mt-2 font-medium italic">Your comprehensive medical background and structured health data.</p>
        </div>
        <div className="bg-teal-50 px-4 py-2 rounded-2xl border border-teal-100 flex items-center gap-2 text-teal-700 text-xs font-bold uppercase tracking-widest shadow-sm">
           <CheckCircle2 size={16} /> Verified Records
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Navigation / Cards */}
        <div className="md:col-span-1 space-y-4">
           {[
             { label: 'Medical History', icon: History, color: 'emerald' },
             { label: 'Allergies', icon: AlertTriangle, color: 'rose' },
             { label: 'Medications', icon: Pill, color: 'blue' },
             { label: 'Chronic Diseases', icon: ShieldAlert, color: 'amber' },
           ].map((item, i) => (
             <div key={i} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-3 hover:border-teal-500 hover:shadow-lg hover:shadow-teal-100/30 transition-all cursor-pointer group">
               <div className={`p-2.5 rounded-xl bg-${item.color}-50 text-${item.color}-600 group-hover:bg-teal-600 group-hover:text-white transition-all`}>
                 <item.icon size={20} />
               </div>
               <span className="font-bold text-gray-900 text-sm tracking-tight">{item.label}</span>
             </div>
           ))}
        </div>

        {/* Editor Form */}
        <div className="md:col-span-3">
          <form onSubmit={handleSubmit} className="space-y-8">
             <div className="grid grid-cols-1 gap-8">
                {/* Medical History */}
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm group hover:border-teal-500 transition-all">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl"><History size={20} /></div>
                    <h3 className="text-xl font-bold text-gray-900 uppercase tracking-widest">Medical History</h3>
                  </div>
                  <textarea 
                    name="medical_history"
                    value={formData.medical_history}
                    onChange={handleChange}
                    rows="4"
                    placeholder="E.g. Past surgeries, injuries, hereditary conditions..."
                    className="w-full px-6 py-4 bg-gray-50 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all outline-none italic font-bold text-black"
                  />
                </div>

                {/* Allergies */}
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm group hover:border-teal-500 transition-all">
                   <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-rose-50 text-rose-600 rounded-xl"><AlertCircle size={20} /></div>
                    <h3 className="text-xl font-bold text-gray-900 uppercase tracking-widest">Allergies</h3>
                  </div>
                  <textarea 
                    name="allergies"
                    value={formData.allergies}
                    onChange={handleChange}
                    rows="3"
                    placeholder="List food, medicine, or seasonal allergies..."
                    className="w-full px-6 py-4 bg-gray-50 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-rose-500/20 focus:bg-white transition-all outline-none italic font-bold text-black"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   {/* Current Medications */}
                  <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm group hover:border-teal-500 transition-all">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-blue-50 text-blue-600 rounded-xl"><Pill size={20} /></div>
                      <h3 className="text-xl font-bold text-gray-900 uppercase tracking-widest text-sm">Medications</h3>
                    </div>
                    <textarea 
                      name="current_medications"
                      value={formData.current_medications}
                      onChange={handleChange}
                      rows="4"
                      placeholder="Medications currently being taken..."
                      className="w-full px-6 py-4 bg-gray-50 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all outline-none italic font-bold text-black"
                    />
                  </div>

                  {/* Chronic Diseases */}
                  <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm group hover:border-teal-500 transition-all">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-amber-50 text-amber-600 rounded-xl"><ShieldAlert size={20} /></div>
                      <h3 className="text-xl font-bold text-gray-900 uppercase tracking-widest text-sm">Chronic Diseases</h3>
                    </div>
                    <textarea 
                      name="chronic_diseases"
                      value={formData.chronic_diseases}
                      onChange={handleChange}
                      rows="4"
                      placeholder="Diabetes, Hypertension, etc..."
                      className="w-full px-6 py-4 bg-gray-50 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-amber-500/20 focus:bg-white transition-all outline-none italic font-bold text-black"
                    />
                  </div>
                </div>
             </div>

             <div className="flex justify-end pt-4">
               <button 
                 type="submit" 
                 disabled={isUpdating}
                 className="flex items-center gap-3 px-10 py-4 bg-gray-900 text-white rounded-2xl hover:bg-black transition-all shadow-xl shadow-gray-200 font-bold uppercase tracking-widest text-sm disabled:opacity-70"
               >
                 {isUpdating ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                 Update Medical Report
               </button>
             </div>
          </form>

          {/* Warning Message */}
          <div className="mt-12 bg-gray-50 p-6 rounded-3xl border border-gray-100 flex items-start gap-4">
             <AlertCircle className="text-gray-400 shrink-0" size={24} />
             <div>
               <p className="text-sm text-gray-500 font-medium italic">
                Note: This information is shared with your doctors to provide you with the best possible care. Please ensure all details are accurate and up to date.
               </p>
               <p className="text-xs text-gray-400 mt-2 flex items-center gap-1 uppercase tracking-tighter">
                 <Calendar size={12} /> Last updated: {new Date(record?.updated_at).toLocaleString()}
               </p>
             </div>
          </div>
        </div>
      </div>
    </div>
  )
}
