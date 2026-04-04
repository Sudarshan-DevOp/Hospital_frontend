import React from 'react'
import { Stethoscope, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

export const Footer = () => {
  return (
    <footer className="bg-slate-950 text-white pt-32 pb-12 px-6 border-t border-white/5 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
        <div className="flex flex-col items-center md:items-start gap-6">
          <div className="flex items-center gap-4 group">
            <div className="w-12 h-12 bg-primary-600 rounded-2xl flex items-center justify-center shadow-2xl group-hover:rotate-12 transition-transform">
              <Stethoscope size={28} />
            </div>
            <span className="text-3xl font-black tracking-tighter">Health<span className="text-primary-600">care</span></span>
          </div>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">© 2026 WORLD CLASS MEDICAL CENTER</p>
        </div>
        
        <div className="flex gap-8">
          {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
            <a 
              key={i} 
              href="#" 
              className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-slate-400 hover:bg-primary-600 hover:text-white transition-all transform hover:-translate-y-2"
            >
              <Icon size={24} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
