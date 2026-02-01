import { useRef, useLayoutEffect, useState, useEffect } from "react"
import * as THREE from "three"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

// Create a 3D ring with rectangular cross-section (like the logo)
function createMetallicRing(
  radius: number,
  tubeWidth: number,
  tubeHeight: number,
  segments: number,
): THREE.BufferGeometry {
  const positions: number[] = []
  const normals: number[] = []
  const indices: number[] = []

  // Create ring by extruding a rectangle along a circular path
  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * Math.PI * 2

    // Center of the ring at this angle
    const cx = Math.cos(angle) * radius
    const cz = Math.sin(angle) * radius

    // Radial direction (pointing outward from center)
    const rx = Math.cos(angle)
    const rz = Math.sin(angle)

    // Four corners of the rectangular cross-section
    // Inner-bottom, outer-bottom, outer-top, inner-top
    const halfW = tubeWidth / 2
    const halfH = tubeHeight / 2

    // Positions for the 4 corners at this segment
    const innerBottom = [cx - rx * halfW, -halfH, cz - rz * halfW]
    const outerBottom = [cx + rx * halfW, -halfH, cz + rz * halfW]
    const outerTop = [cx + rx * halfW, halfH, cz + rz * halfW]
    const innerTop = [cx - rx * halfW, halfH, cz - rz * halfW]

    positions.push(...innerBottom, ...outerBottom, ...outerTop, ...innerTop)

    // Normals for each face
    // Bottom face normals (pointing down)
    // Top face normals (pointing up)
    // Inner face normals (pointing inward)
    // Outer face normals (pointing outward)
    normals.push(
      -rx,
      -0.5,
      -rz, // inner-bottom: blend of inner and bottom
      rx,
      -0.5,
      rz, // outer-bottom: blend of outer and bottom
      rx,
      0.5,
      rz, // outer-top: blend of outer and top
      -rx,
      0.5,
      -rz, // inner-top: blend of inner and top
    )
  }

  // Create faces connecting each segment to the next
  for (let i = 0; i < segments; i++) {
    const curr = i * 4
    const next = ((i + 1) % (segments + 1)) * 4

    // Bottom face (innerBottom -> outerBottom)
    indices.push(curr + 0, next + 0, next + 1)
    indices.push(curr + 0, next + 1, curr + 1)

    // Outer face (outerBottom -> outerTop)
    indices.push(curr + 1, next + 1, next + 2)
    indices.push(curr + 1, next + 2, curr + 2)

    // Top face (outerTop -> innerTop)
    indices.push(curr + 2, next + 2, next + 3)
    indices.push(curr + 2, next + 3, curr + 3)

    // Inner face (innerTop -> innerBottom)
    indices.push(curr + 3, next + 3, next + 0)
    indices.push(curr + 3, next + 0, curr + 0)
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3),
  )
  geometry.setAttribute("normal", new THREE.Float32BufferAttribute(normals, 3))
  geometry.setIndex(indices)
  geometry.computeVertexNormals()

  return geometry
}

