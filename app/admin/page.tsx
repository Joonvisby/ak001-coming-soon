'use client'

import { useState, useEffect } from 'react'

interface EmailSubscription {
  email: string
  timestamp: string
  date: string
}

interface EmailData {
  emails: EmailSubscription[]
  totalEmails: number
}

export default function AdminPage() {
  const [emailData, setEmailData] = useState<EmailData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchEmails()
  }, [])

  const fetchEmails = async () => {
    try {
      const response = await fetch('/api/subscribe')
      const data = await response.json()
      setEmailData(data)
    } catch (error) {
      console.error('Error fetching emails:', error)
    } finally {
      setLoading(false)
    }
  }

  const exportEmails = () => {
    if (!emailData) return
    
    const csvContent = `data:text/csv;charset=utf-8,Email,Date,Timestamp\n${emailData.emails.map(sub => `${sub.email},${sub.date},${sub.timestamp}`).join('\n')}`
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', 'subscribers.csv')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Email Subscribers</h1>
        
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              Total Subscribers: {emailData?.totalEmails || 0}
            </h2>
            <button
              onClick={exportEmails}
              className="px-4 py-2 bg-[#e04424] text-white rounded hover:bg-[#c0391e] transition-colors"
            >
              Export CSV
            </button>
          </div>
          
          {emailData?.emails && emailData.emails.length > 0 ? (
            <div className="space-y-2">
              {emailData.emails.map((subscription, index) => (
                <div key={index} className="bg-gray-700 p-3 rounded flex justify-between items-center">
                  <div>
                    <div className="font-medium">{subscription.email}</div>
                    <div className="text-sm text-gray-400">{subscription.date}</div>
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(subscription.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No emails collected yet.</p>
          )}
        </div>
        
        <div className="text-sm text-gray-400">
          <p>Emails are stored locally in <code>emails.json</code></p>
          <p>You can also access the API directly at <code>/api/subscribe</code></p>
        </div>
      </div>
    </div>
  )
}
