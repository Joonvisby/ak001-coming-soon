import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Adaptive Kitchen - Coming Soon',
  description: 'Building the next wave of culture-shaping consumer brands',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        {children}
      </body>
    </html>
  )
}
