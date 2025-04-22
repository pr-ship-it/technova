import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import ServicesSection from "@/components/services-section"
import AboutSection from "@/components/about-section"
import TeamSection from "@/components/team-section"
import TestimonialsSection from "@/components/testimonials-section"
import CtaSection from "@/components/cta-section"
import { Footer } from "@/components/footer"



export default function Home() {
  return (
    <main className="min-h-screen text-white overflow-hidden">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <AboutSection />
     
      <TeamSection />
      <CtaSection />
      <Footer />
    </main>
  )
}
