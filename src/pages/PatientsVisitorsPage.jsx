import React from 'react'
import { motion } from 'framer-motion'
import { Calendar, Phone, MapPin, CheckCircle2, Star, Zap, Syringe, HeartPulse } from 'lucide-react'

export const PatientsVisitorsPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-500 selection:bg-primary-500 selection:text-white pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-primary-600 font-bold uppercase tracking-widest text-xs mb-3 block">Patient Center</span>
          <h1 className="text-6xl md:text-8xl font-black text-slate-900 dark:text-white tracking-tighter mb-8 leading-[0.9]">
            Everything <br />You Need <span className="italic bg-gradient-to-r from-primary-600 to-teal-500 bg-clip-text text-transparent">to Know</span>.
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium">
            Plan your visit, access your medical records, and learn about our patient-first policies. We're here to make your experience as smooth as possible.
          </p>
        </motion.div>

        {/* Essential Services */}
        <div className="grid md:grid-cols-3 gap-8 mb-32">
          {[
            { title: 'Visit Planning', icon: Calendar, desc: 'Information on parking, visiting hours, and local accommodations for families.' },
            { title: 'Patient Rights', icon: CheckCircle2, desc: 'Learn about your rights and responsibilities during your time at our center.' },
            { title: 'Payment & Insurance', icon: Zap, desc: 'Detailed billing information and a list of accepted global insurance plans.' }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-slate-50 dark:bg-slate-900 p-12 rounded-[3.5rem] border border-slate-100 dark:border-slate-800 hover:shadow-2xl transition-all"
            >
              <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-[1.5rem] flex items-center justify-center mb-8 text-primary-600 shadow-xl">
                 <item.icon size={28} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 tracking-tighter">{item.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* FAQs Section */}
        <div className="grid lg:grid-cols-2 gap-20 items-start mb-32">
          <div>
            <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-12 tracking-tight leading-tight">Commonly Asked <br />Questions.</h2>
            <div className="space-y-6">
              {[
                { q: "What are the visiting hours?", a: "Visiting hours are from 10:00 AM to 8:00 PM daily. Intensive care units have specialized schedules." },
                { q: "Can I bring my children?", a: "Children are welcome but must be supervised at all times for their safety and our patients' comfort." },
                { q: "Is there a cafeteria?", a: "Yes, our main cafeteria is located on the ground floor, offering a variety of healthy options 24/7." }
              ].map((faq, i) => (
                <div key={i} className="p-8 rounded-[2rem] bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                  <h4 className="text-xl font-black text-slate-900 dark:text-white mb-4">{faq.q}</h4>
                  <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-primary-600 rounded-[4rem] p-12 md:p-20 text-white shadow-[0_50px_100px_-20px_rgba(13,148,136,0.3)]">
             <h2 className="text-4xl font-black mb-8">Need Immediate <br />Assistance?</h2>
             <p className="text-primary-100 text-lg mb-12 font-medium">Our international patient desk is available 24/7 to help you with anything from translation to travel coordination.</p>
             <div className="space-y-6">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center"><Phone size={24} /></div>
                   <span className="text-2xl font-black tracking-tight">+1 (800) MED-CENTER</span>
                </div>
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center"><MapPin size={24} /></div>
                   <span className="text-2xl font-black tracking-tight">Main Campus, Tokyo, Japan</span>
                </div>
             </div>
             <button className="mt-16 w-full h-20 bg-white text-primary-600 font-black rounded-[2rem] hover:scale-[1.02] hover:shadow-2xl transition-all uppercase tracking-widest text-xs">Download Visitor Guide</button>
          </div>
        </div>
      </div>
    </div>
  )
}
