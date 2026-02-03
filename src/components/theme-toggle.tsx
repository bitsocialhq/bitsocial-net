import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState, useRef } from "react"

import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
    // Blur on mobile to remove persistent focus outline
    requestAnimationFrame(() => {
      buttonRef.current?.blur()
    })
  }

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="h-9 w-9 focus:bg-transparent active:bg-transparent">
        <Sun className="h-4 w-4 text-muted-foreground" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  return (
    <Button ref={buttonRef} variant="ghost" size="icon" className="h-9 w-9 focus:bg-transparent active:bg-transparent" onClick={toggleTheme}>
      <Sun className="h-4 w-4 text-muted-foreground rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 text-muted-foreground rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
