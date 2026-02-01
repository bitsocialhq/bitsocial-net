import Topbar from "../components/topbar"
import Hero from "../components/hero"
import Features from "../components/features"
import Roadmap from "../components/roadmap"
import Footer from "../components/footer"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Topbar />
      <Hero />
      <Features />
      <Roadmap />
      <Footer />
    </div>
  )
}
