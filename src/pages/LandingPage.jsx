import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight, HeartPulse, Syringe, Zap, Hospital, UserCog, Stethoscope, Star, CheckCircle2
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Utility for tailwind classes
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Animation Variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

// Reusable Components
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

const Card = ({ children, className = '' }) => (
  <motion.div
    variants={fadeIn}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-50px" }}
    className={cn('bg-white dark:bg-slate-900 p-6 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-2xl dark:hover:shadow-primary-900/20 transition-all duration-500 group relative overflow-hidden', className)}
  >
    {children}
  </motion.div>
)

const Section = ({ id, children, className = '', title, subtitle, centered = false }) => (
  <section id={id} className={cn('py-24 px-6 max-w-7xl mx-auto w-full relative', className)}>
    {(title || subtitle) && (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className={cn('mb-16', centered ? 'text-center' : '')}
      >
        {subtitle && <span className="text-primary-600 font-bold tracking-widest uppercase text-xs mb-3 block">{subtitle}</span>}
        {title && <h2 className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white mb-4 tracking-tight leading-tight">{title}</h2>}
      </motion.div>
    )}
    {children}
  </section>
)

export const LandingPage = () => {
  const [activeFacility, setActiveFacility] = useState('Medical Checkup')

  const facilities = [
    { name: 'Medical Checkup', icon: 'HeartPulse', desc: 'Our medical checkup services are designed to give you a complete picture of your health status.', img: '/medical_checkup.png' },
    { name: 'Dental', icon: 'Users', desc: 'Professional dental care for all ages, from routine cleaning to advanced surgical procedures.', img: '/dental_clinic.png' },
    { name: 'Laboratory', icon: 'Building2', desc: 'State-of-the-art laboratory facilities ensuring accurate and timely diagnostics.', img: '/medical_laboratory.png' },
    { name: 'Pharmacy', icon: 'BriefcaseMedical', desc: 'Fully stocked pharmacy with certified pharmacists to assist with your medications.', img: '/modern_pharmacy.png' },
    { name: 'Radiology', icon: 'Stethoscope', desc: 'Advanced imaging technology for precise diagnosis and treatment planning.', img: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800' }
  ]

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-black transition-colors duration-500 selection:bg-primary-500 selection:text-white">
      {/* Background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="parallax-blob w-[500px] h-[500px] bg-primary-100 dark:bg-primary-900/20 top-[-10%] right-[-10%]"></div>
        <div className="parallax-blob w-[400px] h-[400px] bg-teal-50 dark:bg-teal-900/10 bottom-[10%] left-[-5%] transition-all" style={{ animationDelay: '-5s' }}></div>
      </div>

      <main className="z-10 relative">
        {/* Hero Section */}
        <Section id="hero" className="pt-48 md:pt-56 pb-20">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: 'easeOut' }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100/50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 border border-primary-100 dark:border-primary-800 mb-8">
                <span className="flex h-2 w-2 rounded-full bg-primary-600 animate-pulse"></span>
                <span className="text-xs font-bold uppercase tracking-[0.2em]">Global Medical Standards</span>
              </div>
              <h1 className="text-7xl md:text-8xl font-black text-slate-900 dark:text-white leading-[0.95] tracking-tighter mb-10">
                Pure Care. <br />Every <span className="bg-gradient-to-r from-primary-600 to-teal-500 bg-clip-text text-transparent italic">Single</span> Time.
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-400 mb-12 leading-relaxed max-w-xl">
                Experience healthcare reimagined. From routine check-ups to life-saving treatments, we combine human empathy with robotic precision.
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <Button to="/register" className="h-16 px-12 text-lg bg-gradient-to-r from-primary-600 to-teal-600">
                  Get Started <ArrowRight size={20} />
                </Button>
                <Button variant="outline" className="h-16 px-12 text-lg border-2 dark:border-slate-700 dark:text-slate-300">
                  Find Doctor
                </Button>
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            >
              <div className="relative z-10 rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] group border-[12px] border-white dark:border-slate-900">
                <img
                  src="https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=800"
                  alt="Doctor"
                  className="w-full transition-all duration-700 group-hover:scale-105"
                />
              </div>
            </motion.div>
          </div>
        </Section>

        {/* Services Section */}
        <Section id="services" title="Quality Services" subtitle="Specialization" centered>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Vaccination', icon: Syringe, color: 'bg-primary-50 dark:bg-primary-900/20 text-primary-600', desc: 'Secure vaccinations for all ages and medical conditions.' },
              { title: 'Emergency', icon: Zap, color: 'bg-red-50 dark:bg-red-900/20 text-red-600', desc: 'Critical care units ready 24/7 for all types of emergencies.' },
              { title: 'Medical Center', icon: Hospital, color: 'bg-teal-50 dark:bg-teal-900/20 text-teal-600', desc: 'The heart of our healthcare services with various clinics.' },
              { title: 'Doctor Specialist', icon: UserCog, color: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600', desc: 'Over 50+ specialized doctors in various medical fields.' }
            ].map((item, idx) => (
              <Card key={item.title} className="flex flex-col items-center text-center hover:-translate-y-4">
                <div className={cn('w-20 h-20 rounded-[2.5rem] flex items-center justify-center mb-8 transition-transform group-hover:rotate-12', item.color)}>
                  <item.icon size={36} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{item.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-8">{item.desc}</p>
                <Link to="/facilities-services" className="mt-auto text-primary-600 font-bold flex items-center gap-2 group-hover:underline">
                  Details <ArrowRight size={16} />
                </Link>
              </Card>
            ))}
          </div>
        </Section>

        {/* Facilities Section */}
        <Section id="facilities" title="Best Facilities" subtitle="Infrastructure">
          <div className="grid lg:grid-cols-12 gap-12 bg-slate-50 dark:bg-slate-900/50 rounded-[4rem] p-8 md:p-12 border border-slate-100 dark:border-slate-800">
            <div className="lg:col-span-4 flex flex-col gap-4">
              {facilities.map(facility => (
                <button
                  key={facility.name}
                  onClick={() => setActiveFacility(facility.name)}
                  className={cn(
                    'flex items-center gap-4 px-8 py-6 rounded-3xl font-black transition-all duration-300 transform text-left',
                    activeFacility === facility.name
                      ? 'bg-primary-600 text-white shadow-2xl shadow-primary-500/40 -translate-y-1'
                      : 'bg-white dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white shadow-sm font-bold'
                  )}
                >
                  {facility.name}
                </button>
              ))}
            </div>

            <div className="lg:col-span-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFacility}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.5, ease: 'anticipate' }}
                  className="relative h-full"
                >
                  <div className="rounded-[3rem] overflow-hidden h-[500px] relative group border-8 border-white dark:border-slate-800 shadow-2xl">
                    <img
                      src={facilities.find(f => f.name === activeFacility).img}
                      alt={activeFacility}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
                    <div className="absolute bottom-10 left-10 right-10 text-white">
                      <h3 className="text-5xl font-black mb-4">{activeFacility}</h3>
                      <p className="text-slate-200 text-lg max-w-xl leading-relaxed">{facilities.find(f => f.name === activeFacility).desc}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </Section>

        {/* Insurance Section */}
        <Section id="insurance" title="Insurance Plans Accepted" subtitle="Coverage" centered>
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-[4rem] overflow-hidden shadow-2xl border-[12px] border-white dark:border-slate-900"
            >
              <img src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800" alt="Insurance" className="w-full h-full object-cover" />
            </motion.div>

            <div className="text-left">
              <p className="text-xl text-slate-600 dark:text-slate-400 mb-12 leading-relaxed">
                We've partnered with major insurance providers across the globe to ensure your healthcare is seamless and worry-free.
              </p>
              <ul className="space-y-6 mb-12">
                {['Direct billing facility', 'Wide network of insurance partners', 'Dedicated insurance desk', 'Zero paperwork for patients'].map((text, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="mt-1 w-8 h-8 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-400 flex-shrink-0">
                      <CheckCircle2 size={20} />
                    </div>
                    <span className="text-slate-700 dark:text-slate-300 text-lg font-medium">{text}</span>
                  </li>
                ))}
              </ul>
              <Button to="/patients-visitors" variant="secondary" className="h-16 px-12 text-lg border-primary-600/20">Explore Plans</Button>
            </div>
          </div>
        </Section>

        {/* Testimonials */}
        <Section id="testimonials" title="What Our Patients Say" subtitle="Testimonials" centered className="bg-slate-50 dark:bg-slate-950/50 rounded-[5rem]">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Sudarshan", role: "Psychologist", comment: "The healthcare services here are unmatched. Truly professional staff and modern equipment." },
              { name: "Mohit", role: "Cardiologist", comment: "Fast response time during emergencies and great attention to detail during consultation." },
              { name: "Krish", role: "Neurologist", comment: "I highly recommend the dental department. Very gentle and efficient process throughout." }
            ].map((item, i) => (
              <Card key={i} className="flex flex-col gap-8 p-10">
                <div className="flex gap-1 text-primary-500">
                  {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
                </div>
                <p className="text-xl text-slate-700 dark:text-slate-300 italic">"{item.comment}"</p>
                <div className="flex items-center gap-4 pt-6 border-t border-slate-100 dark:border-slate-800">
                  <div className="w-14 h-14 rounded-full overflow-hidden bg-slate-200">
                    <img src={`https://i.pravatar.cc/150?img=${i + 20}`} alt={item.name} />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 dark:text-white">{item.name}</h4>
                    <p className="text-sm text-slate-500 font-bold uppercase tracking-wider">{item.role}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Section>

        {/* Online Consultation Banner */}
        <Section id="banner" className="pt-0 pb-32">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-primary-600 to-teal-800 dark:from-primary-700 dark:to-teal-950 rounded-[4rem] p-12 md:p-20 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-16 shadow-[0_50px_100px_-20px_rgba(13,148,136,0.3)]"
          >
            <div className="relative z-10 text-center lg:text-left">
              <h2 className="text-5xl md:text-7xl font-black text-white mb-8 leading-[0.9] tracking-tight">
                24/7 Professional <br />Consultation.
              </h2>
              <p className="text-primary-50 text-xl font-medium mb-12 opacity-90 max-w-xl">
                Skip the wait. Access top-tier medical experts from your phone. Secure, private, and instant.
              </p>
              <Button to="/register" className="h-20 px-16 text-xl bg-white text-primary-700 hover:scale-105 hover:shadow-2xl">
                Book Instantly <ArrowRight size={28} />
              </Button>
            </div>

            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="relative z-0 opacity-20 pointer-events-none hidden lg:block"
            >
              <Stethoscope size={400} className="text-white" />
            </motion.div>
          </motion.div>
        </Section>
      </main>
    </div>
  )
}
