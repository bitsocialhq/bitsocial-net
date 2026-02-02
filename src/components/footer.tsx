import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <footer className="border-t border-border py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-display font-semibold text-lg mb-4 chrome-text">
              Bitsocial
            </h3>
            <p className="text-muted-foreground text-sm">
              Open source P2P network for social apps.
            </p>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4 text-foreground">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/docs"
                  className="text-muted-foreground hover:text-blue-glow transition-colors text-sm"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  to="/apps"
                  className="text-muted-foreground hover:text-blue-glow transition-colors text-sm"
                >
                  Apps
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4 text-foreground">
              Connect
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com/bitsocialhq"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-blue-glow transition-colors text-sm font-display"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/bitsocialhq"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-blue-glow transition-colors text-sm"
                >
                  Twitter / X
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border text-center text-muted-foreground text-sm">
          <p className="font-display">Decentralize all social media</p>
          <p className="mt-2">© {new Date().getFullYear()} Bitsocial Labs</p>
        </div>
      </div>
    </footer>
  )
}
