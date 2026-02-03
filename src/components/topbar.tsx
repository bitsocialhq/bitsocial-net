import { useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { ThemeToggle } from "./theme-toggle"
import HamburgerButton from "./hamburger-button"
import LanguageSelector from "./language-selector"
import MobileMenu from "./mobile-menu"

function NavLink({ to, href, children, onClick, className: extraClassName }: { to?: string; href?: string; children: React.ReactNode; onClick?: () => void; className?: string }) {
  const baseClassName = "text-muted-foreground hover:text-foreground transition-colors relative group text-sm md:text-base font-display py-2 block"
  const className = extraClassName ? `${baseClassName} ${extraClassName}` : baseClassName
  const content = (
    <>
      {children}
      <span className="absolute bottom-0 left-0 w-0 h-px bg-blue-glow group-hover:w-full transition-all duration-300" />
    </>
  )

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        onClick={onClick}
      >
        {content}
      </a>
    )
  }

  if (to) {
    return (
      <Link to={to} className={className} onClick={onClick}>
        {content}
      </Link>
    )
  }

  return (
    <button className={className} onClick={onClick}>
      {content}
    </button>
  )
}

export default function Topbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [menuHeight, setMenuHeight] = useState(0)

  const handleNavClick = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 bg-card backdrop-blur-md border-b border-border"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-2 flex items-center justify-between relative">
          <Link to="/" className="flex items-center gap-1 group">
            <img src="/logo-small.png" alt="Bitsocial" className="h-8 w-8" />
            <span className="text-xl font-display font-regular text-muted-foreground">
              Bitsocial
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4 md:gap-8">
            <NavLink to="#" onClick={handleNavClick}>
              About
            </NavLink>
            <NavLink to="#" onClick={handleNavClick}>
              Blog
            </NavLink>
            <NavLink to="/docs" onClick={handleNavClick}>
              Docs
            </NavLink>
            <LanguageSelector />
            <ThemeToggle />
            <NavLink href="https://github.com/bitsocialhq" onClick={handleNavClick}>
              GitHub
            </NavLink>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <HamburgerButton
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </div>
        </div>
        
        {/* Mobile Menu - positioned absolutely below topbar */}
        <MobileMenu isOpen={isMobileMenuOpen} onHeightChange={setMenuHeight}>
          <NavLink to="#" onClick={handleNavClick} className="text-base">
            About
          </NavLink>
          <NavLink to="#" onClick={handleNavClick} className="text-base">
            Blog
          </NavLink>
          <NavLink to="/docs" onClick={handleNavClick} className="text-base">
            Docs
          </NavLink>
          <div className="flex items-center gap-4 py-2 border-t border-border pt-4 mt-2">
            <span className="text-sm text-muted-foreground font-display">Language</span>
            <LanguageSelector />
          </div>
          <div className="flex items-center gap-4 py-2 border-t border-border pt-4">
            <span className="text-sm text-muted-foreground font-display">Theme</span>
            <ThemeToggle />
          </div>
          <NavLink href="https://github.com/bitsocialhq" onClick={handleNavClick} className="text-base border-t border-border pt-4 mt-2">
            GitHub
          </NavLink>
        </MobileMenu>
      </motion.nav>
      {/* Spacer to push content down when menu is open */}
      <motion.div
        animate={{ height: menuHeight }}
        transition={{
          duration: 0.3,
          ease: [0.4, 0, 0.2, 1],
        }}
        className="md:hidden"
        aria-hidden="true"
      />
    </>
  )
}
