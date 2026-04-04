import React from 'react'
import { motion } from 'framer-motion'
import { BriefcaseMedical, Mail, Sparkles, Zap, Star, ArrowRight } from 'lucide-react'

export const CareersPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-500 selection:bg-primary-500 selection:text-white pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-primary-600 font-bold uppercase tracking-widest text-xs mb-3 block">Join Our Team</span>
          <h1 className="text-6xl md:text-8xl font-black text-slate-900 dark:text-white tracking-tighter mb-8 leading-[0.9]">
            Shape the <br />Future of <span className="italic bg-gradient-to-r from-primary-600 to-teal-500 bg-clip-text text-transparent">Healthcare</span>.
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            We are looking for brilliant minds and compassionate hearts to join us in redefining medical care and research on a global scale.
          </p>
        </motion.div>

        {/* Benefits Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-32">
          {[
            { title: 'Global Impact', icon: Zap, desc: 'Work on treatments that directly impact millions across our global medical network.' },
            { title: 'Innovation First', icon: Sparkles, desc: 'Access to state-of-the-art medical technology, AI diagnostics, and robotic tools.' },
            { title: 'Care Culture', icon: Star, desc: 'A supporting and empathetic environment that values work-life balance and mental health.' }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-slate-50 dark:bg-slate-900 p-12 rounded-[3rem] border border-slate-100 dark:border-slate-800 hover:-translate-y-4 group transition-all"
            >
              <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-[1.5rem] flex items-center justify-center mb-8 text-primary-600 shadow-xl group-hover:rotate-12 transition-transform">
                <item.icon size={28} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 tracking-tighter uppercase">{item.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Current Openings */}
        <div className="bg-slate-50 dark:bg-slate-950 p-12 md:p-20 rounded-[4rem]">
          <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-16 tracking-tight">Active Opportunities</h2>
          <div className="space-y-6">
             {[
               { role: 'Senior Cardiologist Specialist', loc: 'London Office', type: 'Full-time' },
               { role: 'Medical Lab Research Scientist', loc: 'New York Lab', type: 'Contract' },
               { role: 'ER Registered Nurse', loc: 'Tokyo Medical Center', type: 'Part-time' },
               { role: 'Digital Healthcare UX Researcher', loc: 'Remote', type: 'Full-time' }
             ].map((job, i) => (
                <div key={i} className="group bg-white dark:bg-slate-900 p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 hover:border-primary-600 dark:hover:border-primary-600 hover:translate-x-2 transition-all duration-500">
                  <div className="flex flex-col gap-2">
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white">{job.role}</h3>
                    <div className="flex gap-4 text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                      <span className="flex items-center gap-1"><Sparkles size={12} /> {job.loc}</span>
                      <span className="flex items-center gap-1"><BriefcaseMedical size={12} /> {job.type}</span>
                    </div>
                  </div>
                  <button className="h-14 px-8 rounded-2xl bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-300 font-black text-[10px] uppercase tracking-widest hover:bg-primary-600 hover:text-white transition-all">Apply Now</button>
                </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  )
}
