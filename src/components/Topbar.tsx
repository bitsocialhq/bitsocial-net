import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../assets/logo.png";

export default function Topbar() {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-silver-dark/20"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <motion.img
            src={logo}
            alt="Bitsocial"
            className="h-8 w-8 ring-glow"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400 }}
          />
          <span className="text-xl font-display font-bold chrome-text">Bitsocial</span>
        </Link>

        <div className="flex items-center gap-4 md:gap-8">
          <Link
            to="/docs"
            className="text-silver-mid hover:text-silver-bright transition-colors relative group text-sm md:text-base"
          >
            Docs
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-glow group-hover:w-full transition-all duration-300" />
          </Link>
          <Link
            to="/apps"
            className="text-silver-mid hover:text-silver-bright transition-colors relative group text-sm md:text-base"
          >
            Apps
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-glow group-hover:w-full transition-all duration-300" />
          </Link>
          <a
            href="https://github.com/bitsocial"
            target="_blank"
            rel="noopener noreferrer"
            className="text-silver-mid hover:text-silver-bright transition-colors text-sm md:text-base"
          >
            GitHub
          </a>
        </div>
      </div>
    </motion.nav>
  );
}
