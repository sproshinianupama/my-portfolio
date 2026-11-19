import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import SectionHeading from '../components/SectionHeading'
import { FiMail, FiPhone, FiMapPin, FiSend, FiLoader } from 'react-icons/fi'
import { FiGithub, FiLinkedin, FiInstagram } from 'react-icons/fi'

// ─────────────────────────────────────────────────────────────
//  EMAILJS CONFIG
//  Step 1: Sign up free at https://www.emailjs.com
//  Step 2: Create a Gmail service  → copy your Service ID below
//  Step 3: Create an Email Template → copy your Template ID below
//  Step 4: Go to Account → copy your Public Key below
//
//  In your email template use these variables:
//    {{from_name}}   → sender's name
//    {{from_email}}  → sender's email
//    {{subject}}     → subject line
//    {{message}}     → the message body
//    {{to_email}}    → your email (set as sproshinianupama@gmail.com in template)
// ─────────────────────────────────────────────────────────────
const EMAILJS_SERVICE_ID  = 'service_jxg7khp'   // e.g. 'service_abc123'
const EMAILJS_TEMPLATE_ID = 'template_nj29nnu'  // e.g. 'template_xyz456'
const EMAILJS_PUBLIC_KEY  = '0ohNu5un0EsKelVI3'   // e.g. 'user_AbCdEfGhIjKlMnOp'

const contactInfo = [
  { icon: <FiMail />,   label: 'Email',    val: 'sproshinianupama@gmail.com', href: 'mailto:sproshinianupama@gmail.com' },
  { icon: <FiPhone />,  label: 'Phone',    val: '+94 77 203 6586',             href: 'tel:+94772036586' },
  { icon: <FiMapPin />, label: 'Location', val: 'Nikaweratiya, Sri Lanka',     href: '#' },
]

const socials = [
  { icon: <FiGithub />,    href: 'https://github.com/AnupamaSPR',                             label: 'GitHub'    },
  { icon: <FiLinkedin />,  href: 'https://www.linkedin.com/in/roshini-anupama-49210a283',     label: 'LinkedIn'  },
  { icon: <FiInstagram />, href: 'https://www.instagram.com/anupamaroshini',                  label: 'Instagram' },
]

const INIT = { name: '', email: '', subject: '', message: '' }

