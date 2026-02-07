import Topbar from "../components/topbar"
import Footer from "../components/footer"

export default function Status() {
  return (
    <div className="min-h-screen">
      <Topbar />
      <main className="pt-24 px-6 pb-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-display font-bold mb-8 chrome-text">
            Network Status
          </h1>
          <div className="glass-card p-8">
            <p className="text-muted-foreground leading-relaxed mb-4">
              The Bitsocial network status dashboard will provide real-time
              monitoring of peers, communities, and relay health across the
              decentralized network.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Status monitoring is currently under development. Check back soon!
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
