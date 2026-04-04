import React from 'react'
import { motion } from 'framer-motion'
import { Stethoscope, CheckCircle2, Star, Users, MapPin, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'

export const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-500 selection:bg-primary-500 selection:text-white pt-32 pb-20">
      {/* Background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="parallax-blob w-[500px] h-[500px] bg-primary-100 dark:bg-primary-900/20 top-[-10%] right-[-10%]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-primary-600 font-bold uppercase tracking-widest text-xs mb-3 block">Our Story</span>
          <h1 className="text-6xl md:text-8xl font-black text-slate-900 dark:text-white tracking-tighter mb-8 leading-[0.9]">
            Healing with <br /><span className="italic bg-gradient-to-r from-primary-600 to-teal-500 bg-clip-text text-transparent">Empathy</span> & Precision.
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Founded in 1995, Healthcare Center has grown into one of the world's leading medical institutions, pioneering treatments and saving millions of lives.
          </p>
        </motion.div>

        {/* Vision & Mission */}
        <div className="grid md:grid-cols-2 gap-8 mb-32">
          {[
            { title: 'Our Vision', desc: 'To redefine global healthcare through innovation, compassion, and accessible excellence for every person, everywhere.' },
            { title: 'Our Mission', desc: 'Providing world-class medical services integrated with research and education, focused on individual patient needs.' }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-slate-50 dark:bg-slate-900 p-12 rounded-[3rem] border border-slate-100 dark:border-slate-800"
            >
              <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-6 uppercase tracking-tight">{item.title}</h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-medium">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <div className="bg-primary-600 rounded-[4rem] p-16 grid md:grid-cols-4 gap-12 text-center text-white shadow-2xl shadow-primary-500/30 mb-32">
          {[
            { label: 'Specialized Doctors', value: '50+' },
            { label: 'Successful Surgeries', value: '1.2M+' },
            { label: 'Emergency Beds', value: '200+' },
            { label: 'Patient Satisfaction', value: '99%' }
          ].map((stat, i) => (
            <div key={i}>
              <h3 className="text-5xl font-black mb-2">{stat.value}</h3>
              <p className="text-primary-100 font-bold uppercase tracking-widest text-[10px]">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Global Network */}
        <div className="text-center">
          <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-12">Visit Our Locations</h2>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            {[
              { city: 'London', address: '12-14 Harley St, Marylebone' },
              { city: 'New York', address: '168 5th Ave, Manhattan' },
              { city: 'Tokyo', address: '6 Chome-10-1 Roppongi, Minato' }
            ].map((loc, i) => (
              <div key={i} className="p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 hover:border-primary-600 transition-colors bg-white dark:bg-slate-900/40">
                <MapPin className="text-primary-600 mb-6" size={32} />
                <h4 className="text-2xl font-black text-slate-900 dark:text-white mb-2">{loc.city}</h4>
                <p className="text-slate-500 dark:text-slate-400 font-medium">{loc.address}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
