import { useState } from 'react'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Mail, Lock, Loader2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../store/api/authApi'
import { toast } from 'sonner'
import { AuthLayout } from '../components/AuthLayout'

export const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const [login, { isLoading }] = useLoginMutation()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const result = await login({ email, password }).unwrap()
      localStorage.setItem('token', result.access)
      localStorage.setItem('refreshToken', result.refresh)
      localStorage.setItem('user', JSON.stringify(result.user))
      toast.success(`Welcome back, ${result.user.first_name}!`)
      const role = result.user.role
      if (role === 'PATIENT') navigate('/patient/dashboard')
      else if (role === 'DOCTOR') navigate('/doctor/dashboard')
      else navigate('/')
    } catch (err) {
      const msg = err?.data?.detail || 'Login failed. Please check your credentials.'
      toast.error(msg)
    }
  }

  return (
    <AuthLayout title="Welcome Back" subtitle="Sign in to access your healthcare dashboard">
      <form onSubmit={handleLogin} className="space-y-5">
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 ml-1 uppercase tracking-widest">Email Address</label>
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-600 transition-colors">
              <Mail size={18} />
            </div>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full pl-12 pr-4 py-4 bg-slate-50/80 dark:bg-slate-800/80 border-2 border-transparent focus:border-teal-500 focus:bg-white dark:focus:bg-slate-700 rounded-2xl outline-none transition-all font-medium text-slate-900 dark:text-white placeholder:text-slate-400"
              required
            />
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between items-center ml-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-widest">Password</label>
            <a href="#" className="text-xs font-bold text-teal-600 hover:text-teal-700 hover:underline">Forgot password?</a>
          </div>
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-600 transition-colors">
              <Lock size={18} />
            </div>
            <input 
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-12 pr-12 py-4 bg-slate-50/80 dark:bg-slate-800/80 border-2 border-transparent focus:border-teal-500 focus:bg-white dark:focus:bg-slate-700 rounded-2xl outline-none transition-all font-medium text-slate-900 dark:text-white placeholder:text-slate-400"
              required
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
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
              Signing in...
            </>
          ) : (
            'Sign In'
          )}
        </motion.button>
      </form>

      <div className="mt-8 pt-6 border-t border-slate-200/50 dark:border-slate-700/50 text-center">
        <p className="text-slate-600 dark:text-slate-400 font-medium text-sm">
          Don't have an account?{' '}
          <Link to="/register" className="text-teal-600 font-bold hover:underline">Create account</Link>
        </p>
      </div>
    </AuthLayout>
  )
}
