import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionHeading from '../components/SectionHeading'
import {
  FiChevronLeft, FiChevronRight,
  FiAward, FiCalendar, FiExternalLink, FiX,
} from 'react-icons/fi'

// ─────────────────────────────────────────────────────────────
//  CERTIFICATES — update title, issuer, year, desc, verifyUrl
//  Images are in: public/gallery/certificates/C1.jpg … C11.jpg
// ─────────────────────────────────────────────────────────────
const certs = [
  {
    id:        1,
    title:     'Degree Certificate -BSc(Hons) in Software Engineering - First Class',
    issuer:    'Cinec Campus Malabe',
    year:      '2026',
    verifyUrl: '#',
    image:     '/gallery/certificates/C1.jpg',
  },
  {
    id:        2,
    title:     'Internship Confirmation Letter',
    issuer:    'Global Marine Investments (Private) Limited',
    year:      '2025',
    verifyUrl: '#',
    image:     '/gallery/certificates/C2.jpg',
  },
  {
    id:        3,
    title:     '4th CIRS - Poster Presentation',
    issuer:    'Cinec Campus Malabe',
    year:      '2023',
    verifyUrl: '#',
    image:     '/gallery/certificates/C6.jpg',
    
  },
  {
    id:        4,
     title:     '5th CIRS - Poster Presentation',
    issuer:    'Cinec Campus Malabe',
    year:      '2024',
    verifyUrl: '#',
    image:     '/gallery/certificates/C3.jpg',
   
  },
  {
    id:        5,
     title:     '6th CIRS - Oral Presentation',
    issuer:    'Cinec Campus Malabe',
    year:      '2025',
    verifyUrl: '#',
    image:     '/gallery/certificates/C4.jpg',
    
  },
  {
    id:        6,
    title:     'Cinec Research Day - Best Poster Presentation',
    issuer:    'Cinec Campus Malabe',
    year:      '2026',
    verifyUrl: '#',
    image:     '/gallery/certificates/C12.jpg',
   
  },
  {
    id:        7,
    title:     'Advanced Certificate in English',
    issuer:    'Cinec Campus Malabe',
    year:      '2023',
    verifyUrl: '#',
    image:     '/gallery/certificates/C5.jpg',
    
  },
  {
    id:        8,
    title:     'Diploma in Human Resource Management',
    issuer:    'SLRS Campus Gampaha',
    year:      '2026',
    verifyUrl: '#',
    image:     '/gallery/certificates/C7.jpg',
   
    
  },
  {
    id:        9,
    title:     'Certificate in Microsoft Office Applications',
    issuer:    'Information Technology & Language Training Center Waariyapola',
    year:      '2021',
    verifyUrl: '#',
    image:     '/gallery/certificates/C9.jpg',
   
  },
  {
    id:        10,
    title:     'National Certificate of Computer Applications Assistant - NVQ level 03',
    issuer:    '',
    year:      '2021',
    verifyUrl: '#',
    image:     '/gallery/certificates/C8.jpg',
    
   
  },
  {
    id:        11,
    title:     'The Dancing Competition of Traditional Dance',
    issuer:    'CECSO',
    year:      '2025',
    verifyUrl: '#',
    image:     '/gallery/certificates/C10.jpg',
   
    
  },

  {
    id:         12,
    title:     'Certificate of performing as a prefect',
    issuer:    'Jayanthi Central Collage Nikaweratiya',
    year:      '2012-2013',
    verifyUrl: '#',
    image:     '/gallery/certificates/C11.jpg',
    
    
  },
]

// slide direction: 1 = going right (next), -1 = going left (prev)
const variants = {
  enter: (dir) => ({ opacity: 0, x: dir > 0 ? 120 : -120 }),
  center:        ({ opacity: 1, x: 0 }),
  exit:  (dir) => ({ opacity: 0, x: dir > 0 ? -120 : 120 }),
}

