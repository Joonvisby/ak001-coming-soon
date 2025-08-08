'use client'

import { motion } from 'framer-motion'
import { Target, Users, Globe, Heart, ArrowRight } from 'lucide-react'
import { useEffect } from 'react'
import { event, trackButtonClick } from './lib/analytics'

const missionPoints = [
  {
    icon: Target,
    title: 'Strategic Vision',
    description: 'We identify and capitalize on emerging consumer trends, creating brands that resonate with modern lifestyles.',
  },
  {
    icon: Users,
    title: 'Collaborative Approach',
    description: 'Our multidisciplinary team brings together expertise from brand strategy, design, operations, and market insights.',
  },
  {
    icon: Globe,
    title: 'Global Perspective',
    description: 'We bridge Eastern and Western insights to create brands with universal appeal and cultural relevance.',
  },
  {
    icon: Heart,
    title: 'Purpose-Driven',
    description: 'Every venture we create is built to enhance health, wellness, and enrich people\'s daily lives.',
  },
]

export default function Mission() {
  useEffect(() => {
    // Track when mission section comes into view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            event({
              action: 'view',
              category: 'engagement',
              label: 'mission_section',
            })
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.5 }
    )

    const missionSection = document.getElementById('mission')
    if (missionSection) {
      observer.observe(missionSection)
    }

    return () => observer.disconnect()
  }, [])

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
    trackButtonClick('mission_learn_more_button')
  }

  return (
    <section id="mission" className="py-32 bg-background">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="heading-lg mb-8" style={{ color: '#1d2d55' }}>
            Our Mission
          </h2>
          <p className="text-body max-w-4xl mx-auto text-lg leading-relaxed" style={{ color: '#1d2d55' }}>
            We create and launch breakthrough ventures that positively impact consumer healthy and wellness. By combining deep cultural insights with design excellence and a team of multi-disciplinary experts, we turn big ideas into thriving brands that transform and enrich people's lifestyles.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto mb-16">
          {missionPoints.map((point, index) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="card-ag1 h-full">
                <div className="flex items-center justify-center w-16 h-16 bg-[#E6F7F1] rounded-full mb-6 mx-auto">
                  <point.icon className="w-8 h-8 text-accent" />
                </div>
                
                <h3 className="heading-md mb-4" style={{ color: '#1d2d55' }}>
                  {point.title}
                </h3>
                
                <p className="text-body">
                  {point.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Learn More Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <button
            onClick={scrollToContact}
            className="group flex items-center justify-center px-8 py-5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 mx-auto"
            style={{ 
              backgroundColor: '#e04424', 
              color: 'white',
              minWidth: '200px'
            }}
          >
            Join Our Newsletter
            <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  )
}
