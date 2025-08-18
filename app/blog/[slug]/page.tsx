import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import BlogPostContent from './BlogPostContent'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  // Try to get post from API first, then fallback to static data
  let post = null
  
  try {
    const response = await fetch(`/api/blog?slug=${params.slug}`, { cache: 'no-store' })
    if (response.ok) {
      const data = await response.json()
      post = data.post
    }
  } catch (error) {
    console.error('Error fetching post from API:', error)
  }
  
  // Fallback to static data
  if (!post) {
    const { getBlogPostBySlug } = await import('../../../lib/blog-data')
    post = getBlogPostBySlug(params.slug)
  }
  
  if (!post) {
    return {
      title: 'Blog Post Not Found',
      description: 'The requested blog post could not be found.',
    }
  }

  return {
    title: `${post.title} | Adaptive Kitchen`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  // Try to get post from API first, then fallback to static data
  let post = null
  
  try {
    const response = await fetch(`/api/blog?slug=${params.slug}`, { cache: 'no-store' })
    if (response.ok) {
      const data = await response.json()
      post = data.post
    }
  } catch (error) {
    console.error('Error fetching post from API:', error)
  }
  
  // Fallback to static data
  if (!post) {
    const { getBlogPostBySlug } = await import('../../../lib/blog-data')
    post = getBlogPostBySlug(params.slug)
  }

  if (!post) {
    notFound()
  }

  return <BlogPostContent post={post} />
}
