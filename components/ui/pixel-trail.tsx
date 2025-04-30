"use client"

import React, { useCallback, useMemo, useRef } from "react"
import { motion, useAnimationControls } from "framer-motion"

import { cn } from "@/lib/utils"
import { useDimensions } from "@/components/hooks/use-debounced-dimensions"

interface PixelTrailProps {
  pixelSize: number // px
  fadeDuration?: number // ms
  delay?: number // ms
  className?: string
  pixelClassName?: string
}

export function PixelTrail({
  pixelSize = 20,
  fadeDuration = 500,
  delay = 0,
  className,
  pixelClassName,
}: PixelTrailProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const dimensions = useDimensions(containerRef)
  const trailId = useRef(`trail-${Math.random().toString(36).substring(2, 9)}`)

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const x = Math.floor((e.clientX - rect.left) / pixelSize)
      const y = Math.floor((e.clientY - rect.top) / pixelSize)

      const pixelElement = document.getElementById(`${trailId.current}-pixel-${x}-${y}`)
      if (pixelElement) {
        const animatePixel = (pixelElement as any).__animatePixel
        if (animatePixel) animatePixel()
      }
    },
    [pixelSize],
  )

  const columns = useMemo(() => Math.ceil(dimensions.width / pixelSize), [dimensions.width, pixelSize])
  const rows = useMemo(() => Math.ceil(dimensions.height / pixelSize), [dimensions.height, pixelSize])

  return (
    <div
      ref={containerRef}
      className={cn("absolute inset-0 w-full h-full pointer-events-auto", className)}
      onMouseMove={handleMouseMove}
    >
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <PixelDot
              key={`${colIndex}-${rowIndex}`}
              id={`${trailId.current}-pixel-${colIndex}-${rowIndex}`}
              size={pixelSize}
              fadeDuration={fadeDuration}
              delay={delay}
              className={pixelClassName}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

interface PixelDotProps {
  id: string
  size: number
  fadeDuration: number
  delay: number
  className?: string
}

const PixelDot: React.FC<PixelDotProps> = React.memo(({ id, size, fadeDuration, delay, className }) => {
  const controls = useAnimationControls()

  const animatePixel = useCallback(() => {
    // Show immediately
    controls.set({ opacity: 1 })

    // Hide after delay without fading
    setTimeout(() => {
      controls.set({ opacity: 0 })
    }, delay)
  }, [controls, delay])

  // Attach the animatePixel function to the DOM element
  const ref = useCallback(
    (node: HTMLDivElement | null) => {
      if (node) {
        ;(node as any).__animatePixel = animatePixel
      }
    },
    [animatePixel],
  )

  return (
    <motion.div
      id={id}
      ref={ref}
      className={cn("cursor-pointer-none", className)}
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
      initial={{ opacity: 0 }}
      animate={controls}
      exit={{ opacity: 0 }}
    />
  )
})

PixelDot.displayName = "PixelDot"
