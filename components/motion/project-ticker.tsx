"use client"

import { useEffect, useRef } from "react"
import { useInView, useMotionValue, useSpring } from "framer-motion"

export default function ProjectTicker({
  value,
  direction = "up",
  delay = 0,
  className,
}: {
  value: number
  direction?: "up" | "down"
  className?: string
  delay?: number // delay in s
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(0) // Initialize to 0
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  })
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  useEffect(() => {
    if (isInView) {
      motionValue.set(value)
    }
  }, [motionValue, isInView, value])

  useEffect(
    () =>
      springValue.on("change", (latest) => {
        if (ref.current) {
          ref.current.textContent = Intl.NumberFormat("en-US").format(
            latest.toFixed(0)
          )
        }
      }),
    [springValue]
  )

  return (
    <>
      {/* Set initial content of the span to 0 */}
      <span className="tabular-nums" ref={ref}>
        0
      </span>
    </>
  )
}
