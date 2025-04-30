"use client"

import { useEffect, useRef, useState } from "react"

interface Particle {
  x: number
  y: number
  size: number
  color: string
  speedX: number
  speedY: number
  life: number
  maxLife: number
  id: string
}

export default function PixelTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mousePositionRef = useRef({ x: 0, y: 0 })
  const animationFrameRef = useRef<number>(0)
  const [isClient, setIsClient] = useState(false)

  // Colors inspired by the impressionist painting
  const colors = [
    "#f87171", // red
    "#fbbf24", // yellow
    "#34d399", // green
    "#60a5fa", // blue
    "#c084fc", // purple
    "#f472b6", // pink
  ]

  useEffect(() => {
    setIsClient(true)
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas to full screen
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      mousePositionRef.current = { x: e.clientX, y: e.clientY }

      // Add new particles on mouse move
      for (let i = 0; i < 3; i++) {
        addParticle(e.clientX, e.clientY, Math.random() * 5 + 2, colors[Math.floor(Math.random() * colors.length)])
      }
    }

    // Track touch position
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0]
        mousePositionRef.current = { x: touch.clientX, y: touch.clientY }

        // Add new particles on touch move
        for (let i = 0; i < 3; i++) {
          addParticle(
            touch.clientX,
            touch.clientY,
            Math.random() * 5 + 2,
            colors[Math.floor(Math.random() * colors.length)],
          )
        }
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("touchmove", handleTouchMove, { passive: true })

    // Add a particle
    const addParticle = (x: number, y: number, size: number, color: string) => {
      particlesRef.current.push({
        x,
        y,
        size,
        color,
        speedX: Math.random() * 2 - 1,
        speedY: Math.random() * 2 - 1,
        life: 0,
        maxLife: Math.random() * 30 + 20,
        id: `${Date.now()}-${Math.random()}`,
      })
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particlesRef.current.forEach((particle, index) => {
        // Update position
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Update life
        particle.life++

        // Calculate opacity based on life
        const opacity = 1 - particle.life / particle.maxLife

        // Draw particle
        ctx.globalAlpha = opacity
        ctx.fillStyle = particle.color
        ctx.fillRect(particle.x - particle.size / 2, particle.y - particle.size / 2, particle.size, particle.size)
      })

      // Remove dead particles
      particlesRef.current = particlesRef.current.filter((particle) => particle.life < particle.maxLife)

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("touchmove", handleTouchMove)
      cancelAnimationFrame(animationFrameRef.current)
    }
  }, [])

  if (!isClient) return null

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-20" />
}
