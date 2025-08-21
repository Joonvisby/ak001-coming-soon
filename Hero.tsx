'use client'

import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown, Menu } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import TextType from './TextType'
import { trackButtonClick } from './lib/analytics'

export default function Hero() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  
  const videos = [
    '/videos/Herovideocomp.mp4',
    '/videos/boomburst.mp4'
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length)
    }, 8000) // Switch every 8 seconds

    return () => clearInterval(interval)
  }, [videos.length])

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load()
      videoRef.current.play().catch(console.error)
    }
  }, [currentVideoIndex])

  const scrollToMission = () => {
    document.getElementById('mission')?.scrollIntoView({ behavior: 'smooth' })
    // Track button click
    trackButtonClick('learn_more_button')
  }

  const handleScrollIndicatorClick = () => {
    document.getElementById('mission')?.scrollIntoView({ behavior: 'smooth' })
    // Track scroll indicator click
    trackButtonClick('scroll_indicator')
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
    trackButtonClick('hamburger_menu_button')
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
    closeMenu()
    trackButtonClick(`menu_nav_${sectionId}`)
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Hamburger Menu Button */}
      <motion.button
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="absolute top-8 right-8 z-30 p-3 bg-[#23397E] hover:bg-[#1a2b5e] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
        onClick={toggleMenu}
        aria-label="Open menu"
      >
        <Menu className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
      </motion.button>

      {/* Navigation Menu Overlay */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-40 flex items-center justify-center"
          onClick={closeMenu}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center max-w-2xl mx-auto p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeMenu}
              className="absolute top-8 right-8 p-3 text-white hover:text-[#23397E] transition-colors duration-300"
              aria-label="Close menu"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Menu Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold mb-6 text-white"
            >
              Navigation
            </motion.h2>

            {/* Blue Line */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="w-24 h-1 bg-[#23397E] mx-auto rounded-full mb-12"
            />

            {/* Menu Items */}
            <div className="space-y-8">
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                onClick={() => scrollToSection('mission')}
                className="block w-full text-2xl md:text-3xl font-semibold text-white hover:text-[#23397E] transition-colors duration-300 py-4 border-b border-white/20 hover:border-[#23397E]/50"
              >
                About
              </motion.button>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                onClick={() => scrollToSection('blog')}
                className="block w-full text-2xl md:text-3xl font-semibold text-white hover:text-[#23397E] transition-colors duration-300 py-4 border-b border-white/20 hover:border-[#23397E]/50"
              >
                Insights
              </motion.button>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                onClick={() => scrollToSection('contact')}
                className="block w-full text-2xl md:text-3xl font-semibold text-white hover:text-[#23397E] transition-colors duration-300 py-4 border-b border-white/20 hover:border-[#23397E]/50"
              >
                Contact
              </motion.button>


            </div>

            {/* Additional Info */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="text-white/70 mt-12 text-lg"
            >
              Building the next wave of culture-shaping brands
            </motion.p>
          </motion.div>
        </motion.div>
      )}

      {/* Video Background - Fixed sizing */}
      <div className="absolute inset-0 w-full h-full">
        <video
          ref={videoRef}
          key={videos[currentVideoIndex]}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover transition-opacity duration-1000"
          style={{ 
            filter: 'brightness(0.3)',
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        >
          <source src={videos[currentVideoIndex]} type="video/mp4" />
        </video>
      </div>

      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Removed the top-right orange circle */}
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#23397E] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div>

      {/* Content overlay */}
      <div className="container-custom relative z-20">
        <div className="text-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white drop-shadow-lg">
              <TextType 
                text={["Building the next wave of culture shaping better-for-you brands."]}
                typingSpeed={75}
                pauseDuration={1500}
                showCursor={true}
                cursorCharacter="|"
                className="text-white"
              />
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button
              onClick={scrollToMission}
              className="group flex items-center justify-center px-8 py-5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              style={{ 
                backgroundColor: '#23397E', 
                color: 'white',
                minWidth: '200px'
              }}
            >
              Learn More
              <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </div>
      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <button
          onClick={handleScrollIndicatorClick}
          className="flex flex-col items-center transition-colors text-white drop-shadow-lg"
        >
          <span className="text-sm mb-2">Scroll to explore</span>
          <ChevronDown className="h-6 w-6 animate-bounce" />
        </button>
      </motion.div>
    </section>
  )
}
