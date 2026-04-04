import React from 'react'
import { motion } from 'framer-motion'
import { 
  Trophy, 
  Target, 
  Zap, 
  Sword, 
  Shield, 
  Flame, 
  Crown, 
  Search, 
  Bell, 
  Gamepad2,
  Layout,
  Music,
  Camera,
  Coins
} from 'lucide-react'
import { toast } from 'sonner'
import './Portfolio.css'

export const PortfolioPage = () => {
  const skills = [
    { name: 'Financial Mastery', level: 85, icon: <Coins size={20} /> },
    { name: 'Continous Learning', level: 92, icon: <Layout size={20} /> },
    { name: 'Value Creation', level: 78, icon: <Target size={20} /> },
    { name: 'Video Editing', level: 65, icon: <Camera size={20} /> },
    { name: 'Creativity', level: 88, icon: <Music size={20} /> }
  ]

  const stats = [
    { label: 'Level', value: '99', color: 'var(--sl-accent)' },
    { label: 'Job', value: 'Shadow Monarch', color: '#fff' },
    { label: 'Title', value: 'One Who Overcomes Death', color: '#fff' },
    { label: 'Rank', value: 'S-Rank', color: '#ffd700' }
  ]

  const items = [
    { name: 'Mana Potion', type: 'Project', status: 'In Progress', icon: <Zap /> },
    { name: 'Shadow Extraction', type: 'Skill', status: 'Mastered', icon: <Flame /> },
    { name: 'Igris Blade', type: 'GitHub', status: 'Public', icon: <Sword /> },
    { name: 'System Key', type: 'Portfolio', status: 'Legacy', icon: <Crown /> }
  ]

  const handleLevelUp = () => {
    toast.success('Congratulations Player! LEVEL UP!', {
      description: 'You have reached Level 100. New skills unlocked.',
      icon: <Trophy className="text-yellow-400" />,
      style: {
        background: '#120c24',
        border: '1px solid var(--sl-accent)',
        color: '#fff'
      }
    })
  }

  return (
    <div className="sl-container">
      {/* Background Glows */}
      <div className="sl-bg-glow top-[-10%] left-[-10%]"></div>
      <div className="sl-bg-glow bottom-[-10%] right-[-10%]"></div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Navigation */}
        <motion.nav 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="sl-nav mt-8 mb-12"
        >
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-black sl-glow-text flex items-center gap-2 text-white">
              <Gamepad2 className="text-sl-accent" /> SYSTEM
            </h1>
            <div className="hidden md:flex gap-4">
              <a href="#" className="sl-nav-link active">Dashboard</a>
              <a href="#" className="sl-nav-link">Players</a>
              <a href="#" className="sl-nav-link">Skills</a>
              <a href="#" className="sl-nav-link">Marketplace</a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden lg:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-sl-text-muted" size={18} />
              <input 
                type="text" 
                placeholder="Search resources..." 
                className="bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 focus:border-sl-accent/50 outline-none w-64 transition-all text-white"
              />
            </div>
            <button className="p-2 rounded-full hover:bg-white/10 text-sl-text-muted">
              <Bell size={20} />
            </button>
            <div className="w-10 h-10 rounded-full border border-sl-accent overflow-hidden">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sudarshan" alt="Avatar" />
            </div>
          </div>
        </motion.nav>

        <div className="sl-grid">
          {/* Hero Profile */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="sl-card col-span-12 lg:col-span-4"
          >
            <h2 className="sl-title flex items-center gap-2 text-white">
              <Crown className="text-sl-accent" size={20} /> Profile Status
            </h2>
            
            <div className="flex flex-col items-center mb-8">
              <div className="sl-avatar-container pulse">
                <img src="https://api.dicebear.com/7.x/bottts-neutral/svg?seed=Sudarshan" alt="Profile" />
              </div>
              <h3 className="text-2xl font-bold mt-4 text-white">SUDARSHAN</h3>
              <p className="text-sl-text-muted text-sm uppercase tracking-widest mt-1">Player #0001</p>
            </div>

            <div className="space-y-4 mb-8">
              {stats.map((stat, i) => (
                <div key={i} className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="sl-stat-label">{stat.label}</span>
                  <span className="sl-stat-value" style={{ color: stat.color }}>{stat.value}</span>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-red-400 font-bold uppercase">HP</span>
                  <span className="text-white">1,200 / 1,200</span>
                </div>
                <div className="sl-progress-bar-container">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    className="sl-progress-fill bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]"
                  ></motion.div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-blue-400 font-bold uppercase">MP</span>
                  <span className="text-white">500 / 500</span>
                </div>
                <div className="sl-progress-bar-container">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    className="sl-progress-fill bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                  ></motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Skill Tracker */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="sl-card col-span-12 md:col-span-6 lg:col-span-4"
          >
            <h2 className="sl-title text-white">Abilities & Skills</h2>
            <div className="space-y-6">
              {skills.map((skill, i) => (
                <div key={i}>
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-3">
                      <div className="sl-skill-icon">{skill.icon}</div>
                      <span className="font-bold text-white">{skill.name}</span>
                    </div>
                    <span className="text-sl-accent font-black">LV. {skill.level}</span>
                  </div>
                  <div className="sl-progress-bar-container h-2">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      className="sl-progress-fill bg-sl-accent shadow-[0_0_10px_var(--sl-accent-glow)]"
                    ></motion.div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* XP Progress */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="sl-card col-span-12 md:col-span-6 lg:col-span-4 flex flex-col items-center justify-center p-12"
          >
            <h2 className="sl-title self-start text-white">Level Progress</h2>
            <div className="sl-circular-xp">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="100" cy="100" r="80" className="sl-circular-circle" />
                <motion.circle 
                  cx="100" cy="100" r="80" 
                  className="sl-circular-progress"
                  strokeDasharray="502.6"
                  initial={{ strokeDashoffset: 502.6 }}
                  animate={{ strokeDashoffset: 502.6 * (1 - 0.75) }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-4xl font-black sl-glow-text text-white">75%</span>
                <span className="text-xs text-sl-text-muted font-bold tracking-widest">XP GAIN</span>
              </div>
            </div>
            <div className="mt-8 text-center w-full">
              <p className="text-sm font-bold text-sl-text-muted mb-4">Total Playtime: 4,032 Hours</p>
              <div className="flex flex-col gap-3">
                <button 
                  onClick={handleLevelUp}
                  className="px-6 py-3 bg-sl-accent text-white font-bold rounded-xl hover:shadow-[0_0_30px_var(--sl-accent)] transition-all transform hover:scale-105"
                >
                  LEVEL UP
                </button>
                <button className="px-6 py-3 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 transition-all">
                  VIEW ACHIEVEMENTS
                </button>
              </div>
            </div>
          </motion.div>

          {/* Success Chart - Full Width Middle */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="sl-card col-span-12"
          >
            <h2 className="sl-title text-white">Project Success Rates</h2>
            <div className="flex items-end justify-around h-48 gap-4 pt-8">
              {[60, 85, 45, 90, 70, 95].map((height, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-4 group">
                  <div className="w-full relative">
                    <motion.div 
                      initial={{ height: 0 }}
                      whileInView={{ height: `${height}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                      className="w-full bg-sl-accent/20 border-t-2 border-sl-accent rounded-t-lg group-hover:bg-sl-accent/40 transition-all shadow-[0_0_15px_var(--sl-accent-glow)]"
                    >
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-black text-sl-accent opacity-0 group-hover:opacity-100 transition-opacity">
                        {height}%
                      </div>
                    </motion.div>
                  </div>
                  <span className="text-[10px] text-sl-text-muted font-bold tracking-widest uppercase">Phase 0{i+1}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Inventory/Marketplace */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="sl-card col-span-12"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="sl-title m-0 text-white">Inventory & Projects</h2>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-white/5 border border-white/10 rounded text-xs text-sl-text-muted">RELEVANCE</span>
                <span className="px-3 py-1 bg-sl-accent/20 border border-sl-accent/50 rounded text-xs text-sl-accent">LATEST</span>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {items.map((item, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -5, borderColor: 'var(--sl-accent)' }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-sl-accent/50 transition-all cursor-pointer group"
                >
                  <div className="w-12 h-12 bg-sl-accent/10 border border-sl-accent/20 rounded-xl flex items-center justify-center text-sl-accent mb-4 group-hover:bg-sl-accent group-hover:text-white transition-all">
                    {item.icon}
                  </div>
                  <h4 className="font-bold text-lg mb-1 text-white">{item.name}</h4>
                  <p className="text-xs text-sl-text-muted mb-4">{item.type}</p>
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-sl-accent">{item.status}</span>
                    <span className="text-sl-text-muted font-mono">ID: #SK-00{i+1}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center pb-20 opacity-50">
          <p className="text-xs tracking-widest uppercase mb-2 text-white">Developed by Sudarshan • 2024 System Interface</p>
          <div className="h-px w-24 bg-sl-accent mx-auto"></div>
        </div>
      </div>
    </div>
  )
}
