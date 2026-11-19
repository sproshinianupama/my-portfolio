import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import SectionHeading from '../components/SectionHeading'
import { FiPlay, FiPause, FiMaximize2, FiX, FiZoomIn } from 'react-icons/fi'

// ─────────────────────────────────────────────────────────────
//  PROJECT VIDEOS — public/projects/  → V1.mp4 … V8.mp4
//  POSTER IMAGES  — public/projects/posters/ → p1.png … p4.png
// ─────────────────────────────────────────────────────────────
const projects = [
  { id: 1, title: 'AI-Driven Caregiving Management Platform',          src: '/projects/V1.mp4', grad: 'from-violet-700/40 to-blue-700/20'    },
  { id: 2, title: 'Seafarer Registration and Ratings Application',     src: '/projects/V2.mp4', grad: 'from-pink-700/40 to-rose-700/20'      },
  { id: 3, title: 'Website for SARADA T-Shirt Company - Group Project',src: '/projects/V3.mp4', grad: 'from-yellow-700/40 to-orange-700/20'  },
  { id: 4, title: 'Mind Relaxing website - Group Project',             src: '/projects/V4.mp4', grad: 'from-green-700/40 to-emerald-700/20'  },
  { id: 5, title: 'Hotel Booking System',                              src: '/projects/V5.mp4', grad: 'from-indigo-700/40 to-violet-700/20'  },
  { id: 6, title: 'Petcare website',                                   src: '/projects/V6.mp4', grad: 'from-cyan-700/40 to-teal-700/20'      },
  { id: 7, title: 'Chatting Application - Basics',                     src: '/projects/V7.mp4', grad: 'from-red-700/40 to-orange-700/20'     },
]

const posters = [
  { id: 'pp1',  src: '/projects/posters/p1.png', grad: 'from-violet-700/40 to-purple-700/20', tall: true,  wide: false },
  { id: 'pp3',  src: '/projects/posters/p3.png', grad: 'from-blue-700/40 to-cyan-700/20',     tall: true,  wide: false },
  { id: 'pp4',  src: '/projects/posters/p4.png', grad: 'from-green-700/40 to-teal-700/20',    tall: true,  wide: false },
  { id: 'pp2',  src: '/projects/posters/p2.png', grad: 'from-pink-700/40 to-fuchsia-700/20',  tall: false, wide: true  },
]

// ── Individual video card ──
function VideoCard({ project, index, onExpand }) {
  const videoRef         = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [loaded,  setLoaded]  = useState(false)
  const [err,     setErr]     = useState(false)

  const togglePlay = () => {
    if (!videoRef.current) return
    if (playing) { videoRef.current.pause(); setPlaying(false) }
    else         { videoRef.current.play();  setPlaying(true)  }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="glass rounded-2xl overflow-hidden border border-white/5
                 hover:border-primary/30 transition-all duration-300 group flex flex-col"
    >
      {/* ── Project name bar — always on top ── */}
      <div className={`px-4 py-3 bg-gradient-to-r ${project.grad}
                       flex items-center justify-between`}>
        <h3 className="text-sm font-bold font-grotesk text-white truncate pr-2">
          {project.title}
        </h3>
        {/* Expand button */}
        <motion.button
          whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}
          onClick={() => onExpand(project)}
          aria-label={`Expand ${project.title}`}
          className="flex-shrink-0 w-7 h-7 glass rounded-full border border-white/20
                     flex items-center justify-center text-white/70 hover:text-white
                     transition-colors"
        >
          <FiMaximize2 className="text-xs" />
        </motion.button>
      </div>

      {/* ── Video area ── */}
      <div className="relative flex-1 bg-black min-h-[200px] sm:min-h-[180px] md:min-h-[200px]">
        {err ? (
          /* Fallback if video file not added yet */
          <div className={`absolute inset-0 bg-gradient-to-br ${project.grad}
                           flex flex-col items-center justify-center gap-2 p-4`}>
            <span className="text-4xl select-none">🎬</span>
            <p className="text-white/60 text-xs text-center">
              Add your video to
            </p>
            <p className="text-primary text-[11px] font-mono text-center">
              public/projects/V{project.id}.mp4
            </p>
          </div>
        ) : (
          <video
            ref={videoRef}
            src={project.src}
            muted
            loop
            playsInline
            preload="metadata"
            onLoadedData={() => setLoaded(true)}
            onError={() => setErr(true)}
            onEnded={() => setPlaying(false)}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {/* Play / Pause overlay — only when video loaded */}
        {!err && (
          <div
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center cursor-pointer
                       bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <motion.div
              whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.88 }}
              className="w-14 h-14 rounded-full bg-black/60 border border-white/30
                         flex items-center justify-center text-white text-xl
                         backdrop-blur-sm shadow-xl"
            >
              {playing ? <FiPause /> : <FiPlay className="ml-0.5" />}
            </motion.div>
          </div>
        )}

        {/* Loading shimmer */}
        {!loaded && !err && (
          <div className={`absolute inset-0 bg-gradient-to-br ${project.grad} animate-pulse`} />
        )}
      </div>
    </motion.div>
  )
}

