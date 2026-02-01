import { useState, useEffect } from "react"

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return isMobile
}

export function usePerformanceMode() {
  const [performanceMode, setPerformanceMode] =
    useState<"high" | "medium" | "low">("high")

  useEffect(() => {
    if (typeof window === "undefined") return

    const checkPerformance = () => {
      const isMobile = window.innerWidth < 768
      const hardwareConcurrency = navigator.hardwareConcurrency || 4
      const isLowEnd = hardwareConcurrency < 4 || isMobile

      if (isLowEnd) {
        setPerformanceMode("low")
      } else if (hardwareConcurrency < 8) {
        setPerformanceMode("medium")
      } else {
        setPerformanceMode("high")
      }
    }

    checkPerformance()
    window.addEventListener("resize", checkPerformance)
    return () => window.removeEventListener("resize", checkPerformance)
  }, [])

  return performanceMode
}
