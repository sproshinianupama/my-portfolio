import { useEffect } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import CustomCursor     from './components/CustomCursor'
import Navbar           from './components/Navbar'
import Footer           from './components/Footer'
import BrightnessToggle from './components/BrightnessToggle'
import Hero             from './sections/Hero'
import About            from './sections/About'
import Certificates     from './sections/Certificates'
import Portfolio        from './sections/Portfolio'
import Experience       from './sections/Experience'
import Gallery          from './sections/Gallery'
import Contact          from './sections/Contact'

export default function App() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 })

  useEffect(() => {
    document.body.style.cursor = 'none'
    return () => { document.body.style.cursor = 'auto' }
  }, [])

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        style={{ scaleX, transformOrigin: '0%' }}
        className="fixed top-0 left-0 right-0 h-[3px] grad-border z-[9998]"
      />

      <CustomCursor />
      <Navbar />
      <BrightnessToggle />

      <main>
        <Hero />
        <About />
        <Certificates />
        <Portfolio />
        <Experience />
        <Gallery />
        <Contact />
      </main>

      <Footer />
    </>
  )
}
