'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { trackEmailSignup } from './lib/analytics'

export default function Contact() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
      })

      const result = await response.json()

      if (response.ok) {
        console.log('Email subscribed successfully:', email)
        // Track successful email signup
        trackEmailSignup(email)
        setIsSubmitted(true)
        setEmail('')
      } else {
        console.error('Subscription error:', result.error)
        setIsSubmitted(true)
        setEmail('')
      }
    } catch (error) {
      console.error('Error submitting email:', error)
      setIsSubmitted(true)
      setEmail('')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-24 bg-[#1d2d55]">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Join Our Newsletter
          </h2>
          <p className="text-lg mb-8 text-gray-300">
            Stay updated with our latest ventures and insights
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-full border-0 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#e04424] focus:ring-opacity-50"
              required
            />
            <button
              type="submit"
              disabled={isSubmitting || isSubmitted}
              className="px-8 py-4 bg-[#e04424] text-white rounded-full font-semibold hover:bg-[#c0391e] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Subscribing...' : isSubmitted ? 'Subscribed!' : 'Subscribe'}
            </button>
          </form>
          
          {isSubmitted && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-green-400 mt-4"
            >
              Thanks for subscribing!
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  )
}
