'use client'

import { useState } from 'react'

export default function AdminDashboard() {
  console.log('AdminDashboard component rendered')
  
  const [count, setCount] = useState(0)
  
  const handleClick = () => {
    console.log('Button clicked, count:', count)
    setCount(count + 1)
    alert(`Button clicked! Count is now: ${count + 1}`)
  }
  
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard Test</h1>
        
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-lg text-gray-700 mb-4">
            This is a simple test to see if client-side JavaScript is working.
          </p>
          
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={handleClick}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Click me! (Count: {count})
            </button>
          </div>
          
          <p className="text-sm text-gray-500">
            If you can see this and the button works, then client-side JavaScript is functioning.
          </p>
        </div>
      </div>
    </div>
  )
}
