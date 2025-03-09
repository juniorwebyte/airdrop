"use client"

import { useEffect, useRef } from "react"
import confetti from "canvas-confetti"

interface ConfettiCelebrationProps {
  trigger: boolean
  duration?: number
}

export function ConfettiCelebration({ trigger, duration = 3000 }: ConfettiCelebrationProps) {
  const animationIdRef = useRef<number | null>(null)

  useEffect(() => {
    if (trigger) {
      const end = Date.now() + duration

      const frame = () => {
        confetti({
          particleCount: 200,
          spread: 70,
          origin: { y: 0.6 },
        })

        if (Date.now() < end) {
          animationIdRef.current = requestAnimationFrame(frame)
        }
      }

      animationIdRef.current = requestAnimationFrame(frame)
    }

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
    }
  }, [trigger, duration])

  return null // This component doesn't render anything
}

