import { motion } from 'framer-motion'
import SectionHeading from '../components/SectionHeading'
import {
  FiMonitor, FiSmartphone, FiServer,
  FiPenTool, FiShoppingCart, FiZap,
} from 'react-icons/fi'

const services = [
  {
    icon:  <FiMonitor />,
    title: 'Web Development',
    desc:  'Fast, accessible websites built with React, Next.js, and modern web standards. Clean architecture that scales.',
    from:  'from-violet-500/20', to: 'to-primary/5',
    glow:  'hover:border-violet-500/40',
    color: 'text-violet-400',
  },
  {
    icon:  <FiSmartphone />,
    title: 'Responsive Design',
    desc:  'Pixel-perfect, mobile-first layouts that look stunning across every screen size and device.',
    from:  'from-pink-500/20', to: 'to-rose-500/5',
    glow:  'hover:border-pink-500/40',
    color: 'text-pink-400',
  },
  {
    icon:  <FiServer />,
    title: 'Backend & APIs',
    desc:  'Scalable REST APIs and server-side solutions with Node.js, Express, and modern databases.',
    from:  'from-blue-500/20', to: 'to-cyan-500/5',
    glow:  'hover:border-blue-500/40',
    color: 'text-blue-400',
  },
  {
    icon:  <FiPenTool />,
    title: 'UI/UX Design',
    desc:  'Thoughtful interfaces designed in Figma — balancing aesthetics with intuitive user experiences.',
    from:  'from-yellow-500/20', to: 'to-orange-500/5',
    glow:  'hover:border-yellow-500/40',
    color: 'text-yellow-400',
  },
  {
    icon:  <FiShoppingCart />,
    title: 'E-Commerce',
    desc:  'Full-featured online stores with secure payments, inventory management, and conversion-driven UX.',
    from:  'from-green-500/20', to: 'to-emerald-500/5',
    glow:  'hover:border-green-500/40',
    color: 'text-green-400',
  },
  {
    icon:  <FiZap />,
    title: 'Performance & SEO',
    desc:  'Core Web Vitals optimisation and SEO best practices to maximise visibility and speed.',
    from:  'from-indigo-500/20', to: 'to-purple-500/5',
    glow:  'hover:border-indigo-500/40',
    color: 'text-indigo-400',
  },
]

export default function Services() {
  return (
    <section id="services" className="section-pad relative overflow-hidden">
      <div className="absolute right-0 top-1/3 w-96 h-96 bg-pink-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="What I Offer"
          title="My"
          accent="Services"
          sub="From idea to deployment — end-to-end solutions tailored to your goals."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map(({ icon, title, desc, from, to, glow, color }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`glass rounded-2xl p-7 border border-white/5 ${glow}
                          transition-all duration-300 group cursor-default`}
            >
              {/* Icon */}
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${from} ${to}
                               flex items-center justify-center mb-5 text-xl ${color}
                               group-hover:scale-110 transition-transform duration-300`}>
                {icon}
              </div>

              <h3 className={`text-lg font-bold font-grotesk mb-2 ${color}`}>{title}</h3>
              <p className="text-[#888] text-sm leading-relaxed">{desc}</p>

              {/* animated underline */}
              <div className="mt-5 h-[2px] w-0 group-hover:w-full grad-border rounded-full transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
