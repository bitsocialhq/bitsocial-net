import { useRef, useEffect, useState, useLayoutEffect } from "react"
import * as THREE from "three"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useTheme } from "next-themes"

gsap.registerPlugin(ScrollTrigger)

interface Node {
  position: THREE.Vector3
  velocity: THREE.Vector3
  basePosition: THREE.Vector3
}

export default function MeshGraphic() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    const checkMobile = () => {
      const width = window.innerWidth
      const hardwareConcurrency = navigator.hardwareConcurrency || 4
      setIsMobile(width < 768 || hardwareConcurrency < 4)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Debounced resize handler to trigger scene rebuild
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>

    const updateDimensions = () => {
      if (!containerRef.current) return
      setDimensions({
        width: containerRef.current.clientWidth,
        height: containerRef.current.clientHeight,
      })
    }

    const handleResize = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(updateDimensions, 250)
    }

    // Set initial dimensions
    updateDimensions()

    window.addEventListener("resize", handleResize)
    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return

    const canvas = canvasRef.current
    const container = containerRef.current

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      50,
      container.clientWidth / container.clientHeight,
      0.1,
      1000,
    )
    // Shift camera up to create empty space at top of canvas (nodes won't be cut off)
    // Mobile needs more offset to prevent clipping, desktop needs less to show more mesh
    const cameraYOffset = isMobile ? 4 : 0
    camera.position.set(0, cameraYOffset, 30)
    camera.lookAt(0, cameraYOffset, 0)

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: !isMobile,
    })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    // Mesh color - adapts to theme
    // Light mode: darker color for visibility, Dark mode: brighter color
    const isDark = resolvedTheme === "dark" || (!resolvedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)
    const meshColorHex = isDark ? 0xffffff : 0x4b5563 // white for dark mode (brighter), gray-600 for light
    const meshColor = new THREE.Color(meshColorHex)
    
    // Brightness multipliers - higher in dark mode
    const nodeAlphaMultiplier = isDark ? 0.35 : 0.2
    const lineAlphaMultiplier = isDark ? 0.9 : 0.7 // Increased for better contrast

    // Calculate visible frustum dimensions at z=0 (where nodes are placed)
    const fov = 50
    const cameraZ = 30
    const visibleHeight = 2 * Math.tan((fov * Math.PI) / 360) * cameraZ
    const aspectRatio = container.clientWidth / container.clientHeight
    const visibleWidth = visibleHeight * aspectRatio

    // Node parameters - 1px thin circles (same size on mobile and desktop)
    const nodeCount = isMobile ? 150 : 300
    const connectionDistance = 5
    const nodeSize = 0.05 // Smaller node radius

    // Create nodes evenly distributed across entire U-shape area
    const nodes: Node[] = []

    // U-shape parameters - dynamically extend to screen edges
    const uWidth = visibleWidth + 8 // Extend past visible edges
    const uDepth = 8 // Depth variation for parallax
    const bottomY = -10 // Bottom of the U (behind planet)
    const topY = isMobile ? 14 : 10 // Extended upward for more height

    // Distribute nodes uniformly across entire space using grid-like distribution with jitter
    const gridCols = Math.ceil(Math.sqrt(nodeCount * (uWidth / (topY - bottomY))))
    const gridRows = Math.ceil(nodeCount / gridCols)
    
    for (let i = 0; i < nodeCount; i++) {
      let x: number, y: number, z: number
      
      // Use grid-based distribution for even spacing
      const col = i % gridCols
      const row = Math.floor(i / gridCols)
      
      // Base grid position
      const baseX = -uWidth / 2 + (col / (gridCols - 1 || 1)) * uWidth
      const baseY = bottomY + (row / (gridRows - 1 || 1)) * (topY - bottomY)
      
      // Add jitter to avoid perfect grid
      const jitterX = (Math.random() - 0.5) * (uWidth / gridCols) * 0.8
      const jitterY = (Math.random() - 0.5) * ((topY - bottomY) / gridRows) * 0.8
      
      x = baseX + jitterX
      y = baseY + jitterY
      
      // Add some depth variation
      z = -3 + (Math.random() - 0.5) * uDepth
      
      // For nodes near bottom, push them back further (behind planet)
      if (y < bottomY + 2) {
        z = -5 + (Math.random() - 0.5) * 4
      }

      const position = new THREE.Vector3(x, y, z)
      nodes.push({
        position: position.clone(),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01,
        ),
        basePosition: position.clone(),
      })
    }

    // Create point geometry for nodes
    const pointsGeometry = new THREE.BufferGeometry()
    const pointPositions = new Float32Array(nodeCount * 3)

    for (let i = 0; i < nodeCount; i++) {
      pointPositions[i * 3] = nodes[i].position.x
      pointPositions[i * 3 + 1] = nodes[i].position.y
      pointPositions[i * 3 + 2] = nodes[i].position.z
    }

    pointsGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(pointPositions, 3),
    )

    // Custom shader for hollow circle nodes with center dot
    const pointsMaterial = new THREE.ShaderMaterial({
      uniforms: {
        color: { value: meshColor },
        size: { value: nodeSize * 100 },
        alphaMultiplier: { value: nodeAlphaMultiplier },
      },
      vertexShader: `
        uniform float size;
        void main() {
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        uniform float alphaMultiplier;
        void main() {
          vec2 center = gl_PointCoord - vec2(0.5);
          float dist = length(center);
          float edge = fwidth(dist) * 1.5; // Adaptive AA
          
          // Center dot (filled)
          float dotRadius = 0.12; // Small radius for center dot
          float dotAlpha = 1.0 - smoothstep(dotRadius - edge, dotRadius, dist);
          
          // Hollow ring
          float outerRadius = 0.5;
          float ringWidth = 0.08; // Thin ring
          float innerRadius = outerRadius - ringWidth;
          float outerAlpha = 1.0 - smoothstep(outerRadius - edge, outerRadius, dist);
          float innerAlpha = smoothstep(innerRadius - edge, innerRadius, dist);
          float ringAlpha = outerAlpha * innerAlpha;
          
          // Combine dot and ring
          float alpha = max(dotAlpha, ringAlpha);
          if (alpha < 0.01) discard;
          gl_FragColor = vec4(color, alpha * alphaMultiplier);
        }
      `,
      transparent: true,
      depthWrite: false,
    })

    const points = new THREE.Points(pointsGeometry, pointsMaterial)
    scene.add(points)

    // Create lines geometry for connections
    const maxConnections = nodeCount * 6 // Max lines
    const linePositions = new Float32Array(maxConnections * 6) // 2 points per line, 3 coords each
    const lineAlphas = new Float32Array(maxConnections * 2)

    const linesGeometry = new THREE.BufferGeometry()
    linesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(linePositions, 3),
    )
    linesGeometry.setAttribute(
      "alpha",
      new THREE.BufferAttribute(lineAlphas, 1),
    )

    // Custom shader for fading lines
    const linesMaterial = new THREE.ShaderMaterial({
      uniforms: {
        color: { value: meshColor },
        alphaMultiplier: { value: lineAlphaMultiplier },
      },
      vertexShader: `
        attribute float alpha;
        varying float vAlpha;
        void main() {
          vAlpha = alpha;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        uniform float alphaMultiplier;
        varying float vAlpha;
        void main() {
          gl_FragColor = vec4(color, vAlpha * alphaMultiplier);
        }
      `,
      transparent: true,
      depthWrite: false,
    })

    const lines = new THREE.LineSegments(linesGeometry, linesMaterial)
    scene.add(lines)

    // Animation
    let animationId: number
    let time = 0

    const updateConnections = () => {
      let lineIndex = 0
      const positions = linesGeometry.attributes.position.array as Float32Array
      const alphas = linesGeometry.attributes.alpha.array as Float32Array

      for (let i = 0; i < nodeCount; i++) {
        for (let j = i + 1; j < nodeCount; j++) {
          const dist = nodes[i].position.distanceTo(nodes[j].position)

          if (dist < connectionDistance && lineIndex < maxConnections) {
            const idx = lineIndex * 6
            const alphaIdx = lineIndex * 2

            positions[idx] = nodes[i].position.x
            positions[idx + 1] = nodes[i].position.y
            positions[idx + 2] = nodes[i].position.z
            positions[idx + 3] = nodes[j].position.x
            positions[idx + 4] = nodes[j].position.y
            positions[idx + 5] = nodes[j].position.z

            const alpha = 1 - dist / connectionDistance
            alphas[alphaIdx] = alpha
            alphas[alphaIdx + 1] = alpha

            lineIndex++
          }
        }
      }

      // Clear remaining lines
      for (let i = lineIndex; i < maxConnections; i++) {
        const idx = i * 6
        const alphaIdx = i * 2
        positions[idx] = 0
        positions[idx + 1] = 0
        positions[idx + 2] = 0
        positions[idx + 3] = 0
        positions[idx + 4] = 0
        positions[idx + 5] = 0
        alphas[alphaIdx] = 0
        alphas[alphaIdx + 1] = 0
      }

      linesGeometry.attributes.position.needsUpdate = true
      linesGeometry.attributes.alpha.needsUpdate = true
    }

    const animate = () => {
      animationId = requestAnimationFrame(animate)
      time += 0.005

      // Update node positions with subtle floating motion
      const positionAttr = pointsGeometry.attributes.position
      const pointPosArray = positionAttr.array as Float32Array

      for (let i = 0; i < nodeCount; i++) {
        const node = nodes[i]

        // Gentle floating animation
        const offsetX = Math.sin(time + i * 0.5) * 0.15
        const offsetY = Math.cos(time * 0.8 + i * 0.3) * 0.15
        const offsetZ = Math.sin(time * 0.6 + i * 0.7) * 0.1

        node.position.x = node.basePosition.x + offsetX
        node.position.y = node.basePosition.y + offsetY
        node.position.z = node.basePosition.z + offsetZ

        pointPosArray[i * 3] = node.position.x
        pointPosArray[i * 3 + 1] = node.position.y
        pointPosArray[i * 3 + 2] = node.position.z
      }

      positionAttr.needsUpdate = true
      updateConnections()

      renderer.render(scene, camera)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      if (!container) return
      const width = container.clientWidth
      const height = container.clientHeight

      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", handleResize)

      pointsGeometry.dispose()
      pointsMaterial.dispose()
      linesGeometry.dispose()
      linesMaterial.dispose()
      renderer.dispose()
    }
  }, [isMobile, resolvedTheme, dimensions.width, dimensions.height])

  // GSAP scroll parallax - same as planet graphic
  useLayoutEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        {
          y: 0,
          opacity: 1,
        },
        {
          y: "30vh",
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 40%",
            end: "top 10%",
            scrub: 1,
          },
        },
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={containerRef}
      className="h-[65vh] md:h-[70vh] absolute inset-x-0 pointer-events-none overflow-hidden"
      style={{ top: "-5vh" }}
    >
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}
