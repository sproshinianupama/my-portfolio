import { motion } from 'framer-motion'
import SectionHeading from '../components/SectionHeading'
import { FiBriefcase, FiBook } from 'react-icons/fi'

const work = [
  {
    period:  '2025 June – 2025 December',
    role:    'Fullstack Developer',
    company: 'Global Marine Investments Private Limited',
    loc:     '292, R. A. De Mel Mawatha, Colombo 003, Sri Lanka',
    desc:    'I completed my internship in this company as a Fullstack developer. I worked on the application development, testing and maintainance. I also developed a seafarer registration and rating application.',
    tags:    ['Flutter', 'Node.js', 'Firebase'],
  },
  {
    period:  '2026 January – 2026 June',
    role:    'Admin Officer',
    company: 'SLRS Campus',
    loc:     'Gampaha, Sri Lanka',
    desc:    'I coordinated English diploma ,MBA Programe and also helped all administrative works.',
  },
]

const edu = [
  {
    period:  '2022 – 2026',
    role:    'BSc(Hons) in Software Engineering',
    company: 'CINEC Campus',
    loc:     'Malabe, Sri Lanka',
    desc:    'Graduated First Class Honours. Final-year project completed successfully. Focused on software engineering and web technologies. Interested in Quality Assurance',
    tags:    ['Algorithms', 'Software Eng.', 'Web Dev','Quality Assurance'],
  },
   {
    period:  '2026',
    role:    'Diploma in Human Resource Management',
    company: 'SLRS Campus',
    loc:     'Gampaha, Sri Lanka',
  },
  {
    period:  '2020 – 2021',
    role:    'A/Levels — Maths',
    company: 'Jayanthi Central College',
    loc:     'Nikaweratiya, Sri Lanka',
    desc:    'Completed Advanced Levels with distinction in Mathematics, Physics and Chemistry.',
    tags:    ['Mathematics', 'Physics', 'Chemistry'],
  },
   {
    period:  '2020 – 2021',
    role:    'NVQ Level - 03 Computer Application Assistant Course',
    company: 'Information Technology & Language Training Center',
    loc:     'Wariyapola, Sri Lanka',
  },
]

function TimelineItem({ item, index, last }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="relative pl-8"
    >
      {/* Vertical line */}
      {!last && (
        <div className="absolute left-[9px] top-6 bottom-0 w-px bg-gradient-to-b from-primary/50 to-transparent" />
      )}
      {/* Dot */}
      <div className="absolute left-0 top-1.5 w-[18px] h-[18px] rounded-full border-2 border-primary bg-dark flex items-center justify-center">
        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
      </div>

      <motion.div
        whileHover={{ x: 4 }}
        transition={{ type: 'spring', stiffness: 300 }}
        className="glass rounded-2xl p-4 md:p-5 border border-white/5 hover:border-primary/25 transition-colors mb-6"
      >
        {/* Header row — stacks on very small screens */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
          <div className="min-w-0">
            <h3 className="text-sm md:text-base font-bold font-grotesk">{item.role}</h3>
            <p className="text-primary text-xs md:text-sm font-semibold">{item.company}</p>
          </div>
          <div className="sm:text-right shrink-0">
            <span className="inline-block text-[10px] md:text-[11px] bg-primary/10 text-primary border border-primary/20 px-2 md:px-3 py-1 rounded-full">
              {item.period}
            </span>
            <p className="text-[#555] text-[10px] mt-1">{item.loc}</p>
          </div>
        </div>
        {item.desc && (
          <p className="text-[#888] text-xs leading-relaxed mb-3">{item.desc}</p>
        )}
        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {item.tags.map((t) => (
              <span key={t} className="tag text-[11px]">{t}</span>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}

export default function Experience() {
  return (
    <section id="experience" className="section-pad relative overflow-hidden">
      <div className="absolute right-0 top-1/2 w-64 md:w-80 h-64 md:h-80 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="My Journey"
          title="Experience &"
          accent="Education"
          sub="A timeline of my professional path and academic background."
        />

        {/* Single column on mobile, two columns on lg+ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

          {/* Work */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-7"
            >
              <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary text-sm flex-shrink-0">
                <FiBriefcase />
              </div>
              <h3 className="text-base md:text-lg font-bold font-grotesk">Work Experience</h3>
            </motion.div>
            {work.map((item, i) => (
              <TimelineItem key={item.role} item={item} index={i} last={i === work.length - 1} />
            ))}
          </div>

          {/* Education */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-7"
            >
              <div className="w-9 h-9 rounded-xl bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-pink-400 text-sm flex-shrink-0">
                <FiBook />
              </div>
              <h3 className="text-base md:text-lg font-bold font-grotesk">Education</h3>
            </motion.div>
            {edu.map((item, i) => (
              <TimelineItem key={item.role} item={item} index={i} last={i === edu.length - 1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
