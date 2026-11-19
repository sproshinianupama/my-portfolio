import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiArrowDown, FiDownload, FiGithub, FiLinkedin } from 'react-icons/fi'

const ROLES = ['Frontend Developer', 'React Specialist', 'QA Engineer']

function useTyping(words) {
  const [index, setIndex]       = useState(0)
  const [text, setText]         = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[index]
    let timer
    if (!deleting && text.length < word.length) {
      timer = setTimeout(() => setText(word.slice(0, text.length + 1)), 85)
    } else if (!deleting && text.length === word.length) {
      timer = setTimeout(() => setDeleting(true), 2000)
    } else if (deleting && text.length > 0) {
      timer = setTimeout(() => setText(text.slice(0, -1)), 45)
    } else {
      setDeleting(false)
      setIndex((i) => (i + 1) % words.length)
    }
    return () => clearTimeout(timer)
  }, [text, deleting, index, words])

  return text
}

const socials = [
  { icon: <FiGithub />,   href: 'https://github.com/AnupamaSPR',                              label: 'GitHub' },
  { icon: <FiLinkedin />, href: 'https://www.linkedin.com/in/roshini-anupama-49210a283',    label: 'LinkedIn' },
]

const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.1 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

export default function Hero() {
  const typed = useTyping(ROLES)

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-primary/20 rounded-full blur-[120px] animate-blob" />
        <div className="absolute bottom-1/4 right-1/4 w-[200px] md:w-[400px] h-[200px] md:h-[400px] bg-pink-600/15 rounded-full blur-[100px] animate-blob [animation-delay:2s]" />
        <div className="absolute top-2/3 left-2/3 w-[150px] md:w-[300px] h-[150px] md:h-[300px] bg-indigo-500/10 rounded-full blur-[80px] animate-blob [animation-delay:4s]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-5 md:px-12 w-full pt-24 pb-20">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-14">

          {/* ── Left: Text ── */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="flex-1 text-center lg:text-left w-full"
          >
            {/* Available badge */}
            <motion.div variants={fadeUp}
              className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-xs text-primary mb-5"
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Available for new projects
            </motion.div>

            {/* Greeting */}
            <motion.p variants={fadeUp} className="text-[#888] text-base md:text-lg mb-1">Hello, I'm</motion.p>

            {/* Name — scales down on small screens */}
            <motion.h1
              variants={fadeUp}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black font-grotesk leading-[1.05] mb-3"
            >
              Roshini Anupama
              <br />
              <span className="gradient-text">Priyadarshani</span>
            </motion.h1>

            {/* Typed role */}
            <motion.p variants={fadeUp} className="text-base md:text-lg text-[#888] mb-2 min-h-[28px]">
              I'm a{' '}
              <span className="text-primary font-semibold">
                {typed}
                <span className="animate-blink ml-0.5">|</span>
              </span>
            </motion.p>

            {/* Description */}
            <motion.p
              variants={fadeUp}
              className="text-[#888] text-sm leading-relaxed max-w-lg mb-8 mx-auto lg:mx-0"
            >
              I craft beautiful, high-performance web experiences with clean code and
              thoughtful design. Passionate about turning ideas into pixel-perfect products.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8">
              <motion.button
                whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }}
                onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary"
              >
                View My Work
              </motion.button>
              <motion.a
                href="/resume.pdf" download
                whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }}
                className="btn-outline flex items-center gap-2"
              >
                <FiDownload /> Download CV
              </motion.a>
            </motion.div>

            {/* Socials */}
            <motion.div variants={fadeUp} className="flex gap-3 justify-center lg:justify-start">
              {socials.map(({ icon, href, label }) => (
                <motion.a
                  key={label} href={href} target="_blank" rel="noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.2, y: -3 }}
                  className="w-10 h-10 glass rounded-full flex items-center justify-center text-[#888] hover:text-primary transition-colors"
                >
                  {icon}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right: Avatar ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="flex-shrink-0 flex justify-center"
          >
            {/* Outer wrapper — generous padding so floating cards never clip */}
            <div className="relative animate-float mt-10 mb-6 mx-12 md:mx-16">
              {/* Spinning rings */}
              <div className="absolute -inset-4 rounded-full border border-primary/20 animate-spin-slow" />
              <div className="absolute -inset-8 rounded-full border border-pink-500/10 animate-spin-slow [animation-direction:reverse]" />

              {/* Avatar circle */}
              <div className="relative w-52 h-52 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full p-[3px] grad-border">
                <div className="w-full h-full rounded-full bg-dark overflow-hidden
                                bg-gradient-to-br from-primary/20 via-purple-800/20 to-pink-500/20">
                  <img src="/photo.jpg" alt="Roshini Anupama" className="w-full h-full object-cover" />
                </div>
              </div>

              {/* Floating stat cards */}
              <motion.div
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute -left-14 top-1/4 glass rounded-xl px-3 py-2 md:px-4 md:py-3"
              >
                <p className="text-xl md:text-2xl font-black text-primary">2+</p>
                <p className="text-[9px] md:text-[10px] text-[#888]">Years Exp.</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.95 }}
                className="absolute -right-14 bottom-1/4 glass rounded-xl px-3 py-2 md:px-4 md:py-3"
              >
                <p className="text-xl md:text-2xl font-black text-pink-400">5+</p>
                <p className="text-[9px] md:text-[10px] text-[#888]">Projects</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
                className="absolute -bottom-10 left-1/2 -translate-x-1/2 glass rounded-xl px-3 py-2 md:px-4 md:py-3 whitespace-nowrap"
              >
                <p className="text-xl md:text-2xl font-black text-green-400">2+</p>
                <p className="text-[9px] md:text-[10px] text-[#888]">Happy Clients</p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.button
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1
                     text-[#555] text-[10px] uppercase tracking-widest hover:text-primary transition-colors"
        >
          <span>Scroll</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
            <FiArrowDown />
          </motion.div>
        </motion.button>
      </div>
    </section>
  )
}
