import { NextRequest, NextResponse } from 'next/server'

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxLmH3OV7PXgRMoAPd2iwSOIGNXfezkKGjxtE7Q-idhHUYZ1RzL_-XAFYhxW7kIBIEViA/exec'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()
    
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      )
    }

    // Create timestamp data
    const now = new Date()
    const timestamp = now.toISOString()
    const date = now.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })

    // Send to Google Sheets
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        timestamp,
        date
      })
    })

    const result = await response.json()

    if (result.success) {
      console.log('Email added to Google Sheets:', email)
      return NextResponse.json(
        { message: 'Successfully subscribed', email },
        { status: 200 }
      )
    } else {
      throw new Error(result.error || 'Failed to add to Google Sheets')
    }

  } catch (error) {
    console.error('Error in subscribe API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    { emails: [], totalEmails: 0 },
    { status: 200 }
  )
}