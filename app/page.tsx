// app/page.tsx (Next.js 15+)
import HeroSection from '@/components/HeroSection'
import FeaturesSection from '@/components/FeaturesSection'
import PopularSongs from '@/components/PopularSongs'
import Footer from '@/components/Footer'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <main>
        <FeaturesSection />
        <PopularSongs />
        <Footer />
      </main>
    </>
  )
}
