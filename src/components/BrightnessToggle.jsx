import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSun, FiMoon } from 'react-icons/fi'

export default function BrightnessToggle() {
  // Start in dark mode (false = dark, true = light)
  const [isLight, setIsLight] = useState(() => {
    return localStorage.getItem('theme') === 'light'
  })

  useEffect(() => {
    const root = document.documentElement
    if (isLight) {
      root.classList.add('light-mode')
      localStorage.setItem('theme', 'light')
    } else {
      root.classList.remove('light-mode')
      localStorage.setItem('theme', 'dark')
    }
  }, [isLight])

  return (
    <motion.button
      onClick={() => setIsLight((v) => !v)}
      aria-label={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
      title={isLight ? 'Dark mode' : 'Light mode'}
      whileHover={{ scale: 1.15, rotate: 15 }}
      whileTap={{ scale: 0.88 }}
      className="fixed bottom-8 right-6 z-[9990] w-12 h-12 rounded-full
                 bg-white/10 backdrop-blur-md border border-white/20
                 flex items-center justify-center shadow-xl shadow-black/30
                 hover:border-primary/60 hover:bg-primary/20 transition-colors duration-300"
    >
      <AnimatePresence mode="wait" initial={false}>
        {isLight ? (
          <motion.span
            key="moon"
            initial={{ opacity: 0, rotate: -120, scale: 0.4 }}
            animate={{ opacity: 1, rotate: 0,    scale: 1   }}
            exit={{    opacity: 0, rotate:  120, scale: 0.4 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="text-indigo-400 text-xl flex items-center justify-center"
          >
            <FiMoon />
          </motion.span>
        ) : (
          <motion.span
            key="sun"
            initial={{ opacity: 0, rotate:  120, scale: 0.4 }}
            animate={{ opacity: 1, rotate: 0,    scale: 1   }}
            exit={{    opacity: 0, rotate: -120, scale: 0.4 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="text-yellow-300 text-xl flex items-center justify-center"
          >
            <FiSun />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  )
}
