import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <footer className="border-t border-silver-dark py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-display font-semibold text-lg mb-4 chrome-text">
              Bitsocial
            </h3>
            <p className="text-silver-mid text-sm">
              Open source P2P social media protocol.
            </p>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4 text-silver-bright">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/docs"
                  className="text-silver-mid hover:text-blue-glow transition-colors text-sm"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  to="/apps"
                  className="text-silver-mid hover:text-blue-glow transition-colors text-sm"
                >
                  Apps
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4 text-silver-bright">
              Connect
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com/bitsocialhq"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-silver-mid hover:text-blue-glow transition-colors text-sm font-display"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/bitsocialhq"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-silver-mid hover:text-blue-glow transition-colors text-sm"
                >
                  Twitter / X
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-silver-dark text-center text-silver-mid text-sm">
          <p className="font-display">Decentralize all social media</p>
          <p className="mt-2">
            © {new Date().getFullYear()} Bitsocial Labs
          </p>
        </div>
      </div>
    </footer>
  )
}
