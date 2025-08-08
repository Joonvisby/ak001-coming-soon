import Hero from '../Hero'
import Mission from '../Mission'
import Contact from '../Contact'
import Footer from '../Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Mission />
      <Contact />
      <Footer />
    </main>
  )
}
