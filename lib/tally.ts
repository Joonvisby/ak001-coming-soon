// Tally configuration
export const TALLY_CONFIG = {
  FORM_ID: process.env.NEXT_PUBLIC_TALLY_FORM_ID || 'wojxqe', // Extract form ID from URL
  API_KEY: process.env.TALLY_API_KEY || 'tly-ZjQFfRmUjYzWXp9rD8bGA3RclMzF49i2',
  WEBHOOK_URL: process.env.NEXT_PUBLIC_TALLY_WEBHOOK_URL || ''
}

// Debug function to log configuration
export function logTallyConfig() {
  console.log('Tally Config:', {
    FORM_ID: TALLY_CONFIG.FORM_ID,
    API_KEY: TALLY_CONFIG.API_KEY ? '***' + TALLY_CONFIG.API_KEY.slice(-4) : 'NOT_SET',
    WEBHOOK_URL: TALLY_CONFIG.WEBHOOK_URL
  })
}

// Helper function to submit to Tally
export async function submitToTally(email: string) {
  // Log configuration for debugging
  logTallyConfig()
  
  console.log('Submitting to Tally:', {
    url: `https://api.tally.so/v1/forms/${TALLY_CONFIG.FORM_ID}/submissions`,
    email: email
  })

  const response = await fetch(`https://api.tally.so/v1/forms/${TALLY_CONFIG.FORM_ID}/submissions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${TALLY_CONFIG.API_KEY}`
    },
    body: JSON.stringify({
      fields: [
        {
          key: 'email', // Replace with your actual field key from Tally
          value: email
        }
      ]
    })
  })

  console.log('Tally response status:', response.status)
  console.log('Tally response text:', await response.text())

  if (!response.ok) {
    throw new Error(`Tally submission failed: ${response.statusText}`)
  }

  return response.json()
}
