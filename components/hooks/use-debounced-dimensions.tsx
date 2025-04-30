"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"

interface Dimensions {
  width: number
  height: number
}

export function useDimensions(ref: React.RefObject<HTMLElement>) {
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: 0,
    height: 0,
  })
  const resizeObserverRef = useRef<ResizeObserver | null>(null)
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const updateDimensions = () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current)
      }

      debounceTimeoutRef.current = setTimeout(() => {
        setDimensions({
          width: element.offsetWidth,
          height: element.offsetHeight,
        })
      }, 100)
    }

    // Initial measurement
    updateDimensions()

    // Set up ResizeObserver
    if (typeof ResizeObserver !== "undefined") {
      resizeObserverRef.current = new ResizeObserver(updateDimensions)
      resizeObserverRef.current.observe(element)
    } else {
      // Fallback for browsers that don't support ResizeObserver
      window.addEventListener("resize", updateDimensions)
    }

    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current)
      }

      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect()
      } else {
        window.removeEventListener("resize", updateDimensions)
      }
    }
  }, [ref])

  return dimensions
}
