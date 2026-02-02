import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import PlanetGraphic from "./planet-graphic"
import MeshGraphic from "./mesh-graphic"

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-start pt-28 md:pt-40 px-6 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="max-w-3xl text-center mb-12 px-4 relative z-10"
      >
        <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground leading-relaxed font-display font-normal">
          Bitsocial is an open-source peer-to-peer network for social apps,
          with no servers, no global bans, where users and communities are
          cryptographic property.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="flex flex-col sm:flex-row gap-4 relative z-10"
      >
        <Link
          to="/docs"
          className="px-8 py-3 border border-border bg-card/50 backdrop-blur-md text-foreground font-display font-semibold hover:border-blue-glow ring-glow transition-all duration-300"
        >
          Read Docs
        </Link>
        <Link
          to="/apps"
          className="px-8 py-3 border border-blue-core bg-blue-core/20 backdrop-blur-md text-foreground font-display font-semibold hover:bg-blue-core/30 hover:border-blue-glow ring-glow transition-all duration-300"
        >
          Browse Apps
        </Link>
      </motion.div>

      {/* Planet and Mesh container - mesh behind planet */}
      <div className="w-full mt-4 md:mt-6 relative">
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
          className="relative z-10"
        >
          <PlanetGraphic />
        </motion.div>
      </div>
    </section>
  )
}
