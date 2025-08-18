import { Metadata } from 'next'
import BlogListingContent from './BlogListingContent'

export const metadata: Metadata = {
  title: 'All Insights | Adaptive Kitchen',
  description: 'Discover comprehensive insights into consumer brand development, venture building, and the future of better-for-you products.',
  openGraph: {
    title: 'All Insights | Adaptive Kitchen',
    description: 'Discover comprehensive insights into consumer brand development, venture building, and the future of better-for-you products.',
    type: 'website',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop&q=80',
        width: 1200,
        height: 630,
        alt: 'Adaptive Kitchen Insights',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'All Insights | Adaptive Kitchen',
    description: 'Discover comprehensive insights into consumer brand development, venture building, and the future of better-for-you products.',
    images: ['https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop&q=80'],
  },
}

export default function BlogPage() {
  return <BlogListingContent />
}
