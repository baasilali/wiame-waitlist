"use client"

import { useEffect, useState } from "react"

type ScreenSize = {
  width: number
  height: number
  lessThan: (breakpoint: string) => boolean
  greaterThan: (breakpoint: string) => boolean
}

const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
}

export function useScreenSize(): ScreenSize {
  const [size, setSize] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  })

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    // Set initial size
    handleResize()

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const lessThan = (breakpoint: string) => {
    const breakpointValue = breakpoints[breakpoint as keyof typeof breakpoints]
    return size.width < breakpointValue
  }

  const greaterThan = (breakpoint: string) => {
    const breakpointValue = breakpoints[breakpoint as keyof typeof breakpoints]
    return size.width > breakpointValue
  }

  return {
    ...size,
    lessThan,
    greaterThan,
  }
}
