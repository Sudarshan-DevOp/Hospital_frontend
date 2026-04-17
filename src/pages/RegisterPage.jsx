import { useState } from 'react'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Mail, Lock, User, Loader2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { AuthLayout } from '../components/AuthLayout'

export const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password1: '',
    password2: '',
    first_name: '',
    last_name: '',
    role: 'PATIENT'
  })
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const response = await fetch('/api/v1/auth/registration/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      const data = await response.json()
      
      if (response.ok) {
        toast.success('Account created successfully! Please sign in.')
        navigate('/login')
      } else {
        const errorMsg = data.email?.[0] || data.password1?.[0] || data.password?.[0] || data.detail || 'Registration failed'
        toast.error(errorMsg)
      }
    } catch (err) {
      toast.error('Registration failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <AuthLayout title="Create Account" subtitle="Join our medical community for better care">
      <form onSubmit={handleRegister} className="space-y-5">
        <div className="grid grid-cols-2 gap-4 mb-2">
          <button
            type="button"
            onClick={() => setFormData(prev => ({ ...prev, role: 'PATIENT' }))}
            className={`py-3 rounded-2xl font-bold text-sm transition-all border-2 ${
              formData.role === 'PATIENT' 
                ? 'bg-teal-50 dark:bg-teal-900/30 border-teal-500 text-teal-700 dark:text-teal-400' 
                : 'bg-slate-50/80 dark:bg-slate-800/80 border-transparent text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
            }`}
          >
            Patient
          </button>
          <button
            type="button"
            onClick={() => setFormData(prev => ({ ...prev, role: 'DOCTOR' }))}
            className={`py-3 rounded-2xl font-bold text-sm transition-all border-2 ${
              formData.role === 'DOCTOR' 
                ? 'bg-teal-50 dark:bg-teal-900/30 border-teal-500 text-teal-700 dark:text-teal-400' 
                : 'bg-slate-50/80 dark:bg-slate-800/80 border-transparent text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
            }`}
          >
            Doctor / Pro
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 ml-1 uppercase tracking-widest">First Name</label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-600 transition-colors">
                <User size={16} />
              </div>
              <input 
                type="text" 
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                placeholder="John"
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50/80 dark:bg-slate-800/80 border-2 border-transparent focus:border-teal-500 focus:bg-white dark:focus:bg-slate-700 rounded-2xl outline-none transition-all font-medium text-slate-900 dark:text-white placeholder:text-slate-400 text-sm"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 ml-1 uppercase tracking-widest">Last Name</label>
            <div className="relative group">
              <input 
                type="text" 
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                placeholder="Doe"
                className="w-full px-4 py-3.5 bg-slate-50/80 dark:bg-slate-800/80 border-2 border-transparent focus:border-teal-500 focus:bg-white dark:focus:bg-slate-700 rounded-2xl outline-none transition-all font-medium text-slate-900 dark:text-white placeholder:text-slate-400 text-sm"
                required
              />
            </div>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 ml-1 uppercase tracking-widest">Email Address</label>
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-600 transition-colors">
              <Mail size={16} />
            </div>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="name@example.com"
              className="w-full pl-12 pr-4 py-3.5 bg-slate-50/80 dark:bg-slate-800/80 border-2 border-transparent focus:border-teal-500 focus:bg-white dark:focus:bg-slate-700 rounded-2xl outline-none transition-all font-medium text-slate-900 dark:text-white placeholder:text-slate-400 text-sm"
              required
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 ml-1 uppercase tracking-widest">Password</label>
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-600 transition-colors">
              <Lock size={16} />
            </div>
            <input 
              type={showPassword ? "text" : "password"}
              name="password1"
              value={formData.password1}
              onChange={handleChange}
              placeholder="Min. 8 characters"
              className="w-full pl-12 pr-12 py-3.5 bg-slate-50/80 dark:bg-slate-800/80 border-2 border-transparent focus:border-teal-500 focus:bg-white dark:focus:bg-slate-700 rounded-2xl outline-none transition-all font-medium text-slate-900 dark:text-white placeholder:text-slate-400 text-sm"
              required
              minLength={8}
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 ml-1 uppercase tracking-widest">Confirm Password</label>
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-600 transition-colors">
              <Lock size={16} />
            </div>
            <input 
              type={showPassword ? "text" : "password"}
              name="password2"
              value={formData.password2}
              onChange={handleChange}
              placeholder="Confirm password"
              className="w-full pl-12 pr-12 py-3.5 bg-slate-50/80 dark:bg-slate-800/80 border-2 border-transparent focus:border-teal-500 focus:bg-white dark:focus:bg-slate-700 rounded-2xl outline-none transition-all font-medium text-slate-900 dark:text-white placeholder:text-slate-400 text-sm"
              required
            />
          </div>
        </div>

        <div className="flex items-center gap-2 px-2 py-2">
          <input type="checkbox" id="terms" required className="accent-teal-600 w-4 h-4 rounded" />
          <label htmlFor="terms" className="text-xs text-slate-600 dark:text-slate-400 font-medium">
            I agree to the <a href="#" className="text-teal-600 hover:underline">Terms</a> and <a href="#" className="text-teal-600 hover:underline">Privacy Policy</a>
          </label>
        </div>

        <motion.button 
          type="submit"
          disabled={isLoading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white font-black py-4 rounded-2xl shadow-lg shadow-teal-500/30 hover:shadow-xl hover:shadow-teal-500/40 transition-all text-base flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              Creating account...
            </>
          ) : (
            'Create Account'
          )}
        </motion.button>
      </form>

      <div className="mt-6 pt-6 border-t border-slate-200/50 dark:border-slate-700/50 text-center">
        <p className="text-slate-600 dark:text-slate-400 font-medium text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-teal-600 font-bold hover:underline">Sign in</Link>
        </p>
      </div>
    </AuthLayout>
  )
}
