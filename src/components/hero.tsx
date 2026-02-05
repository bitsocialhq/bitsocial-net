import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { Trans, useTranslation } from "react-i18next"
import PlanetGraphic from "./planet-graphic"
import MeshGraphic from "./mesh-graphic"
import { triggerFeatureGlow } from "@/lib/utils"

function handleTaglineClick(hash: string) {
  // Update URL instantly without triggering browser scroll
  window.history.replaceState(null, "", `#${hash}`)
  // Trigger glow effect (includes smooth scroll)
  triggerFeatureGlow(hash)
}

// Reusable clickable span for tagline links
function TaglineLink({
  hash,
  children,
}: {
  hash: string
  children?: React.ReactNode
}) {
  return (
    <span
      onClick={() => handleTaglineClick(hash)}
      className="cursor-pointer transition-all duration-300 hover:text-blue-glow relative"
      style={{
        filter: "drop-shadow(0 0 0 transparent)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.filter =
          "drop-shadow(0 0 12px rgba(37, 99, 235, 0.8))"
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.filter = "drop-shadow(0 0 0 transparent)"
      }}
    >
      {children}
    </span>
  )
}

export default function Hero() {
  const { t } = useTranslation()

  return (
    <section className="min-h-[100svh] md:min-h-screen flex flex-col items-center justify-start pt-28 md:pt-40 px-6 relative overflow-x-hidden overflow-y-visible">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: -20 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="max-w-3xl text-center mb-12 px-4 relative z-10"
      >
        <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground leading-relaxed font-display font-normal">
          <Trans
            i18nKey="hero.tagline"
            components={{
              openSource: <TaglineLink hash="open-source" />,
              p2p: <TaglineLink hash="peer-to-peer" />,
              socialApps: <TaglineLink hash="social-apps" />,
              noServers: <TaglineLink hash="no-servers" />,
              noBans: <TaglineLink hash="no-global-bans" />,
              crypto: <TaglineLink hash="cryptographic-property" />,
            }}
          />
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: -20 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="flex flex-col sm:flex-row gap-4 relative z-0"
      >
        <Link
          to="/docs"
          className="px-8 py-3 border border-border bg-card/50 backdrop-blur-md text-muted-foreground hover:text-foreground font-display font-semibold hover:border-blue-glow ring-glow transition-all duration-300"
        >
          {t("hero.readDocs")}
        </Link>
        <Link
          to="/apps"
          className="px-8 py-3 border border-blue-core bg-blue-core/20 backdrop-blur-md text-muted-foreground hover:text-foreground font-display font-semibold hover:bg-blue-core/30 hover:border-blue-glow ring-glow transition-all duration-300"
        >
          {t("hero.exploreApps")}
        </Link>
      </motion.div>

      {/* Planet and Mesh container - mesh behind planet */}
      <div className="mt-4 md:mt-6 relative -mx-6 w-[calc(100%+3rem)] pointer-events-none overscroll-none touch-pan-y">
        {/* P2P Mesh Network - behind the planet */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1.2 }}
          className="absolute inset-0 z-0"
        >
          <MeshGraphic />
        </motion.div>

        {/* Planet animation with parallax scroll */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="relative z-30 pt-24 -mt-24 pointer-events-none"
        >
          <PlanetGraphic />
        </motion.div>
      </div>

      {/* Bottom fade gradient - seamless transition to next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 md:h-96 pointer-events-none z-40"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, hsl(var(--background) / 0.3) 30%, hsl(var(--background) / 0.7) 60%, hsl(var(--background)) 85%, hsl(var(--background)) 100%)",
        }}
      />
    </section>
  )
}
