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

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const redis = createClient({
      url: process.env.REDIS_URL
    })
    
    await redis.connect()
    const postsData = await redis.get('blog_posts')
    await redis.disconnect()
    
    const posts: BlogPost[] = postsData ? JSON.parse(postsData) : []
    const post = posts.find((p: BlogPost) => p.id === params.id || p.slug === params.id)
    
    if (!post) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ post })
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return NextResponse.json(
      { error: 'Failed to fetch blog post' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const updateData = await request.json()
    
    const redis = createClient({
      url: process.env.REDIS_URL
    })
    
    await redis.connect()
    const postsData = await redis.get('blog_posts')
    const posts: BlogPost[] = postsData ? JSON.parse(postsData) : []
    
    const postIndex = posts.findIndex((p: BlogPost) => p.id === params.id)
    if (postIndex === -1) {
      await redis.disconnect()
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      )
    }
    
    // Update post
    posts[postIndex] = {
      ...posts[postIndex],
      ...updateData,
      updatedAt: new Date().toISOString()
    }
    
    // Save to Redis
    await redis.set('blog_posts', JSON.stringify(posts))
    await redis.disconnect()
    
    return NextResponse.json({ 
      success: true, 
      post: posts[postIndex],
      message: 'Blog post updated successfully' 
    })
  } catch (error) {
    console.error('Error updating blog post:', error)
    return NextResponse.json(
      { error: 'Failed to update blog post' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const redis = createClient({
      url: process.env.REDIS_URL
    })
    
    await redis.connect()
    const postsData = await redis.get('blog_posts')
    const posts: BlogPost[] = postsData ? JSON.parse(postsData) : []
    
    const filteredPosts = posts.filter((p: BlogPost) => p.id !== params.id)
    
    // Save to Redis
    await redis.set('blog_posts', JSON.stringify(filteredPosts))
    await redis.disconnect()
    
    return NextResponse.json({ 
      success: true,
      message: 'Blog post deleted successfully' 
    })
  } catch (error) {
    console.error('Error deleting blog post:', error)
    return NextResponse.json(
      { error: 'Failed to delete blog post' },
      { status: 500 }
    )
  }
}
