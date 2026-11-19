import { motion } from 'framer-motion'
import SectionHeading from '../components/SectionHeading'
import { FiUser, FiMapPin, FiMail, FiCalendar, FiPhone } from 'react-icons/fi'

const skills = [
  { name: 'React / Next.js',   pct: 92 },
  { name: 'JavaScript / TS',   pct: 88 },
  { name: 'Tailwind / CSS',    pct: 95 },
  { name: 'Node.js / Express', pct: 80 },
  { name: 'UI & Figma',        pct: 75 },
  { name: 'Flutter / Dart',    pct: 85 },
]

const tech = [
  'React','Next.js','TypeScript','Node.js','Express','MongoDB',
  'Firebase','Tailwind CSS','Flutter Dart','Git','Figma','Docker',
]

const info = [
  { icon: <FiUser />,     label: 'Name',     val: 'Roshini Anupama Priyadarshani' },
  { icon: <FiCalendar />, label: 'Birthday', val: 'Jul 1, 2001' },
  { icon: <FiMapPin />,   label: 'Location', val: 'Nikaweratiya, Sri Lanka' },
  { icon: <FiMail />,     label: 'Email',    val: 'sproshinianupama@gmail.com' },
  { icon: <FiPhone />,    label: 'Phone',    val: '+94 77 203 6586' },
]

const bar = {
  hidden:  { width: 0 },
  visible: (pct) => ({
    width: `${pct}%`,
    transition: { duration: 1.1, ease: 'easeOut' },
  }),
}

export default function About() {
  return (
    <section id="about" className="section-pad relative overflow-hidden">
      <div className="absolute -top-20 -left-32 w-72 md:w-96 h-72 md:h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="Who I Am"
          title="About"
          accent="Me"
          sub="Passionate developer who loves crafting elegant digital experiences."
        />

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Left – avatar card */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative max-w-xs sm:max-w-sm mx-auto w-full mt-8"
          >
            <div className="relative rounded-3xl p-[2px] grad-border">
              <div className="rounded-[22px] overflow-hidden aspect-[4/5] glass flex items-center justify-center
                              bg-gradient-to-br from-primary/10 via-purple-900/10 to-pink-600/10">
                <img src="/dphoto.jpg" alt="Roshini Anupama" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Experience badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }} transition={{ delay: 0.4, type: 'spring' }}
              className="absolute -bottom-4 -right-4 glass rounded-2xl p-4 shadow-xl shadow-black/40"
            >
              <p className="text-3xl font-black text-primary">2+</p>
              <p className="text-[11px] text-[#888] leading-tight">Years of<br/>Experience</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }} transition={{ delay: 0.55, type: 'spring' }}
              className="absolute -top-4 -left-4 glass rounded-2xl p-4 shadow-xl shadow-black/40"
            >
              <p className="text-3xl font-black text-pink-400">5+</p>
              <p className="text-[11px] text-[#888] leading-tight">Projects<br/>Done</p>
            </motion.div>
          </motion.div>

          {/* Right – content */}
          <div className="space-y-7">
            {/* Bio */}
            <motion.div
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7 }}
            >
              <h3 className="text-xl md:text-2xl font-bold font-grotesk mb-4">
                I'm a <span className="gradient-text">Creative Developer</span>
              </h3>
              <p className="text-[#888] text-sm leading-7 mb-3">
                I'm a frontend developer with a deep passion for building beautiful,
                functional web applications. I specialise in React, Node.js, and modern
                web technologies — combining clean code with thoughtful design.
              </p>
              <p className="text-[#888] text-sm leading-7">
                When I'm not coding you'll find me exploring new tech, contributing to
                open-source, or sketching UI concepts. I believe great software lives at
                the intersection of engineering and artistry.
              </p>
            </motion.div>

            {/* Personal info — 1 col on xs, 2 cols on sm+ */}
            <motion.div
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
              className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 gap-3"
            >
              {info.map(({ icon, label, val }) => (
                <div key={label} className="flex items-start gap-3 min-w-0">
                  <span className="text-primary text-base flex-shrink-0 mt-0.5">{icon}</span>
                  <div className="min-w-0">
                    <p className="text-[10px] text-[#555] uppercase tracking-wider">{label}</p>
                    <p className="text-sm text-white/80 font-medium break-words">{val}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Skill bars */}
            <motion.div
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}
              className="space-y-3"
            >
              <h4 className="font-semibold text-sm text-white/70 mb-3">Core Skills</h4>
              {skills.map(({ name, pct }, i) => (
                <div key={name}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-white/70">{name}</span>
                    <span className="text-primary font-bold">{pct}%</span>
                  </div>
                  <div className="w-full h-[6px] bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      custom={pct}
                      variants={bar}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.07 }}
                      className="h-full rounded-full grad-border"
                    />
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Tech pills */}
            <motion.div
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.3 }}
            >
              <h4 className="font-semibold text-sm text-white/70 mb-3">Tech Stack</h4>
              <div className="flex flex-wrap gap-2">
                {tech.map((t, i) => (
                  <motion.span
                    key={t}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.04 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="tag hover:text-primary hover:border-primary/30 transition-colors cursor-default"
                  >
                    {t}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
