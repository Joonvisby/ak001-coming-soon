'use client'

import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="py-16" style={{ backgroundColor: '#1d2d55' }}>
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <h3 className="text-2xl font-bold mb-4 text-white">Adaptive Kitchen</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Building the next wave of culture-shaping consumer brands. We bring together culture-savvy strategy, 
              design excellence, and a multi-disciplinary team to create and launch breakthrough ventures.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-4 text-white">Our Brands</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">FLOPOP</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">OLIGO</a>
              </li>
              <li>
                <span className="text-gray-400">More Coming Soon</span>
              </li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-4 text-white">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center text-gray-300">
                <MapPin className="w-4 h-4 mr-2" />
                <span>Global Operations</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="border-t border-gray-700 mt-12 pt-8 text-center"
        >
          <p className="text-gray-400">
            © 2024 Adaptive Kitchen. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
