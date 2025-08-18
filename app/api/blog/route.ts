import { NextRequest, NextResponse } from 'next/server'
import { createClient } from 'redis'

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  category: string
  readTime: string
  author: string
  tags: string[]
  image: string
  contentImages: string[]
  date: string
  createdAt: string
  updatedAt: string
  slug: string
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get('slug')
    
    const redis = createClient({
      url: process.env.REDIS_URL
    })
    
    await redis.connect()
    const postsData = await redis.get('blog_posts')
    await redis.disconnect()
    
    const posts: BlogPost[] = postsData ? JSON.parse(postsData) : []
    
    if (slug) {
      // Fetch specific post by slug
      console.log(`GET /api/blog?slug=${slug} - Fetching specific blog post`)
      
      const post = posts.find(p => p.slug === slug)
      if (!post) {
        console.log(`Post with slug ${slug} not found`)
        return NextResponse.json({ error: 'Post not found' }, { status: 404 })
      }
      
      console.log(`Found post: ${post.title}`)
      return NextResponse.json({ post })
    }
    
    // Fetch all blog posts
    console.log('GET /api/blog - Fetching all blog posts')
    console.log(`Found ${posts.length} blog posts`)
    return NextResponse.json({ posts })
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const postData = await request.json()
    
    // Generate unique ID and timestamp
    const newPost: BlogPost = {
      id: `post_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...postData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      slug: postData.slug || postData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    }

    const redis = createClient({
      url: process.env.REDIS_URL
    })
    
    await redis.connect()
    
    // Get existing posts
    const existingPostsData = await redis.get('blog_posts')
    const existingPosts: BlogPost[] = existingPostsData ? JSON.parse(existingPostsData) : []
    
    // Add new post
    const updatedPosts = [newPost, ...existingPosts]
    
    // Save to Redis
    await redis.set('blog_posts', JSON.stringify(updatedPosts))
    await redis.disconnect()
    
    return NextResponse.json({ 
      success: true, 
      post: newPost,
      message: 'Blog post created successfully' 
    })
  } catch (error) {
    console.error('Error creating blog post:', error)
    return NextResponse.json(
      { error: 'Failed to create blog post' },
      { status: 500 }
    )
  }
}
