import { motion } from 'framer-motion'

export default function SectionHeading({ eyebrow, title, accent, sub }) {
  return (
    <div className="text-center mb-16">
      {eyebrow && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-primary text-xs font-semibold uppercase tracking-[4px] mb-3"
        >
          {eyebrow}
        </motion.p>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.08 }}
        className="text-4xl md:text-5xl font-black font-grotesk leading-tight"
      >
        {title}{' '}
        {accent && <span className="gradient-text">{accent}</span>}
      </motion.h2>

      {sub && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.16 }}
          className="text-[#888] max-w-xl mx-auto mt-4 text-sm leading-relaxed"
        >
          {sub}
        </motion.p>
      )}

      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.24, duration: 0.5 }}
        className="w-16 h-[3px] grad-border rounded-full mx-auto mt-5"
      />
    </div>
  )
}
