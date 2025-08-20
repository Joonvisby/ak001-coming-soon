'use client'

import { motion } from 'framer-motion'
import { Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { event, trackButtonClick } from './lib/analytics'

export default function Blog() {
  const [blogPosts, setBlogPosts] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        // Fetch from API (admin-created posts)
        const response = await fetch('/api/blog')
        let apiPosts = []
        if (response.ok) {
          const data = await response.json()
          apiPosts = data.posts || []
        }
        
        // Import static posts (existing 6 posts)
        const { getBlogPosts } = await import('./lib/blog-data')
        const staticPosts = getBlogPosts()
        
        // Combine both sources, prioritizing API posts (newer)
        const allPosts = [...apiPosts, ...staticPosts]
        
        // Remove duplicates based on title
        const uniquePosts = allPosts.filter((post, index, self) => 
          index === self.findIndex(p => p.title === post.title)
        )
        
        setBlogPosts(uniquePosts)
      } catch (err) {
        console.error('Error fetching blog posts:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchBlogPosts()
  }, [])

  useEffect(() => {
    // Track when blog section comes into view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            event({
              action: 'view',
              category: 'engagement',
              label: 'blog_section',
            })
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.5 }
    )

    const blogSection = document.getElementById('blog')
    if (blogSection) {
      observer.observe(blogSection)
    }

    return () => observer.disconnect()
  }, [])

  const handleBlogClick = (blogId: string) => {
    trackButtonClick(`blog_${blogId}_click`)
    // Navigation is handled by Link component
  }

  return (
    <section id="blog" className="py-32 bg-gray-100">
      <div className="container-custom">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: '#000000' }}>
            Latest Insights
          </h2>
          <div className="w-24 h-1 bg-[#007BFF] mx-auto rounded-full mb-8"></div>
          <p className="text-body max-w-4xl mx-auto text-lg leading-relaxed" style={{ color: '#000000' }}>
            Discover the latest trends, strategies, and insights in consumer brand development, venture building, and the future of better-for-you products.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading latest insights...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {blogPosts.slice(3, 6).map((post: any, index: number) => {
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
                    <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs md:text-sm text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 md:h-4 md:w-4" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3 md:h-4 md:w-4" />
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
        )}

        {/* View All Blogs Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href="/blog">
            <button
              onClick={() => trackButtonClick('blog_view_all_button')}
              className="inline-flex items-center gap-2 px-12 py-4 bg-[#007BFF] text-white rounded-full font-semibold hover:bg-[#0056b3] transition-colors duration-300"
            >
              View All Insights
              <ArrowRight className="h-5 w-5" />
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
