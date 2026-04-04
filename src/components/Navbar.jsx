import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Stethoscope, Moon, Sun, X, Menu } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const Button = ({ children, variant = 'primary', className = '', to, ...props }) => {
  const variants = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 shadow-lg shadow-primary-200 dark:shadow-none',
    outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20',
    secondary: 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-700 shadow-sm border border-slate-200 dark:border-slate-700'
  }
  
  const combinedClasses = cn('px-6 py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 active:scale-95', variants[variant], className);
  
  if (to) {
    return <Link to={to} className={combinedClasses} {...props}>{children}</Link>
  }
  
  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  )
}

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDark, setIsDark] = useState(document.documentElement.classList.contains('dark'))
  const location = useLocation()

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

  const navItems = [
    { name: 'About', path: '/about' },
    { name: 'Facilities & Services', path: '/facilities-services' },
    { name: 'Careers', path: '/careers' },
    { name: 'Patients & Visitors', path: '/patients-visitors' }
  ]

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 glass transition-all duration-500">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 cursor-pointer group">
            <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center text-white group-hover:rotate-12 transition-transform shadow-lg shadow-primary-200">
              <Stethoscope size={24} />
            </div>
            <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Health<span className="text-primary-600">care</span></span>
          </Link>

          <div className="hidden lg:flex items-center gap-10">
            {navItems.map((item, idx) => (
              <Link 
                key={item.name} 
                to={item.path} 
                className={cn(
                  "text-slate-600 dark:text-slate-400 font-medium hover:text-primary-600 dark:hover:text-primary-400 transition-colors text-sm px-1 py-2",
                  location.pathname === item.path ? "text-primary-600 dark:text-primary-400 font-black" : ""
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsDark(!isDark)}
              className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-90"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <Button to="/login" variant="outline" className="hidden sm:flex dark:border-slate-700 dark:text-slate-300">Login</Button>
            <Button to="/contact" className="hidden sm:flex bg-gradient-to-r from-primary-600 to-teal-600">Contact Us</Button>
            <button className="lg:hidden p-2 text-slate-600 dark:text-slate-400" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white dark:bg-black pt-24 px-6 lg:hidden"
          >
            <div className="flex flex-col gap-6">
              {navItems.map(item => (
                <Link 
                  key={item.name} 
                  to={item.path} 
                  className="text-3xl font-black text-slate-900 dark:text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <hr className="border-slate-100 dark:border-slate-800" />
              <Button to="/login" variant="outline" className="w-full text-xl py-6" onClick={() => setIsMenuOpen(false)}>Login</Button>
              <Button to="/contact" className="w-full text-xl py-6" onClick={() => setIsMenuOpen(false)}>Contact Us</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
