import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Stethoscope } from 'lucide-react'

const BACKGROUND_IMAGE = 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1920&q=80'

export const AuthLayout = ({ children, title, subtitle, showBackLink = true }) => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div 
        className="absolute inset-0 animate-float"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${BACKGROUND_IMAGE})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />

      <div className="relative z-10 min-h-screen flex flex-col">
        {showBackLink && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="p-6"
          >
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-white/80 hover:text-white font-bold transition-all group"
            >
              <div className="p-2 rounded-xl bg-white/10 backdrop-blur-sm group-hover:bg-white/20 transition-all">
                <ArrowLeft size={20} />
              </div>
              Back to Home
            </Link>
          </motion.div>
        )}

        <div className="flex-1 flex flex-col items-center justify-center px-6 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="w-full max-w-md md:max-w-lg"
          >
            <div className="flex flex-col items-center gap-6 mb-8">
              <motion.div
                initial={{ scale: 0.8, rotate: -5 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-16 h-16 bg-gradient-to-br from-teal-400 to-teal-600 rounded-2xl flex items-center justify-center text-white shadow-2xl shadow-teal-500/30 backdrop-blur-sm"
              >
                <Stethoscope size={32} />
              </motion.div>
              <div className="text-center">
                <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight drop-shadow-lg">
                  {title}
                </h1>
                {subtitle && (
                  <p className="text-white/70 font-medium mt-2">{subtitle}</p>
                )}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="backdrop-blur-2xl bg-white/80 dark:bg-slate-900/80 border border-white/20 dark:border-slate-700/30 rounded-[2rem] shadow-2xl shadow-black/20 p-8 md:p-10"
            >
              {children}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex items-center justify-center gap-3 mt-8 text-white/60 text-xs font-bold uppercase tracking-[0.2em]"
            >
              <div className="w-8 h-[1px] bg-white/30" />
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Secure Medical Gateway
              </span>
              <div className="w-8 h-[1px] bg-white/30" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-8px) scale(1.02); }
        }
        
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
