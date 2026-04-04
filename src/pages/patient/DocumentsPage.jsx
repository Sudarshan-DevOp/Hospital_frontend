import { useGetDocumentsQuery, useUploadDocumentMutation, useDeleteDocumentMutation } from '../../store/api/documentApi'
import { useState } from 'react'
import { toast } from 'sonner'
import { 
  FileText, 
  Upload, 
  Trash2, 
  Download, 
  Search, 
  Filter, 
  Grid, 
  List, 
  Plus,
  Eye,
  Loader2,
  Calendar,
  X,
  FileIcon,
  CheckCircle2
} from 'lucide-react'

const CATEGORIES = [
  { value: 'LAB_REPORT', label: 'Lab Reports' },
  { value: 'PRESCRIPTION', label: 'Prescription' },
  { value: 'X_RAY', label: 'X-Ray' },
  { value: 'MRI', label: 'MRI' },
  { value: 'ULTRASOUND', label: 'Ultrasound' },
  { value: 'CANCER_REPORT', label: 'Cancer Report' },
  { value: 'OTHER', label: 'Other' },
]

export const DocumentsPage = () => {
  const [view, setView] = useState('grid')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const { data: documents, isLoading } = useGetDocumentsQuery({ category: categoryFilter })
  const [uploadDocument, { isLoading: isUploading }] = useUploadDocumentMutation()
  const [deleteDocument] = useDeleteDocumentMutation()

  const [uploadForm, setUploadForm] = useState({
    title: '',
    category: 'OTHER',
    description: '',
    file: null
  })

  const handleUpload = async (e) => {
    e.preventDefault()
    if (!uploadForm.file) return toast.error('Please select a file')
    
    const formData = new FormData()
    formData.append('title', uploadForm.title)
    formData.append('category', uploadForm.category)
    formData.append('description', uploadForm.description)
    formData.append('file', uploadForm.file)

    try {
      await uploadDocument(formData).unwrap()
      toast.success('Document uploaded successfully!')
      setIsUploadModalOpen(false)
      setUploadForm({ title: '', category: 'OTHER', description: '', file: null })
    } catch (err) {
      toast.error('Failed to upload document.')
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      try {
        await deleteDocument(id).unwrap()
        toast.success('Document deleted.')
      } catch (err) {
        toast.error('Failed to delete document.')
      }
    }
  }

  if (isLoading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-teal-600" size={40} /></div>

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8 animate-in zoom-in-95 duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Medical Documents</h1>
          <p className="text-gray-500 mt-2 font-medium">Keep all your health records organized and accessible.</p>
        </div>
        <button 
          onClick={() => setIsUploadModalOpen(true)}
          className="flex items-center justify-center gap-2 px-6 py-4 bg-teal-600 text-white rounded-2xl hover:bg-teal-700 transition-all shadow-xl shadow-teal-100 font-bold"
        >
          <Upload size={20} />
          Upload New Document
        </button>
      </header>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-3xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search documents..." 
              className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-teal-500/20 transition-all outline-none font-bold text-black" 
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="text-gray-400" size={18} />
            <select 
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-gray-50 px-4 py-3 rounded-2xl border-none focus:ring-2 focus:ring-teal-500/20 transition-all outline-none font-bold text-black"
            >
              <option value="">All Categories</option>
              {CATEGORIES.map(cat => <option key={cat.value} value={cat.value}>{cat.label}</option>)}
            </select>
          </div>
        </div>
        <div className="flex items-center p-1 bg-gray-100 rounded-2xl">
          <button 
            onClick={() => setView('grid')}
            className={`p-2 rounded-xl transition-all ${view === 'grid' ? 'bg-white shadow-sm text-teal-600' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <Grid size={20} />
          </button>
          <button 
            onClick={() => setView('list')}
            className={`p-2 rounded-xl transition-all ${view === 'list' ? 'bg-white shadow-sm text-teal-600' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <List size={20} />
          </button>
        </div>
      </div>

      {/* Documents Grid/List */}
      {documents?.results?.length > 0 ? (
        <div className={view === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-4"}>
          {documents.results.map((doc) => (
            <div 
              key={doc.id} 
              className={`bg-white border rounded-3xl overflow-hidden group transition-all duration-500 ${
                view === 'grid' 
                ? 'flex flex-col border-gray-100 hover:shadow-2xl hover:shadow-teal-100/40 hover:-translate-y-2' 
                : 'flex flex-row items-center border-gray-100 p-4 hover:shadow-lg'
              }`}
            >
              <div className={`${view === 'grid' ? 'h-40 w-full' : 'w-16 h-16'} bg-gray-50 flex items-center justify-center relative overflow-hidden group-hover:bg-teal-50 transition-colors`}>
                <div className="bg-white/80 p-4 rounded-3xl shadow-sm border border-gray-100 group-hover:bg-white group-hover:shadow-lg transition-all">
                  <FileIcon size={view === 'grid' ? 48 : 24} className="text-teal-500 stroke-[1.5px]" />
                </div>
                {view === 'grid' && (
                  <div className="absolute top-4 right-4 flex items-center gap-2 opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                    <button onClick={() => window.open(doc.file, '_blank')} className="p-3 bg-white text-gray-700 rounded-2xl hover:bg-teal-600 hover:text-white shadow-sm border border-gray-100 transition-all">
                      <Eye size={18} />
                    </button>
                    <button className="p-3 bg-white text-teal-600 rounded-2xl hover:bg-teal-600 hover:text-white shadow-sm border border-gray-100 transition-all">
                      <Download size={18} />
                    </button>
                  </div>
                )}
              </div>
              
              <div className={`p-6 ${view === 'grid' ? 'flex-1 flex flex-col' : 'ml-4 flex-1 flex items-center justify-between'}`}>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 bg-teal-50 text-[10px] font-extrabold text-teal-600 rounded-full border border-teal-100 uppercase tracking-tighter">
                      {doc.category.replace('_', ' ')}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-teal-600 truncate transition-colors uppercase tracking-widest">{doc.title}</h3>
                  <div className="mt-2 flex items-center gap-4 text-xs font-medium text-gray-400 italic">
                    <span className="flex items-center gap-1 uppercase tracking-tighter"><Calendar size={12} /> {new Date(doc.uploaded_at).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className={`mt-6 pt-6 border-t border-gray-50 flex items-center justify-between ${view === 'list' ? 'mt-0 pt-0 border-t-0' : ''}`}>
                  {view === 'grid' && (
                    <button 
                      onClick={() => handleDelete(doc.id)} 
                      className="p-3 text-rose-300 hover:text-rose-600 hover:bg-rose-50 rounded-2xl transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                  {view === 'list' && (
                    <div className="flex items-center gap-2">
                      <button onClick={() => window.open(doc.file, '_blank')} className="p-2 text-gray-400 hover:text-teal-600 transition-all"><Eye size={20} /></button>
                      <button className="p-2 text-gray-400 hover:text-teal-600 transition-all"><Download size={20} /></button>
                      <button onClick={() => handleDelete(doc.id)} className="p-2 text-gray-400 hover:text-rose-600 transition-all"><Trash2 size={20} /></button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-32 text-center bg-white rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center">
           <div className="bg-teal-50 w-24 h-24 rounded-full flex items-center justify-center text-teal-600 mb-6">
            <FileText size={48} />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 uppercase tracking-widest">No documents found</h3>
          <p className="text-gray-500 mt-2 max-w-sm font-medium italic">Your uploaded medical records like prescriptions and lab reports will appear here.</p>
          <button 
            onClick={() => setIsUploadModalOpen(true)}
            className="mt-8 px-8 py-3.5 bg-teal-600 text-white font-bold rounded-2xl hover:bg-teal-700 transition-all shadow-xl shadow-teal-100 uppercase tracking-widest text-sm"
          >
            Upload your first document
          </button>
        </div>
      )}

      {/* Upload Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-gray-100">
             <div className="px-8 py-6 bg-gray-900 flex items-center justify-between text-white border-b border-white/10">
              <h2 className="text-xl font-bold uppercase tracking-widest flex items-center gap-2">
                 <Upload size={20} className="text-teal-400" />
                 Upload Document
              </h2>
              <button onClick={() => setIsUploadModalOpen(false)} className="p-2 hover:bg-white/10 rounded-xl transition-all">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleUpload} className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Document Title</label>
                <input 
                  required
                  placeholder="e.g. Blood Test Report - March 2024"
                  className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-100 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 transition-all outline-none font-bold text-black"
                  value={uploadForm.title}
                  onChange={(e) => setUploadForm({...uploadForm, title: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Category</label>
                  <select 
                    className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-100 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 transition-all outline-none bg-white font-bold text-black capitalize"
                    value={uploadForm.category}
                    onChange={(e) => setUploadForm({...uploadForm, category: e.target.value})}
                  >
                    {CATEGORIES.map(cat => <option key={cat.value} value={cat.value}>{cat.label}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">File (PDF, JPG, PNG)</label>
                   <input 
                    type="file"
                    required
                    onChange={(e) => setUploadForm({...uploadForm, file: e.target.files[0]})}
                    className="w-full px-2 py-2 text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Notes (Optional)</label>
                <textarea 
                  rows="3"
                  placeholder="Add any additional details about this report..."
                  className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-100 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 transition-all outline-none resize-none font-medium italic"
                  value={uploadForm.description}
                  onChange={(e) => setUploadForm({...uploadForm, description: e.target.value})}
                />
              </div>

              <div className="pt-4 flex gap-4">
                <button 
                  type="button" 
                  onClick={() => setIsUploadModalOpen(false)}
                  className="flex-1 py-4 bg-gray-50 text-gray-700 rounded-2xl hover:bg-gray-100 transition-all font-bold uppercase tracking-widest text-xs"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={isUploading}
                  className="flex-1 py-4 bg-teal-600 text-white rounded-2xl hover:bg-teal-700 transition-all shadow-xl shadow-teal-100 font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2"
                >
                  {isUploading ? <Loader2 className="animate-spin" size={18} /> : (
                    <>
                      <Upload size={18} />
                      Complete Upload
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
