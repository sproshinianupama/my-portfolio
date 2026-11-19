import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiInstagram, } from 'react-icons/fi'

const socials = [
  { icon: <FiGithub />,    href: 'https://github.com/AnupamaSPR',    label: 'GitHub' },
  { icon: <FiLinkedin />, href: 'https://www.linkedin.com/in/roshini-anupama-49210a283',    label: 'LinkedIn' },
  { icon: <FiInstagram />, href: 'https://www.instagram.com/anupamaroshini?stkn=MWhqOWVmdDZja3hndA==', label: 'Instagram' },
]

const links = [
  { label: 'Home',         id: 'home' },
  { label: 'About',        id: 'about' },
  { label: 'Certificates', id: 'services' },
  { label: 'Projects',     id: 'portfolio' },
  { label: 'Experience',   id: 'experience' },
  { label: 'Gallery',      id: 'gallery' },
  { label: 'Contact',      id: 'contact' },
]

export default function Footer() {
  const year = new Date().getFullYear()
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <footer className="bg-darker border-t border-white/5 pt-14 pb-8 px-5 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-10 mb-10">

          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-2xl font-black font-grotesk mb-3">
              <span className="gradient-text">ANU</span>
              <span className="text-white">.</span>
              <span className="text-primary">SPR</span>
              <span className="text-white">.</span>
            </p>
            <p className="text-[#888] text-xs leading-relaxed max-w-xs">
              Building digital experiences that matter — one line of code at a time.
            </p>
          </motion.div>

          {/* Quick links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.1 }}
          >
            <p className="text-xs text-[#555] uppercase tracking-widest mb-4">Quick Links</p>
            <div className="grid grid-cols-2 gap-1">
              {links.map(({ label, id }) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className="text-sm text-[#888] hover:text-primary text-left transition-colors py-0.5"
                >
                  {label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Socials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.2 }}
          >
            <p className="text-xs text-[#555] uppercase tracking-widest mb-4">Follow Me</p>
            <div className="flex flex-wrap gap-3">
              {socials.map(({ icon, href, label }) => (
                <motion.a
                  key={label} href={href} target="_blank" rel="noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.15, y: -3 }}
                  className="w-9 h-9 glass rounded-full flex items-center justify-center
                             text-[#888] hover:text-primary hover:border-primary/30 transition-colors"
                >
                  {icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/5 mb-6" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#555]">
          <p>© {year} ANU.SPR. All rights reserved.</p>
          <p>
            Designed &amp; built by{' '}
            <span className="text-red-400">ANU♥</span> 
          </p>
        </div>
      </div>
    </footer>
  )
}
