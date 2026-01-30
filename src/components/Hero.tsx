import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center pt-24 px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="mb-8 ring-glow"
      >
        <motion.img
          src={logo}
          alt="Bitsocial Logo"
          className="h-48 w-48 md:h-64 md:w-64"
          animate={{
            boxShadow: [
              "0 0 20px rgba(37, 99, 235, 0.3)",
              "0 0 40px rgba(37, 99, 235, 0.6)",
              "0 0 20px rgba(37, 99, 235, 0.3)",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="max-w-3xl text-center mb-12 px-4"
      >
        <p className="text-base md:text-lg lg:text-xl text-silver-mid leading-relaxed">
          Bitsocial is an open-source peer-to-peer protocol for social apps, with no servers, no
          global bans, where users and communities are cryptographic property.
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
          className="px-8 py-3 rounded-lg border-2 border-silver-dark/50 bg-bg-secondary/50 backdrop-blur-md text-silver-bright font-display font-semibold hover:border-blue-glow hover:text-blue-glow ring-glow transition-all duration-300"
        >
          Learn More
        </Link>
        <Link
          to="/apps"
          className="px-8 py-3 rounded-lg border-2 border-blue-core bg-blue-core/20 backdrop-blur-md text-silver-bright font-display font-semibold hover:bg-blue-core/30 hover:border-blue-glow ring-glow transition-all duration-300"
        >
          Browse Apps
        </Link>
      </motion.div>
    </section>
  );
}
