import { NextResponse } from 'next/server'
import { getBlogPosts } from '../../../lib/blog-data'

export async function GET() {
  try {
    const blogPosts = getBlogPosts()
    return NextResponse.json({ posts: blogPosts })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    )
  }
}
