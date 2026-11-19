import { useState } from 'react'
import { motion } from 'framer-motion'
import SectionHeading from '../components/SectionHeading'
import { FiZoomIn, FiX } from 'react-icons/fi'

// ─────────────────────────────────────────────────────────────
//  PHOTOS — put files in  public/gallery/  named p1.jpg … p6.jpg
//  To add more: copy any block and increment the id & src.
//  tall: true  → taller card height  (good for portrait photos)
//  tall: false → normal card height  (good for landscape photos)
// ─────────────────────────────────────────────────────────────
const photos = [
  { id: 'p1',  src: '/gallery/p1.jpg', grad: 'from-violet-700/40 to-blue-700/20',   tall: false },
  { id: 'p2',  src: '/gallery/p2.jpg', grad: 'from-pink-700/40 to-rose-700/20',    tall: false },
  { id: 'p3',  src: '/gallery/p3.jpg', grad: 'from-yellow-700/40 to-orange-700/20', tall: false },
  { id: 'p4',  src: '/gallery/p4.jpg', grad: 'from-green-700/40 to-emerald-700/20', tall: true  },
  { id: 'p5',  src: '/gallery/p5.jpg', grad: 'from-indigo-700/40 to-violet-700/20', tall: true  },
  { id: 'p6',  src: '/gallery/p6.jpg', grad: 'from-cyan-700/40 to-teal-700/20',    tall: true  },
]

// ── Photo card ──
function PhotoCard({ item, index, onExpand }) {
  const [err, setErr] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="glass rounded-2xl overflow-hidden border border-white/5
                 hover:border-primary/30 transition-all duration-300 group flex flex-col"
    >
      {/* Title bar */}
      <div className={`px-4 py-3 bg-gradient-to-r ${item.grad}
                       flex items-center justify-between flex-shrink-0`}>
        <h3 className="text-sm font-bold font-grotesk text-white truncate pr-2">
          {item.title}
        </h3>
        <motion.button
          whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}
          onClick={() => onExpand(item)}
          aria-label={`Expand ${item.title}`}
          className="flex-shrink-0 w-7 h-7 glass rounded-full border border-white/20
                     flex items-center justify-center text-white/70 hover:text-white transition-colors"
        >
          <FiZoomIn className="text-xs" />
        </motion.button>
      </div>

      {/* Image */}
      <div className={`relative flex-1 bg-black overflow-hidden ${
        item.tall
          ? 'min-h-[300px] sm:min-h-[320px] md:min-h-[360px]'
          : 'min-h-[200px] sm:min-h-[180px] md:min-h-[200px]'
      }`}>
        {err ? (
          <div className={`absolute inset-0 bg-gradient-to-br ${item.grad}
                           flex flex-col items-center justify-center gap-2 p-4`}>
            <span className="text-4xl select-none">🖼️</span>
            <p className="text-white/60 text-xs text-center">Add your photo to</p>
            <p className="text-primary text-[11px] font-mono text-center">{item.src}</p>
          </div>
        ) : (
          <img
            src={item.src}
            alt={item.title}
            onError={() => setErr(true)}
            onClick={() => onExpand(item)}
            className="absolute inset-0 w-full h-full object-cover cursor-zoom-in
                       group-hover:scale-105 transition-transform duration-500"
          />
        )}
      </div>
    </motion.div>
  )
}

// ── Lightbox modal ──
function Lightbox({ item, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[9995] bg-black/92 backdrop-blur-md
                 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1,    opacity: 1 }}
        exit={{    scale: 0.85, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 24 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl"
      >
        {/* Title bar */}
        <div className={`flex items-center justify-between px-5 py-3
                         bg-gradient-to-r ${item.grad} rounded-t-2xl`}>
          <h3 className="text-white font-bold font-grotesk">{item.title}</h3>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }} whileTap={{ scale: 0.9 }}
            onClick={onClose} aria-label="Close"
            className="w-9 h-9 glass rounded-full border border-white/20
                       flex items-center justify-center text-white/70 hover:text-white"
          >
            <FiX />
          </motion.button>
        </div>

        {/* Image */}
        <div className="bg-black rounded-b-2xl overflow-hidden">
          <img
            src={item.src}
            alt={item.title}
            className="w-full max-h-[75vh] object-contain"
            onError={(e) => {
              e.target.style.display = 'none'
              e.target.nextSibling.style.display = 'flex'
            }}
          />
          <div style={{ display: 'none' }}
               className={`h-64 bg-gradient-to-br ${item.grad}
                           flex flex-col items-center justify-center gap-3`}>
            <span className="text-5xl">🖼️</span>
            <p className="text-white/60 text-sm">File not found</p>
            <p className="text-primary text-xs font-mono">{item.src}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ── Main Gallery section ──
export default function Gallery() {
  const [expanded, setExpanded] = useState(null)

  return (
    <>
      <section id="gallery" className="section-pad relative overflow-hidden">
        <div className="absolute top-1/3 left-0 w-80 h-80 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-pink-600/8 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto">
          <SectionHeading
            eyebrow="My Moments"
            title="Photo"
            accent="Gallery"
            sub="A collection of memories, moments and behind-the-scenes snapshots."
          />

          {/* Photo grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {photos.map((item, i) => (
              <PhotoCard
                key={item.id}
                item={item}
                index={i}
                onExpand={setExpanded}
              />
            ))}
          </div>

          {/* Hint */}
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ delay: 0.4 }}
            className="text-center text-[#555] text-[11px] mt-8 uppercase tracking-widest"
          >
            Click any photo or the 🔍 icon to view full size
          </motion.p>
        </div>
      </section>

      {/* Lightbox */}
      {expanded && (
        <Lightbox item={expanded} onClose={() => setExpanded(null)} />
      )}
    </>
  )
}
