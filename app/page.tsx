import Hero from '../Hero'
import Mission from '../Mission'
import Contact from '../Contact'
import Footer from '../Footer'

export default function Home() {
  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Adaptive Kitchen",
            "description": "Building the next wave of culture-shaping consumer brands. We create and launch breakthrough ventures that positively impact consumer health and wellness.",
            "url": "https://adaptive.kitchen",
            "logo": "https://adaptive.kitchen/favicon.svg",
            "sameAs": [
              "https://twitter.com/adaptivekitchen",
              "https://linkedin.com/company/adaptive-kitchen"
            ],
            "contactPoint": {
              "@type": "ContactPoint",
              "email": "info@adaptive.kitchen",
              "contactType": "customer service"
            },
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "Global"
            },
            "foundingDate": "2024",
            "industry": "Venture Studio",
            "knowsAbout": [
              "Consumer Brands",
              "CPG Innovation",
              "Food & Wellness",
              "Brand Strategy",
              "Venture Development"
            ]
          })
        }}
      />
      
      <main className="min-h-screen">
        <Hero />
        <Mission />
        <Contact />
        <Footer />
      </main>
    </>
  )
}
