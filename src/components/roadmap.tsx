import { motion } from "framer-motion"

const phases = [
  {
    phase: "Phase 1",
    title: "Protocol Core",
    description:
      "Development of the core P2P protocol, IPFS integration, and basic networking layer.",
  },
  {
    phase: "Phase 2",
    title: "Token Launch ($BSO)",
    description:
      "Launch of the Bitsocial token to incentivize network participation and governance.",
  },
  {
    phase: "Phase 3",
    title: "L2 on Ethereum",
    description:
      "Deployment of Layer 2 solution on Ethereum for enhanced scalability and interoperability.",
  },
  {
    phase: "Phase 4",
    title: "Stage 2 Decentralization",
    description:
      "Further decentralization of network infrastructure and governance mechanisms.",
  },
  {
    phase: "Phase 5",
    title: "Ecosystem Growth",
    description:
      "Expansion of the ecosystem with third-party apps, tools, and community-driven initiatives.",
  },
]

export default function Roadmap() {
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
          Roadmap
        </motion.h2>

        <div className="relative">
          {/* Timeline line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-blue-core via-blue-glow to-blue-core" />

          <div className="space-y-12">
            {phases.map((item, index) => (
              <motion.div
                key={item.phase}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className={`flex flex-col md:flex-row items-center gap-6 ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline dot */}
                <div className="relative z-10 flex-shrink-0">
                  <div className="w-4 h-4 bg-blue-core ring-4 ring-bg-primary border-2 border-blue-glow" />
                </div>

                {/* Content card */}
                <div className="flex-1 glass-card p-6 max-w-md">
                  <div className="text-sm text-blue-glow font-display font-semibold mb-2">
                    {item.phase}
                  </div>
                  <h3 className="text-2xl font-display font-bold mb-3 text-silver-bright">
                    {item.title}
                  </h3>
                  <p className="text-silver-mid leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
