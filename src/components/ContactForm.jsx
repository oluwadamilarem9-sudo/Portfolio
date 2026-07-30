'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

const fieldVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

const inputClass =
  'w-full px-4 py-3.5 rounded-xl border border-border/60 bg-background/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 transition-all duration-300'

export default function ContactForm({ email, onSuccess, onToast }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (loading || success) return

    setLoading(true)
    await new Promise((r) => setTimeout(r, 1200))

    const subject = `Portfolio Inquiry from ${form.name}`
    const body = `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
    const mailto = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

    const a = document.createElement('a')
    a.href = mailto
    a.rel = 'noopener noreferrer'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)

    setLoading(false)
    setSuccess(true)
    onToast?.('Message ready! Check your email app to send.', 'success')
    onSuccess?.()
  }

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="flex flex-col items-center justify-center text-center py-12 px-6"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
          className="w-20 h-20 rounded-full bg-primary/15 flex items-center justify-center mb-6 contact-success-ring"
        >
          <motion.svg
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="w-10 h-10 text-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <motion.path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M5 13l4 4L19 7"
            />
          </motion.svg>
        </motion.div>
        <h3 className="text-2xl font-bold text-foreground mb-2">Message Prepared!</h3>
        <p className="text-muted-foreground text-sm max-w-xs mb-6">
          Your email app should open with your message ready. Hit send and I&apos;ll get back to you shortly.
        </p>
        <button
          type="button"
          onClick={() => {
            setSuccess(false)
            setForm({ name: '', email: '', message: '' })
          }}
          className="text-primary text-sm font-semibold hover:underline"
        >
          Send another message
        </button>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {[
        { name: 'name', label: 'Your Name', type: 'text', placeholder: 'John Doe', required: true },
        { name: 'email', label: 'Your Email', type: 'email', placeholder: 'you@company.com', required: true },
      ].map((field, i) => (
        <motion.div
          key={field.name}
          custom={i}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fieldVariants}
        >
          <label className="block text-sm font-medium text-foreground mb-2">{field.label}</label>
          <input
            type={field.type}
            name={field.name}
            required={field.required}
            value={form[field.name]}
            onChange={handleChange}
            placeholder={field.placeholder}
            className={inputClass}
          />
        </motion.div>
      ))}

      <motion.div
        custom={2}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fieldVariants}
      >
        <label className="block text-sm font-medium text-foreground mb-2">Your Message</label>
        <textarea
          name="message"
          required
          value={form.message}
          onChange={handleChange}
          rows={4}
          placeholder="Tell me about your project, goals, and timeline..."
          className={`${inputClass} resize-none`}
        />
      </motion.div>

      <motion.div
        custom={3}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fieldVariants}
      >
        <motion.button
          type="submit"
          disabled={loading}
          whileHover={loading ? {} : { scale: 1.02, y: -1 }}
          whileTap={loading ? {} : { scale: 0.98 }}
          className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold shadow-glow disabled:opacity-70 disabled:cursor-not-allowed transition-opacity"
        >
          {loading ? (
            <>
              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Sending...
            </>
          ) : (
            <>
              Send Message
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </>
          )}
        </motion.button>
        <p className="text-muted-foreground text-xs mt-3 text-center">
          Or{' '}
          <Link href="/hire-me" className="text-primary hover:underline font-medium">
            submit a detailed project brief
          </Link>
        </p>
      </motion.div>
    </form>
  )
}
