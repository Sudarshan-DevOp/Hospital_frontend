import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HeartPulse, Users, Building2, BriefcaseMedical, Stethoscope, ArrowRight, Zap, Hospital, UserCog } from 'lucide-react'

export const FacilitiesServicesPage = () => {
  const [activeTab, setActiveTab] = useState('clinical')

  const sections = {
    clinical: [
      { title: 'Vaccination', icon: HeartPulse, desc: 'World-class vaccination center for all ages and types of medical conditions.' },
      { title: 'Emergency', icon: Zap, desc: 'Critical care units ready 24/7 with the latest life-saving equipment.' },
      { title: 'Cardiology', icon: UserCog, desc: 'Advanced heart care from routine diagnostics to complex surgeries.' }
    ],
    diagnostic: [
      { title: 'Radiology', icon: Stethoscope, desc: 'Precision imaging including MRI, CT scan, and high-res X-rays.' },
      { title: 'Laboratory', icon: Building2, desc: 'Fully automated clinical laboratory for accurate and rapid diagnostics.' },
      { title: 'Pharmacy', icon: BriefcaseMedical, desc: '24/7 on-site pharmacy with professional clinical pharmacists.' }
    ]
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-500 selection:bg-primary-500 selection:text-white pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-primary-600 font-bold uppercase tracking-widest text-xs mb-3 block">Premium Infrastructure</span>
          <h1 className="text-6xl md:text-8xl font-black text-slate-900 dark:text-white tracking-tighter mb-8 leading-[0.9]">
            World-Class <br />Facilities & <span className="italic bg-gradient-to-r from-primary-600 to-teal-500 bg-clip-text text-transparent">Expert</span> Services.
          </h1>
        </motion.div>

        {/* Custom Tab Switcher */}
        <div className="flex justify-center mb-20">
          <div className="bg-slate-100 dark:bg-slate-900 p-2 rounded-[2rem] flex gap-2 border border-slate-200 dark:border-slate-800">
            {['clinical', 'diagnostic'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-10 py-5 rounded-[1.8rem] text-sm font-black tracking-widest uppercase transition-all duration-500 ${activeTab === tab ? 'bg-primary-600 text-white shadow-2xl shadow-primary-500/30 -translate-y-1' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
              >
                {tab} Services
              </button>
            ))}
          </div>
        </div>

        {/* Service Grid */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5 }}
            className="grid md:grid-cols-3 gap-8"
          >
            {sections[activeTab].map((item, i) => (
              <div 
                key={i}
                className="group relative bg-slate-50 dark:bg-slate-900 p-12 rounded-[3.5rem] border border-slate-100 dark:border-slate-800 hover:-translate-y-4 hover:shadow-[0_50px_100px_-20px_rgba(13,148,136,0.15)] transition-all duration-700 overflow-hidden"
              >
                <div className="relative z-10">
                  <div className="w-20 h-20 bg-white dark:bg-slate-800 rounded-[2rem] flex items-center justify-center mb-8 text-primary-600 shadow-xl group-hover:rotate-12 transition-transform">
                    <item.icon size={36} />
                  </div>
                  <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-4">{item.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-10">{item.desc}</p>
                  <button className="flex items-center gap-2 text-primary-600 font-black uppercase text-xs tracking-[0.2em] group-hover:underline">
                    Learn More <ArrowRight size={16} />
                  </button>
                </div>
                {/* Decorative background number */}
                <span className="absolute -bottom-10 -right-10 text-[12rem] font-black text-slate-900/5 dark:text-white/5 select-none transition-transform duration-1000 group-hover:scale-110">0{i+1}</span>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Specialized Center Section */}
        <div className="mt-32 pt-20 border-t border-slate-100 dark:border-slate-800">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="relative rounded-[4rem] overflow-hidden group shadow-2xl">
              <img src="/medical_checkup.png" alt="Medical Checkup" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
              <div className="absolute inset-0 bg-primary-600/10 group-hover:bg-primary-600/0 transition-colors"></div>
            </div>
            <div>
              <h2 className="text-5xl font-black text-slate-900 dark:text-white mb-8 tracking-tighter">Personalized Care <br />Centers.</h2>
              <p className="text-xl text-slate-600 dark:text-slate-400 mb-12 font-medium leading-relaxed">
                We believe in personalized medical attention. Each patient is assigned a care team that works together to build a unique treatment plan.
              </p>
              <div className="grid grid-cols-2 gap-8">
                {['24/7 Access', 'Global Panels', 'Robotic Surgery', 'AI Diagnostics'].map(feat => (
                  <div key={feat} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600">
                       <HeartPulse size={14} />
                    </div>
                    <span className="font-black text-xs text-slate-900 dark:text-white uppercase tracking-widest">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
