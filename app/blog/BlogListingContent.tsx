'use client'

import { motion } from 'framer-motion'
import { Calendar, Clock, ArrowRight, BookOpen, ArrowLeft } from 'lucide-react'
import { useEffect } from 'react'
import Link from 'next/link'
import { event, trackButtonClick } from '../../lib/analytics'
import Footer from '../../Footer'

interface BlogPost {
  id: string
  title: string
  excerpt: string
  category: string
  readTime: string
  date: string
  image: string
  slug: string
  content?: string
  author?: string
  tags?: string[]
}

export default function BlogListingContent({ blogPosts }: { blogPosts: BlogPost[] }) {
  useEffect(() => {
    // Track when blog page comes into view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            event({
              action: 'view',
              category: 'engagement',
              label: 'blog_page',
            })
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.5 }
    )

    const blogSection = document.getElementById('blog-page')
    if (blogSection) {
      observer.observe(blogSection)
    }

    return () => observer.disconnect()
  }, [])

  const handleBlogClick = (blogId: string) => {
    trackButtonClick(`blog_${blogId}_click`)
  }

  return (
    <div id="blog-page" className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container-custom py-8">
          <div className="flex items-center gap-4 mb-6">
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-[#007BFF] hover:text-[#0056b3] transition-colors duration-300"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Home</span>
            </Link>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="heading-lg mb-6" style={{ color: '#000000' }}>
              All Insights
            </h1>
            <p className="text-body max-w-3xl mx-auto text-lg leading-relaxed" style={{ color: '#000000' }}>
              Discover comprehensive insights into consumer brand development, venture building, and the future of better-for-you products.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => {
            return (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
                onClick={() => handleBlogClick(post.id)}
              >
                <Link href={`/blog/${post.slug}`} className="block h-full">
                  <div className="card-ag1 h-full flex flex-col">
                    {/* Blog Image */}
                    <div className="relative overflow-hidden rounded-xl mb-6 h-48 flex-shrink-0">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      <div className="absolute top-4 left-4">
                        <span className="inline-block px-3 py-1 bg-[#007BFF] text-white text-xs font-medium rounded-full">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    {/* Blog Content */}
                    <div className="flex-1 flex flex-col">
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{post.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>

                      <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-[#007BFF] transition-colors duration-300">
                        {post.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-4 leading-relaxed flex-1">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center gap-2 text-[#007BFF]">
                          <BookOpen className="h-4 w-4" />
                          <span className="text-sm font-medium">Read More</span>
                        </div>
                        <ArrowRight className="h-5 w-5 text-[#007BFF] transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            )
          })}
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  )
}
