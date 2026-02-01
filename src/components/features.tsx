import { motion } from "framer-motion"

const features = [
  {
    title: "P2P Architecture",
    description:
      "Decentralized peer-to-peer networking eliminates single points of failure and ensures true user autonomy.",
    icon: "🌐",
  },
  {
    title: "IPFS Storage",
    description:
      "Content stored on IPFS provides permanent, censorship-resistant data persistence across the network.",
    icon: "💾",
  },
  {
    title: "Anti-Spam Challenges",
    description:
      "Cryptographic challenges prevent spam and abuse without requiring centralized moderation or identity verification.",
    icon: "🛡️",
  },
  {
    title: "Cryptographic Ownership",
    description:
      "Users and communities are cryptographic property, giving true ownership and control over digital identity.",
    icon: "🔐",
  },
]

export default function Features() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-display font-bold text-center mb-16 chrome-text"
        >
          Core Features
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="glass-card p-6 hover:border-silver-mid/50 transition-all duration-300 group"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-display font-semibold mb-3 text-silver-bright group-hover:text-blue-glow transition-colors">
                {feature.title}
              </h3>
              <p className="text-silver-mid text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
