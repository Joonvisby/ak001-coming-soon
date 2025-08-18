import { put } from '@vercel/blob'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    console.log('Upload API called')
    console.log('Environment check - BLOB_READ_WRITE_TOKEN exists:', !!process.env.BLOB_READ_WRITE_TOKEN)
    
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    console.log('File received:', {
      name: file?.name,
      type: file?.type,
      size: file?.size
    })
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'Only image files are allowed' },
        { status: 400 }
      )
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File size must be less than 5MB' },
        { status: 400 }
      )
    }

    // Upload to Vercel Blob
    console.log('Attempting to upload to Vercel Blob...')
    const blob = await put(file.name, file, {
      access: 'public',
    })
    console.log('Upload successful:', blob.url)

    return NextResponse.json({
      url: blob.url,
    })
      } catch (error) {
      console.error('Upload error:', error)
      return NextResponse.json(
        { error: `Upload failed: ${error instanceof Error ? error.message : 'Unknown error'}` },
        { status: 500 }
      )
    }
}
