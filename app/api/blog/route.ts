import { NextRequest, NextResponse } from 'next/server'
import { kv } from '@vercel/kv'

export async function GET() {
  try {
    const posts = await kv.get('blog_posts') || []
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
    const newPost = {
      id: `post_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...postData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      slug: postData.slug || postData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    }

    // Get existing posts
    const existingPosts = await kv.get('blog_posts') || []
    
    // Add new post
    const updatedPosts = [newPost, ...existingPosts]
    
    // Save to KV
    await kv.set('blog_posts', updatedPosts)
    
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
