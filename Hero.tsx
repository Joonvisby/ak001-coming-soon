'use client'

import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import TextType from './TextType'
import { trackButtonClick } from './lib/analytics'

export default function Hero() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
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

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
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
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#007BFF] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
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
                text={["Building the next wave of culture-shaping better for you brands."]}
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
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <p className="text-xl sm:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed text-white drop-shadow-lg">
              Adaptive Kitchen is a pioneering venture studio, We turn bold ideas into everyday essentials transforming how people live, eat, and thrive.
            </p>
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
                backgroundColor: '#007BFF', 
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
