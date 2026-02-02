import Topbar from "../components/topbar"
import Footer from "../components/footer"

export default function Docs() {
  return (
    <div className="min-h-screen">
      <Topbar />
      <main className="pt-24 px-6 pb-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-display font-bold mb-8 chrome-text">
            Documentation
          </h1>
          <div className="glass-card p-8">
            <p className="text-muted-foreground leading-relaxed mb-4">
              Welcome to the Bitsocial documentation. This section will contain
              comprehensive guides, API references, and tutorials for building
              on the Bitsocial protocol.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Documentation is currently under development. Check back soon for
              updates!
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
