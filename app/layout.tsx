import './globals.css'
import type { Metadata } from 'next'
import GoogleAnalytics from '../components/GoogleAnalytics'

export const metadata: Metadata = {
  title: 'Adaptive Kitchen - Building better for you brands',
  description: 'Building the next wave of culture-shaping consumer brands. We create and launch breakthrough ventures that positively impact consumer health and wellness.',
  keywords: 'venture studio, consumer brands, CPG, food innovation, wellness brands, lifestyle brands, brand strategy, consumer health',
  authors: [{ name: 'Adaptive Kitchen' }],
  creator: 'Adaptive Kitchen',
  publisher: 'Adaptive Kitchen',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.adaptive.kitchen',
    siteName: 'Adaptive Kitchen',
    title: 'Adaptive Kitchen - Building better for you brands',
    description: 'Building the next wave of culture-shaping consumer brands. We create and launch breakthrough ventures that positively impact consumer health and wellness.',
    images: [
      {
        url: 'https://www.adaptive.kitchen/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Adaptive Kitchen - Building better for you brands',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Adaptive Kitchen - Building better for you brands',
    description: 'Building the next wave of culture-shaping consumer brands. We create and launch breakthrough ventures that positively impact consumer health and wellness.',
    images: ['https://www.adaptive.kitchen/og-image.png'],
    creator: '@adaptivekitchen',
    site: '@adaptivekitchen',
  },
  alternates: {
    canonical: 'https://www.adaptive.kitchen',
  },
  category: 'Business',
  classification: 'Venture Studio',
  icons: [
    { rel: 'icon', url: '/favicon.svg', type: 'image/svg+xml' },
    { rel: 'shortcut icon', url: '/favicon.svg' },
    { rel: 'apple-touch-icon', url: '/favicon.svg' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

  return (
    <html lang="en">
      <body className="bg-black text-white">
        {GA_MEASUREMENT_ID && <GoogleAnalytics GA_MEASUREMENT_ID={GA_MEASUREMENT_ID} />}
        {children}
      </body>
    </html>
  )
}
