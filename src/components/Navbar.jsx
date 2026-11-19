import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenuAlt3, HiX } from 'react-icons/hi'

const links = [
  { label: 'Home',         id: 'home' },
  { label: 'About',        id: 'about' },
  { label: 'Certificates', id: 'services' },
  { label: 'Projects',     id: 'portfolio' },
  { label: 'Experience',   id: 'experience' },
  { label: 'Gallery',      id: 'gallery' },
  { label: 'Contact',      id: 'contact' },
]

const scrollTo = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)
  const [active, setActive]     = useState('home')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50)
      // Highlight active section
      links.forEach(({ id }) => {
        const el = document.getElementById(id)
        if (el) {
          const { top } = el.getBoundingClientRect()
          if (top <= 120) setActive(id)
        }
      })
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleClick = (id) => {
    setActive(id)
    setOpen(false)
    scrollTo(id)
  }

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-darker/80 backdrop-blur-xl border-b border-white/5 py-3' : 'py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <motion.button
            onClick={() => handleClick('home')}
            whileHover={{ scale: 1.05 }}
            className="text-xl font-black font-grotesk tracking-tight"
          >
            <span className="gradient-text">ANU</span>
            <span className="text-white">.</span>
            <span className="text-primary">SPR</span>
            <span className="text-white">.</span>
          </motion.button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7">
            {links.map(({ label, id }) => (
              <button
                key={id}
                onClick={() => handleClick(id)}
                className={`text-sm font-medium relative group transition-colors duration-200 ${
                  active === id ? 'text-white' : 'text-[#888] hover:text-white'
                }`}
              >
                {label}
                <span
                  className={`absolute -bottom-1 left-0 h-[2px] grad-border rounded-full transition-all duration-300 ${
                    active === id ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </button>
            ))}
          </nav>

          {/* Hire me CTA */}
          <motion.button
            onClick={() => handleClick('contact')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:block btn-primary"
          >
            Hire Me
          </motion.button>

          {/* Hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-white text-2xl"
            aria-label="Toggle menu"
          >
            {open ? <HiX /> : <HiMenuAlt3 />}
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.35 }}
            className="fixed inset-0 z-40 bg-darker/95 backdrop-blur-xl flex flex-col
                       items-center justify-center gap-8 md:hidden"
          >
            {links.map(({ label, id }, i) => (
              <motion.button
                key={id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => handleClick(id)}
                className={`text-3xl font-bold font-grotesk ${
                  active === id ? 'gradient-text' : 'text-white/70'
                }`}
              >
                {label}
              </motion.button>
            ))}
            <motion.button
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: links.length * 0.06 }}
              onClick={() => handleClick('contact')}
              className="btn-primary mt-4"
            >
              Hire Me
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
