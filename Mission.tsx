'use client'

import { motion } from 'framer-motion'
import { Target, Users, Globe, Heart, ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { event, trackButtonClick } from './lib/analytics'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './components/ui/accordion'



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

  const [activeTabId, setActiveTabId] = useState<number>(1)
  const [activeImage, setActiveImage] = useState("https://shadcnblocks.com/images/block/placeholder-1.svg")

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
          <h2 className="heading-lg mb-8" style={{ color: '#000000' }}>
            Our Mission
          </h2>
          <p className="text-body max-w-4xl mx-auto text-lg leading-relaxed" style={{ color: '#000000' }}>
            We turn everyday into better days by designing adaptive innovations that fit real life, spark joy, and move people forward.
          </p>
        </motion.div>

        {/* Mission Pillars Accordion Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: '#000000' }}>
              Mission Pillars
            </h3>
            <div className="w-24 h-1 bg-[#007BFF] mx-auto rounded-full"></div>
          </div>
          
          <div className="container mx-auto">
            <div className="mb-12 flex w-full items-start justify-between gap-12">
              <div className="w-full md:w-1/2">
                <Accordion type="single" className="w-full" defaultValue="item-1">
                  {[
                    {
                      id: 1,
                      title: "Innovation-Forward",
                      image: "https://shadcnblocks.com/images/block/placeholder-1.svg",
                      description: "We don't just re-invent products, we reinvent lifestyles to transform not just how we eat, but transform how customers pursue happiness and health."
                    },
                    {
                      id: 2,
                      title: "User-Focused",
                      image: "https://shadcnblocks.com/images/block/placeholder-2.svg",
                      description: "We see what others miss. By spotting the gaps and opportunities in the market, we build category defining solutions that shift how food, wellness, and lifestyle are experienced."
                    },
                    {
                      id: 3,
                      title: "Purpose-Driven",
                      image: "https://shadcnblocks.com/images/block/placeholder-3.svg",
                      description: "Every choice shapes the future. We bring adaptive innovations that empower modern consumers to have access to healthier innovative options, live for fulfillment, and enjoy making memories with loved ones with out the guilt and worry from bad-for-you foods."
                    }
                  ].map((tab) => (
                    <AccordionItem key={tab.id} value={`item-${tab.id}`}>
                      <AccordionTrigger
                        onClick={() => {
                          setActiveImage(tab.image)
                          setActiveTabId(tab.id)
                        }}
                        className="cursor-pointer py-5 !no-underline transition"
                      >
                        <h6 className={`text-xl font-semibold ${tab.id === activeTabId ? "text-gray-900" : "text-gray-600"}`}>
                          {tab.title}
                        </h6>
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="mt-3 text-gray-600">
                          {tab.description}
                        </p>
                        <div className="mt-4 md:hidden">
                          <img
                            src={tab.image}
                            alt={tab.title}
                            className="h-full max-h-80 w-full rounded-md object-cover"
                          />
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
              <div className="relative m-auto hidden w-1/2 overflow-hidden rounded-xl bg-gray-100 md:block h-[280px] lg:h-[320px]">
                <img
                  src={activeImage}
                  alt="Mission pillar preview"
                  className="h-full w-full rounded-md object-contain p-4"
                />
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h3 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: '#000000' }}>
            Our Core Pillars
          </h3>
          <div className="w-24 h-1 bg-[#007BFF] mx-auto rounded-full"></div>
        </motion.div>

        <div className="mx-auto my-8 grid w-full max-w-6xl grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4 mb-16 items-stretch">
          {/* Strategic Vision Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="group visible cursor-pointer"
            style={{ transform: 'translateY(0px) scale(1)' }}
          >
            <div
              className="relative transform overflow-hidden rounded-2xl p-6 shadow-lg transition-all duration-300 group-hover:scale-105 hover:shadow-xl min-h-[280px]"
              style={{
                background: 'url(https://images.unsplash.com/photo-1635776062360-af423602aff3?w=800&q=80)',
                backgroundSize: 'cover',
              }}
            >
              <div className="relative">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-white/20">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <h3 className="mb-2 font-sans text-lg font-medium text-white">
                  Strategic Vision
                </h3>
                <p className="mb-4 font-sans text-sm text-white/80">
                  We identify and capitalize on emerging consumer trends, creating brands that resonate with modern lifestyles.
                </p>
                <div className="flex items-center text-white/60">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-1 h-4 w-4"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  <span className="font-sans text-xs">Trend-focused approach</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Collaborative Approach Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="group visible cursor-pointer"
            style={{ transform: 'translateY(0px) scale(1)' }}
          >
            <div
              className="relative transform overflow-hidden rounded-2xl p-6 shadow-lg transition-all duration-300 group-hover:scale-105 hover:shadow-xl min-h-[280px]"
              style={{
                background: 'url(https://images.unsplash.com/photo-1579548122080-c35fd6820ecb?w=800&q=80)',
                backgroundSize: 'cover',
              }}
            >
              <div className="relative">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-white/20">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h3 className="mb-2 font-sans text-lg font-medium text-white">
                  Collaborative Approach
                </h3>
                <p className="mb-4 font-sans text-sm text-white/80">
                  Our multidisciplinary team brings together expertise from brand strategy, design, operations, and market insights.
                </p>
                <div className="flex items-center text-white/60">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-1 h-4 w-4"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                  <span className="font-sans text-xs">Expert collaboration</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Global Perspective Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="group visible cursor-pointer"
            style={{ transform: 'translateY(0px) scale(1)' }}
          >
            <div
              className="relative transform overflow-hidden rounded-2xl p-6 shadow-lg transition-all duration-300 group-hover:scale-105 hover:shadow-xl min-h-[280px]"
              style={{
                background: 'url(https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?w=800&q=80)',
                backgroundSize: 'cover',
              }}
            >
              <div className="relative">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-white/20">
                  <Globe className="h-6 w-6 text-white" />
                </div>
                <h3 className="mb-2 font-sans text-lg font-medium text-white">
                  Global Perspective
                </h3>
                <p className="mb-4 font-sans text-sm text-white/80">
                  We bridge Eastern and Western insights to create brands with universal appeal and cultural relevance.
                </p>
                <div className="flex items-center text-white/60">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-1 h-4 w-4"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  <span className="font-sans text-xs">Cultural bridge</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Purpose-Driven Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="group visible cursor-pointer"
            style={{ transform: 'translateY(0px) scale(1)' }}
          >
            <div
              className="relative transform overflow-hidden rounded-2xl p-6 shadow-lg transition-all duration-300 group-hover:scale-105 hover:shadow-xl min-h-[280px]"
              style={{
                background: 'url(https://images.unsplash.com/photo-1635776063328-153b13e3c245?w=800&q=80)',
                backgroundSize: 'cover',
              }}
            >
              <div className="relative">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-white/20">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <h3 className="mb-2 font-sans text-lg font-medium text-white">
                  Purpose-Driven
                </h3>
                <p className="mb-4 font-sans text-sm text-white/80">
                  Every venture we create is built to enhance health, wellness, and enrich people's daily lives through innovative solutions.
                </p>
                <div className="flex items-center text-white/60">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-1 h-4 w-4"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                  <span className="font-sans text-xs">Life-enhancing focus</span>
                </div>
              </div>
            </div>
          </motion.div>
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
              backgroundColor: '#007BFF', 
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