// ── Full-screen expanded modal ──
function ExpandedModal({ project, onClose }) {
  const videoRef = useRef(null)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
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
                         bg-gradient-to-r ${project.grad} rounded-t-2xl`}>
          <h3 className="text-white font-bold font-grotesk">{project.title}</h3>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }} whileTap={{ scale: 0.9 }}
            onClick={onClose}
            aria-label="Close"
            className="w-9 h-9 glass rounded-full border border-white/20
                       flex items-center justify-center text-white/70 hover:text-white"
          >
            <FiX />
          </motion.button>
        </div>

        {/* Video */}
        <div className="bg-black rounded-b-2xl overflow-hidden">
          <video
            ref={videoRef}
            src={project.src}
            controls
            autoPlay
            className="w-full max-h-[75vh] object-contain"
            onError={(e) => {
              e.target.style.display = 'none'
              e.target.nextSibling.style.display = 'flex'
            }}
          />
          <div style={{ display: 'none' }}
               className={`h-64 bg-gradient-to-br ${project.grad}
                           flex flex-col items-center justify-center gap-3`}>
            <span className="text-5xl">🎬</span>
            <p className="text-white/60 text-sm">Video not found</p>
            <p className="text-primary text-xs font-mono">public/projects/V{project.id}.mp4</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ── Poster image card ──
function PosterCard({ poster, index, onExpand }) {
  const [err, setErr] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="glass rounded-2xl overflow-hidden border border-white/5
                 hover:border-primary/30 transition-all duration-300 group flex flex-col"
    >
      {/* Title bar */}
      <div className={`px-4 py-3 bg-gradient-to-r ${poster.grad}
                       flex items-center justify-between flex-shrink-0`}>
        <h3 className="text-sm font-bold font-grotesk text-white truncate pr-2">
          {poster.title}
        </h3>
        <motion.button
          whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}
          onClick={() => onExpand(poster)}
          aria-label={`Expand ${poster.title}`}
          className="flex-shrink-0 w-7 h-7 glass rounded-full border border-white/20
                     flex items-center justify-center text-white/70 hover:text-white transition-colors"
        >
          <FiZoomIn className="text-xs" />
        </motion.button>
      </div>

      {/* Image */}
      <div className={`relative flex-1 bg-black overflow-hidden ${
        poster.tall
          ? 'min-h-[380px] sm:min-h-[420px] md:min-h-[460px]'
          : poster.wide
          ? 'min-h-[320px] sm:min-h-[380px] md:min-h-[420px]'
          : 'min-h-[220px]'
      }`}>
        {err ? (
          <div className={`absolute inset-0 bg-gradient-to-br ${poster.grad}
                           flex flex-col items-center justify-center gap-2 p-4`}>
            <span className="text-4xl select-none">🖼️</span>
            <p className="text-white/60 text-xs text-center">Add your poster to</p>
            <p className="text-primary text-[11px] font-mono text-center">{poster.src}</p>
          </div>
        ) : (
          <img
            src={poster.src}
            alt={poster.title}
            onError={() => setErr(true)}
            onClick={() => onExpand(poster)}
            className="absolute inset-0 w-full h-full object-cover cursor-zoom-in
                       group-hover:scale-105 transition-transform duration-500"
          />
        )}
      </div>
    </motion.div>
  )
}

// ── Poster full-screen lightbox ──
function PosterLightbox({ poster, onClose }) {
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
                         bg-gradient-to-r ${poster.grad} rounded-t-2xl`}>
          <h3 className="text-white font-bold font-grotesk">{poster.title}</h3>
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
            src={poster.src} alt={poster.title}
            className="w-full max-h-[75vh] object-contain"
            onError={(e) => {
              e.target.style.display = 'none'
              e.target.nextSibling.style.display = 'flex'
            }}
          />
          <div style={{ display: 'none' }}
               className={`h-64 bg-gradient-to-br ${poster.grad}
                           flex flex-col items-center justify-center gap-3`}>
            <span className="text-5xl">🖼️</span>
            <p className="text-white/60 text-sm">Poster not found</p>
            <p className="text-primary text-xs font-mono">{poster.src}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Portfolio() {
  const [expanded,      setExpanded]      = useState(null)
  const [expandedPoster, setExpandedPoster] = useState(null)

  return (
    <>
      <section id="portfolio" className="section-pad relative overflow-hidden">
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-primary/8 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto">
          <SectionHeading
            eyebrow="My Work"
            title="Recent"
            accent="Projects"
            sub="A collection of my projects — click play to preview or expand to watch full screen."
          />

          {/* ── Video grid ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {projects.map((project, i) => (
              <VideoCard
                key={project.id}
                project={project}
                index={i}
                onExpand={setExpanded}
              />
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-center text-[#555] text-[11px] mt-8 uppercase tracking-widest"
          >
            Hover to play · click ⤢ to watch full screen
          </motion.p>

          {/* ── Divider ── */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent my-14" />

          {/* ── Posters section ── */}
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-lg font-bold font-grotesk mb-6 flex items-center gap-3"
          >
            <span>Project <span className="gradient-text">Posters</span></span>
          </motion.h3>

          {/* p1,p3,p4 vertical → 3-col grid so each gets more width
               p2 horizontal  → spans 2 of those 3 cols             */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 items-start">
            {posters.map((poster, i) => (
              <div
                key={poster.id}
                className={poster.wide ? 'sm:col-span-2' : 'col-span-1'}
              >
                <PosterCard
                  poster={poster}
                  index={i}
                  onExpand={setExpandedPoster}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video modal */}
      {expanded && (
        <ExpandedModal project={expanded} onClose={() => setExpanded(null)} />
      )}

      {/* Poster lightbox */}
      {expandedPoster && (
        <PosterLightbox poster={expandedPoster} onClose={() => setExpandedPoster(null)} />
      )}
    </>
  )
}