export default function Contact() {
  const formRef              = useRef(null)
  const [form, setForm]      = useState(INIT)
  const [status, setStatus]  = useState('idle')   // 'idle' | 'sending' | 'sent' | 'error'
  const [fieldErr, setFieldErr] = useState('')

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Client-side validation
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setFieldErr('Please fill in Name, Email and Message.')
      return
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(form.email)) {
      setFieldErr('Please enter a valid email address.')
      return
    }

    setFieldErr('')
    setStatus('sending')

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name:  form.name,
          from_email: form.email,
          subject:    form.subject || '(No subject)',
          message:    form.message,
          to_email:   'sproshinianupama@gmail.com',
        },
        EMAILJS_PUBLIC_KEY
      )
      setStatus('sent')
      setForm(INIT)
    } catch (err) {
      console.error('EmailJS error:', err)
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="section-pad relative overflow-hidden">
      <div className="absolute -bottom-20 left-1/3 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="Get In Touch"
          title="Contact"
          accent="Me"
          sub="Have a project in mind? Let's build something amazing together."
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10">

          {/* ── Left info panel ── */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-2 space-y-6"
          >
            <div>
              <h3 className="text-xl md:text-2xl font-bold font-grotesk mb-3">
                Let's <span className="gradient-text">Talk</span>
              </h3>
              <p className="text-[#888] text-sm leading-relaxed">
                I'm always open to discussing new opportunities, creative projects or
                just a friendly chat about tech.
              </p>
            </div>

            {/* Contact cards */}
            <div className="space-y-3">
              {contactInfo.map(({ icon, label, val, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-4 glass rounded-xl p-4 border border-white/5
                             hover:border-primary/30 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center
                                  text-primary group-hover:bg-primary group-hover:text-white transition-all flex-shrink-0">
                    {icon}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] text-[#555] uppercase tracking-wider">{label}</p>
                    <p className="text-sm text-white/80 font-medium break-all">{val}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Socials */}
            <div>
              <p className="text-xs text-[#555] uppercase tracking-widest mb-3">Follow Me</p>
              <div className="flex flex-wrap gap-3">
                {socials.map(({ icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href} target="_blank" rel="noreferrer"
                    aria-label={label}
                    whileHover={{ scale: 1.2, y: -3 }}
                    className="w-10 h-10 glass rounded-full flex items-center justify-center
                               text-[#888] hover:text-primary hover:border-primary/40 transition-colors"
                  >
                    {icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Right form ── */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-3"
          >
            <div className="glass rounded-2xl p-5 md:p-8 border border-white/5">

              {/* ── Success state ── */}
              {status === 'sent' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center gap-4 py-12 text-center"
                >
                  <span className="text-6xl">🎉</span>
                  <h3 className="text-xl font-bold font-grotesk gradient-text">Message Sent!</h3>
                  <p className="text-[#888] text-sm">
                    Thanks for reaching out. I'll get back to you at{' '}
                    <span className="text-primary">sproshinianupama@gmail.com</span> shortly.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="btn-outline text-xs mt-2"
                  >
                    Send Another
                  </button>
                </motion.div>

              ) : (
                /* ── Form ── */
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-5" noValidate>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <InputField
                      label="Name *" name="name" type="text"
                      placeholder="Jane Doe"
                      value={form.name} onChange={handleChange}
                      disabled={status === 'sending'}
                    />
                    <InputField
                      label="Reply-to Email *" name="email" type="email"
                      placeholder="jane@example.com"
                      value={form.email} onChange={handleChange}
                      disabled={status === 'sending'}
                    />
                  </div>

                  <InputField
                    label="Subject" name="subject" type="text"
                    placeholder="Project inquiry…"
                    value={form.subject} onChange={handleChange}
                    disabled={status === 'sending'}
                  />

                  <div>
                    <label className="block text-xs text-[#888] mb-1.5 uppercase tracking-wider">
                      Message *
                    </label>
                    <textarea
                      name="message" rows={5}
                      placeholder="Tell me about your project…"
                      value={form.message}
                      onChange={handleChange}
                      disabled={status === 'sending'}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm
                                 text-white placeholder-[#444] outline-none resize-none
                                 focus:border-primary/60 focus:bg-white/[0.05] transition-all
                                 disabled:opacity-50"
                    />
                  </div>

                  {/* Field validation error */}
                  {fieldErr && (
                    <motion.p
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-400 text-xs flex items-center gap-1"
                    >
                      ⚠ {fieldErr}
                    </motion.p>
                  )}

                  {/* EmailJS send error */}
                  {status === 'error' && (
                    <motion.p
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-400 text-xs flex items-center gap-1"
                    >
                      ⚠ Something went wrong. Please try again or email me directly at{' '}
                      <a href="mailto:sproshinianupama@gmail.com" className="underline text-primary">
                        sproshinianupama@gmail.com
                      </a>
                    </motion.p>
                  )}

                  {/* Submit button */}
                  <motion.button
                    type="submit"
                    disabled={status === 'sending'}
                    whileHover={{ scale: status === 'sending' ? 1 : 1.03 }}
                    whileTap={{ scale: status === 'sending' ? 1 : 0.97 }}
                    className="btn-primary w-full flex items-center justify-center gap-2
                               disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === 'sending' ? (
                      <>
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                          className="inline-block"
                        >
                          ⟳
                        </motion.span>
                        Sending…
                      </>
                    ) : (
                      <>
                        <FiSend /> Send Message
                      </>
                    )}
                  </motion.button>

                  <p className="text-[#555] text-[11px] text-center">
                    Your message will be sent directly to{' '}
                    <span className="text-primary">sproshinianupama@gmail.com</span>
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function InputField({ label, name, type, placeholder, value, onChange, disabled }) {
  return (
    <div>
      <label className="block text-xs text-[#888] mb-1.5 uppercase tracking-wider">{label}</label>
      <input
        type={type} name={name} placeholder={placeholder}
        value={value} onChange={onChange} disabled={disabled}
        className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm
                   text-white placeholder-[#444] outline-none
                   focus:border-primary/60 focus:bg-white/[0.05] transition-all
                   disabled:opacity-50"
      />
    </div>
  )
}