export default function PlanetGraphic() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isMobile, setIsMobile] = useState(false)

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

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return

    const canvas = canvasRef.current
    const container = containerRef.current

    // Scene setup
    const scene = new THREE.Scene()
    // Adjust FOV and camera position for mobile to show more of the scene
    const fov = isMobile ? 55 : 45 // Wider FOV on mobile for more visibility
    const cameraZ = isMobile ? 18 : 14 // Further back on mobile to zoom out
    const camera = new THREE.PerspectiveCamera(
      fov,
      container.clientWidth / container.clientHeight,
      0.1,
      100,
    )
    camera.position.set(0, 1, cameraZ)
    camera.lookAt(0, -2, 0)

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: !isMobile,
    })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    // Lights for metallic reflections
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2)
    scene.add(ambientLight)

    // Key light (main light from top-right)
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.0)
    keyLight.position.set(5, 8, 10)
    scene.add(keyLight)

    // Fill light (softer, from left)
    const fillLight = new THREE.DirectionalLight(0x8899aa, 0.5)
    fillLight.position.set(-8, 2, 5)
    scene.add(fillLight)

    // Rim light (from behind for edge highlights)
    const rimLight = new THREE.DirectionalLight(0xffffff, 0.4)
    rimLight.position.set(0, -5, -10)
    scene.add(rimLight)

    // Top light for sphere gradient
    const topLight = new THREE.DirectionalLight(0x4a90d9, 0.7)
    topLight.position.set(0, 15, 5)
    scene.add(topLight)

    // Large planet sphere - BIGGER
    const sphereRadius = 7
    const sphereY = -5 // Position lower so it's partially cut off at bottom
    const sphereGeometry = new THREE.SphereGeometry(sphereRadius, 128, 128)

    // Custom shader for gradient effect (bright blue on top, darker on bottom)
    const sphereMaterial = new THREE.ShaderMaterial({
      uniforms: {
        topColor: { value: new THREE.Color(0x1e4fd0) }, // Slightly darker blue
        bottomColor: { value: new THREE.Color(0x0a2440) }, // Darker blue
        glowColor: { value: new THREE.Color(0x2d6ae0) }, // Softer edge glow
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying vec2 vUv;
        
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = position;
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 topColor;
        uniform vec3 bottomColor;
        uniform vec3 glowColor;
        
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying vec2 vUv;
        
        void main() {
          // Gradient from top to bottom
          float gradientFactor = (vPosition.y + 7.0) / 14.0;
          gradientFactor = clamp(gradientFactor, 0.0, 1.0);
          
          vec3 baseColor = mix(bottomColor, topColor, gradientFactor);
          
          // Fresnel effect for subtle edge glow
          vec3 viewDirection = normalize(cameraPosition - vPosition);
          float fresnel = pow(1.0 - abs(dot(vNormal, viewDirection)), 2.0);
          
          vec3 finalColor = mix(baseColor, glowColor, fresnel * 0.3);
          
          gl_FragColor = vec4(finalColor, 1.0);
        }
      `,
    })

    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
    sphere.position.set(0, sphereY, 0)
    scene.add(sphere)

    // Ring parameters - closer to the sphere like the logo
    const ringRadius = 8.2 // Closer to sphere (sphere is 7 radius)
    const tubeWidth = 0.3 // Width of the rectangular cross-section
    const tubeHeight = 0.1 // Height (thickness) of the ring

    // Metallic material for rings (silver/chrome look)
    const ringMaterial = new THREE.MeshStandardMaterial({
      color: 0xb0b0b0,
      metalness: 0.95,
      roughness: 0.12,
      envMapIntensity: 0.9,
    })

    // Create an environment map for reflections
    const envMapSize = 64
    const envMapCanvas = document.createElement("canvas")
    envMapCanvas.width = envMapSize
    envMapCanvas.height = envMapSize
    const envCtx = envMapCanvas.getContext("2d")!
    const gradient = envCtx.createLinearGradient(0, 0, 0, envMapSize)
    gradient.addColorStop(0, "#778899")
    gradient.addColorStop(0.4, "#ffffff")
    gradient.addColorStop(0.6, "#ffffff")
    gradient.addColorStop(1, "#334455")
    envCtx.fillStyle = gradient
    envCtx.fillRect(0, 0, envMapSize, envMapSize)
    const envTexture = new THREE.CanvasTexture(envMapCanvas)
    envTexture.mapping = THREE.EquirectangularReflectionMapping
    ringMaterial.envMap = envTexture

    // ============================================
    // RING CONFIGURATION
    // ============================================
    // Adjust these values to change ring positions and tilts
    //
    // Rotation angles (in radians):
    // - RotX: Tilt forward/backward (0 = horizontal, PI/2 = vertical)
    // - RotY: Rotate around Y-axis (affects starting angle)
    // - RotZ: Sideways tilt (roll)
    //
    // Position offsets (relative to sphere center):
    // - X: left (-) / right (+)
    // - Y: down (-) / up (+)  
    // - Z: back (-) / forward (+)

    // Ring 1 Configuration (upper arc - tilted forward over the planet)
    const ring1RotX = Math.PI * 0.79 // Forward/backward tilt
    const ring1RotY = -0.3 // Rotation around Y-axis (affects start position)
    const ring1RotZ = 0.15 // Sideways tilt
    const ring1PosX = -0.5 // Horizontal offset
    const ring1PosY = -0.5 // Vertical offset (0 = same as sphere center)
    const ring1PosZ = 1 // Depth offset

    // Ring 2 Configuration (diagonal sweep - upper right to lower left)
    const ring2RotX = Math.PI * 0.77 // Forward/backward tilt (more vertical)
    const ring2RotY = -0.35 // Rotation around Y-axis (affects start position)
    const ring2RotZ = -1.1 // Sideways tilt (leaning right)
    const ring2PosX = 1 // Horizontal offset
    const ring2PosY = 1 // Vertical offset (0 = same as sphere center)
    const ring2PosZ = 1 // Depth offset

    // ============================================

    const ring1Geometry = createMetallicRing(
      ringRadius,
      tubeWidth,
      tubeHeight,
      128,
    )
    const ring1 = new THREE.Mesh(ring1Geometry, ringMaterial)
    ring1.rotation.set(ring1RotX, ring1RotY, ring1RotZ)
    ring1.position.set(ring1PosX, sphereY + ring1PosY, ring1PosZ)
    scene.add(ring1)

    const ring2Geometry = createMetallicRing(
      ringRadius,
      tubeWidth,
      tubeHeight,
      128,
    )
    const ring2Material = ringMaterial.clone()
    const ring2 = new THREE.Mesh(ring2Geometry, ring2Material)
    ring2.rotation.set(ring2RotX, ring2RotY, ring2RotZ)
    ring2.position.set(ring2PosX, sphereY + ring2PosY, ring2PosZ)
    scene.add(ring2)

    // Animation
    let animationId: number

    const animate = () => {
      animationId = requestAnimationFrame(animate)

      // Very slow rotation of the sphere
      sphere.rotation.y += 0.0005

      renderer.render(scene, camera)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      if (!container) return
      const width = container.clientWidth
      const height = container.clientHeight
      const isMobileNow = width < 768 || (navigator.hardwareConcurrency || 4) < 4
      const fov = isMobileNow ? 55 : 45
      const cameraZ = isMobileNow ? 18 : 14
      
      camera.fov = fov
      camera.aspect = width / height
      camera.position.z = cameraZ
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", handleResize)

      sphereGeometry.dispose()
      sphereMaterial.dispose()
      ring1Geometry.dispose()
      ring2Geometry.dispose()
      ringMaterial.dispose()
      envTexture.dispose()

      renderer.dispose()
    }
  }, [isMobile])

  // GSAP scroll parallax
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
            start: "top 30%",
            end: "top 20%",
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
      className="w-screen h-[60vh] md:h-[80vh] relative pointer-events-none left-1/2 -translate-x-1/2 overflow-hidden"
      style={{ marginTop: "-2rem" }}
    >
      <canvas ref={canvasRef} className="w-full h-full" />
      {/* Bottom fade gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 md:h-40 bg-gradient-to-t from-bg-primary via-bg-primary/80 to-transparent pointer-events-none" />
    </div>
  )
}
