import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import PlanetGraphic from "./planet-graphic"

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-start pt-28 md:pt-40 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="max-w-3xl text-center mb-12 px-4"
      >
        <p className="text-xl md:text-2xl lg:text-3xl text-silver-mid leading-relaxed font-display font-normal">
          Bitsocial is an open-source peer-to-peer protocol for social apps,
          with no servers, no global bans, where users and communities are
          cryptographic property.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <Link
          to="/docs"
          className="px-8 py-3 border border-silver-dark bg-bg-secondary/50 backdrop-blur-md text-silver-bright font-display font-semibold hover:border-blue-glow ring-glow transition-all duration-300"
        >
          Read Docs
        </Link>
        <Link
          to="/apps"
          className="px-8 py-3 border border-blue-core bg-blue-core/20 backdrop-blur-md text-silver-bright font-display font-semibold hover:bg-blue-core/30 hover:border-blue-glow ring-glow transition-all duration-300"
        >
          Browse Apps
        </Link>
      </motion.div>

      {/* Planet animation with parallax scroll */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="w-full mt-4 md:mt-6"
      >
        <PlanetGraphic />
      </motion.div>
    </section>
  )
}
