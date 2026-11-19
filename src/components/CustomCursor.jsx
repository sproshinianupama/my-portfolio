import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function CustomCursor() {
  const [pos, setPos]           = useState({ x: 0, y: 0 })
  const [hovered, setHovered]   = useState(false)
  const [clicking, setClicking] = useState(false)

  useEffect(() => {
    const move  = (e) => setPos({ x: e.clientX, y: e.clientY })
    const down  = ()  => setClicking(true)
    const up    = ()  => setClicking(false)

    window.addEventListener('mousemove', move)
    window.addEventListener('mousedown', down)
    window.addEventListener('mouseup',   up)

    const addHover = () => {
      document.querySelectorAll('a,button,[data-hover]').forEach((el) => {
        el.addEventListener('mouseenter', () => setHovered(true))
        el.addEventListener('mouseleave', () => setHovered(false))
      })
    }
    addHover()
    const observer = new MutationObserver(addHover)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mousedown', down)
      window.removeEventListener('mouseup',   up)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border-2 border-primary pointer-events-none z-[9999]"
        animate={{
          x: pos.x - (hovered ? 24 : 20),
          y: pos.y - (hovered ? 24 : 20),
          width:  hovered ? 48 : clicking ? 28 : 40,
          height: hovered ? 48 : clicking ? 28 : 40,
          opacity: hovered ? 0.5 : 1,
        }}
        transition={{ type: 'spring', stiffness: 180, damping: 22 }}
      />
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-primary pointer-events-none z-[9999]"
        animate={{ x: pos.x - 4, y: pos.y - 4, scale: clicking ? 0.4 : 1 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      />
    </>
  )
}
