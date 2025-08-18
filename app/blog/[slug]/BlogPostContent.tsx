'use client'

import { motion } from 'framer-motion'
import { Calendar, Clock, BookOpen, ArrowLeft, Twitter, Facebook, Linkedin } from 'lucide-react'
import { useEffect } from 'react'
import Link from 'next/link'
import { event, trackButtonClick } from '../../../lib/analytics'
import Footer from '../../../Footer'

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

export default function BlogPostContent({ post }: { post: BlogPost }) {
  useEffect(() => {
    // Track when blog post comes into view
    event({
      action: 'view',
      category: 'engagement',
      label: `blog_post_${post.id}`,
    })
  }, [post.id])

  const handleShare = (platform: string) => {
    trackButtonClick(`blog_share_${platform}`)
    const url = window.location.href
    const title = post.title
    const excerpt = post.excerpt
    
    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`)
        break
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`)
        break
      case 'linkedin':
        // LinkedIn doesn't support custom text in the URL, but we can use the post URL
        // The post title and excerpt will be pulled from the page's meta tags
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`)
        break
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container-custom py-8">
          <div className="flex items-center gap-4 mb-6">
            <Link 
              href="/blog"
              className="inline-flex items-center gap-2 text-[#007BFF] hover:text-[#0056b3] transition-colors duration-300"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to All Insights</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Blog Post Content */}
      <div className="container-custom py-16">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <header className="mb-12">
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-[#007BFF] text-white text-sm font-medium rounded-full mb-4">
                {post.category}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
              {post.title}
            </h1>
            
            <div className="flex items-center gap-6 text-gray-600 mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>{post.readTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                <span>By {post.author}</span>
              </div>
            </div>

            <p className="text-xl text-gray-700 leading-relaxed">
              {post.excerpt}
            </p>
          </header>

          {/* Featured Image */}
          <div className="mb-12">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-96 object-cover rounded-xl"
            />
          </div>

          {/* Content */}
          {post.content && (
            <div 
              className="prose prose-lg max-w-none mb-12"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          )}

          {/* Tags */}
          {post.tags && (
            <div className="mb-12">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Share Section */}
          <div className="border-t border-gray-200 pt-8">
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Share this insight</h3>
            <div className="flex gap-4">
              <button
                onClick={() => handleShare('twitter')}
                className="flex items-center gap-2 px-4 py-2 bg-[#1DA1F2] text-white rounded-lg hover:bg-[#1a8cd8] transition-colors duration-300"
              >
                <Twitter className="h-4 w-4" />
                Twitter
              </button>
              <button
                onClick={() => handleShare('facebook')}
                className="flex items-center gap-2 px-4 py-2 bg-[#4267B2] text-white rounded-lg hover:bg-[#365899] transition-colors duration-300"
              >
                <Facebook className="h-4 w-4" />
                Facebook
              </button>
              <button
                onClick={() => handleShare('linkedin')}
                className="flex items-center gap-2 px-4 py-2 bg-[#0077B5] text-white rounded-lg hover:bg-[#006097] transition-colors duration-300"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </button>
            </div>
          </div>
        </motion.article>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  )
}
