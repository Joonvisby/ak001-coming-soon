import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

// Email subscription interface
interface EmailSubscription {
  email: string
  timestamp: string
  date: string
}

// File to store emails
const EMAILS_FILE = path.join(process.cwd(), 'emails.json')

// Ensure emails file exists
function ensureEmailsFile() {
  if (!fs.existsSync(EMAILS_FILE)) {
    fs.writeFileSync(EMAILS_FILE, JSON.stringify([], null, 2))
  }
}

// Read emails from file
function readEmails(): EmailSubscription[] {
  ensureEmailsFile()
  try {
    const data = fs.readFileSync(EMAILS_FILE, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading emails file:', error)
    return []
  }
}

// Write emails to file
function writeEmails(emails: EmailSubscription[]) {
  ensureEmailsFile()
  try {
    fs.writeFileSync(EMAILS_FILE, JSON.stringify(emails, null, 2))
  } catch (error) {
    console.error('Error writing emails file:', error)
  }
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()
    
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      )
    }

    // Read existing emails
    const emails = readEmails()
    
    // Check if email already exists
    const existingEmail = emails.find(sub => sub.email === email)
    if (existingEmail) {
      return NextResponse.json(
        { error: 'Email already subscribed' },
        { status: 409 }
      )
    }

    // Create new subscription with timestamp
    const now = new Date()
    const newSubscription: EmailSubscription = {
      email,
      timestamp: now.toISOString(),
      date: now.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    }

    // Add new email
    emails.push(newSubscription)
    writeEmails(emails)

    console.log('Email subscribed:', email)
    console.log('Timestamp:', newSubscription.date)
    console.log('Total emails:', emails.length)

    return NextResponse.json(
      { message: 'Successfully subscribed', totalEmails: emails.length },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error in subscribe API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const emails = readEmails()
    return NextResponse.json(
      { emails, totalEmails: emails.length },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error getting emails:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