// Full-screen lightbox
function Lightbox({ cert, onClose }) {
  useEffect(() => {
    const fn = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [onClose])

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
        className="relative max-w-3xl w-full"
      >
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }} whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="absolute -top-5 -right-5 z-20 w-10 h-10 glass rounded-full
                     border border-white/20 flex items-center justify-center
                     text-[#888] hover:text-white transition-colors"
          aria-label="Close"
        >
          <FiX />
        </motion.button>
        <img
          src={cert.image} alt={cert.title}
          className="w-full max-h-[80vh] object-contain rounded-2xl"
        />
        <div className="mt-3 flex items-center justify-between gap-3 px-1">
          <div>
            <p className={`font-bold font-grotesk ${cert.color}`}>{cert.title}</p>
            <p className="text-xs text-[#888]">{cert.issuer} · {cert.year}</p>
          </div>
          {cert.verifyUrl !== '#' && (
            <a href={cert.verifyUrl} target="_blank" rel="noreferrer"
              className={`flex items-center gap-1 text-xs font-semibold ${cert.color} hover:underline`}>
              Verify <FiExternalLink className="text-[10px]" />
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Certificates() {
  const [index,   setIndex]   = useState(0)
  const [dir,     setDir]     = useState(1)
  const [lightbox, setLightbox] = useState(false)
  const total = certs.length
  const cert  = certs[index]

  const go = (newIndex, direction) => {
    setDir(direction)
    setIndex(newIndex)
  }
  const prev = () => go((index - 1 + total) % total, -1)
  const next = () => go((index + 1) % total,          1)

  // keyboard navigation
  useEffect(() => {
    if (lightbox) return
    const fn = (e) => {
      if (e.key === 'ArrowLeft')  prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [index, lightbox])

  return (
    <>
      <section id="services" className="section-pad relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-pink-600/8 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-5xl mx-auto">
          <SectionHeading
            eyebrow="Certifications"
            title="My"
            accent="Certificates"
            sub="Professional certifications that validate my skills and commitment to continuous learning."
          />

          {/* ── Slider wrapper ── */}
          <div className="flex items-center gap-3 md:gap-6">

            {/* ── Left Arrow ── */}
            <motion.button
              onClick={prev}
              whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.88 }}
              aria-label="Previous certificate"
              className="flex-shrink-0 w-11 h-11 md:w-13 md:h-13 glass rounded-full
                         flex items-center justify-center border border-white/10
                         hover:border-primary/50 hover:text-primary text-[#888]
                         transition-all duration-300 shadow-lg shadow-black/30"
            >
              <FiChevronLeft className="text-xl" />
            </motion.button>

            {/* ── Main card ── */}
            <div className="flex-1 overflow-hidden">
              <AnimatePresence mode="wait" custom={dir}>
                <motion.div
                  key={cert.id}
                  custom={dir}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                  className={`glass rounded-3xl border ${cert.border}
                              overflow-hidden shadow-2xl shadow-black/40`}
                >
                  {/* ── Top: large image ── */}
                  <div
                    className={`relative w-full bg-gradient-to-br ${cert.accent}
                                flex items-center justify-center overflow-hidden
                                h-[220px] sm:h-[300px] md:h-[400px] lg:h-[460px]`}
                  >
                    {/* Concentric rings decoration */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      {[200, 280, 360].map((s) => (
                        <div key={s} className="absolute rounded-full border border-primary/10"
                             style={{ width: s, height: s }} />
                      ))}
                    </div>

                    {/* Certificate image */}
                    <motion.img
                      src={cert.image}
                      alt={cert.title}
                      onClick={() => setLightbox(true)}
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.3 }}
                      onError={(e) => {
                        e.target.style.display = 'none'
                        e.target.nextSibling.style.display = 'flex'
                      }}
                      className="relative z-10 w-full h-full object-contain px-4 py-4
                                 cursor-zoom-in drop-shadow-2xl"
                    />

                    {/* Fallback if image missing */}
                    <div style={{ display: 'none' }}
                         className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3">
                      <span className="text-7xl select-none">🎓</span>
                      <p className="text-[#555] text-xs text-center px-6">
                        Add <span className="text-primary font-mono">{cert.image}</span>
                      </p>
                    </div>

                    {/* Counter badge */}
                    <div className="absolute top-4 left-4 z-20 glass rounded-full px-3 py-1
                                    border border-white/15 text-xs text-[#888]">
                      <span className={`font-bold ${cert.color}`}>{index + 1}</span>
                      <span className="mx-1">/</span>
                      <span>{total}</span>
                    </div>

                    {/* Zoom hint */}
                    <div className="absolute bottom-4 right-4 z-20 glass rounded-full px-3 py-1
                                    border border-white/15 text-[10px] text-[#888] hidden sm:block">
                      Click image to enlarge
                    </div>
                  </div>

                  {/* ── Bottom: info + description ── */}
                  <div className="p-5 md:p-8">
                    {/* Title row */}
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cert.accent}
                                         flex items-center justify-center ${cert.color}
                                         border ${cert.border} flex-shrink-0`}>
                          <FiAward className="text-lg" />
                        </div>
                        <div>
                          <h3 className={`text-lg md:text-xl font-black font-grotesk ${cert.color}`}>
                            {cert.title}
                          </h3>
                          <p className="text-[#888] text-sm">{cert.issuer}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 flex-shrink-0">
                        <div className="flex items-center gap-1.5 text-[#888] text-xs">
                          <FiCalendar className="text-[11px]" />
                          <span>{cert.year}</span>
                        </div>
                        {cert.verifyUrl !== '#' && (
                          <a
                            href={cert.verifyUrl} target="_blank" rel="noreferrer"
                            className={`flex items-center gap-1 text-xs font-semibold
                                        ${cert.color} hover:underline`}
                          >
                            Verify <FiExternalLink className="text-[10px]" />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Divider */}
                    <div className={`h-px w-full bg-gradient-to-r ${cert.accent} mb-4`} />

                    {/* Description */}
                    <p className="text-[#888] text-sm leading-relaxed">
                      {cert.desc}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* ── Right Arrow ── */}
            <motion.button
              onClick={next}
              whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.88 }}
              aria-label="Next certificate"
              className="flex-shrink-0 w-11 h-11 md:w-13 md:h-13 glass rounded-full
                         flex items-center justify-center border border-white/10
                         hover:border-primary/50 hover:text-primary text-[#888]
                         transition-all duration-300 shadow-lg shadow-black/30"
            >
              <FiChevronRight className="text-xl" />
            </motion.button>
          </div>

          {/* ── Dot navigation ── */}
          <div className="flex justify-center gap-2 mt-7 flex-wrap">
            {certs.map((c, i) => (
              <button
                key={c.id}
                onClick={() => go(i, i > index ? 1 : -1)}
                aria-label={`Go to certificate ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  i === index
                    ? 'w-7 h-2.5 bg-primary shadow-sm shadow-primary/50'
                    : 'w-2.5 h-2.5 bg-white/20 hover:bg-white/50'
                }`}
              />
            ))}
          </div>

          {/* Keyboard hint */}
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ delay: 0.5 }}
            className="text-center text-[#555] text-[11px] mt-3 uppercase tracking-widest"
          >
            Use ← → arrow keys or click the arrows to navigate
          </motion.p>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <Lightbox cert={cert} onClose={() => setLightbox(false)} />
        )}
      </AnimatePresence>
    </>
  )
}
