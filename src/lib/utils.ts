import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const glowTimeouts = new WeakMap<Element, ReturnType<typeof setTimeout>>()

/**
 * Triggers a glow effect on the feature card corresponding to the hash.
 * Scrolls to the element and adds a temporary glow that eases in and out smoothly.
 */
export function triggerFeatureGlow(hash: string) {
  const element = document.getElementById(hash)
  if (element) {
    // Perform smooth scroll
    element.scrollIntoView({ behavior: "smooth", block: "center" })

    // Find the glass-card within the scrolled element and add glow effect
    const card = element.querySelector(".glass-card")
    if (card && card instanceof HTMLElement) {
      // Remove any existing glow class first
      card.classList.remove("highlight-glow")

      // Force reflow to ensure class removal is processed
      void card.offsetWidth

      // Add glow effect - animation handles the fade-out automatically
      card.classList.add("highlight-glow")

      // Clear any previous timeout so the glow doesn't end early
      const existingTimeout = glowTimeouts.get(card)
      if (existingTimeout) {
        clearTimeout(existingTimeout)
      }

      // Remove class after animation completes (5 seconds total)
      const timeoutId = setTimeout(() => {
        card.classList.remove("highlight-glow")
      }, 5000)

      glowTimeouts.set(card, timeoutId)
    }
  }
}
