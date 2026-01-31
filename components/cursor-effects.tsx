'use client'

import { useEffect, useState } from 'react'

export default function CursorEffects() {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; opacity: number }>>([])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    let particleId = 0
    let animationFrameId: number

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })

      // Add particle trail
      const newParticle = {
        id: particleId++,
        x: e.clientX,
        y: e.clientY,
        opacity: 1,
      }

      setParticles((prev) => [...prev.slice(-15), newParticle])
    }

    const animate = () => {
      setParticles((prev) =>
        prev
          .map((p) => ({ ...p, opacity: p.opacity - 0.05 }))
          .filter((p) => p.opacity > 0)
      )
      animationFrameId = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove)
    animationFrameId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <>
      {/* Cursor glow */}
      <div
        className="fixed w-8 h-8 rounded-full pointer-events-none z-50 mix-blend-screen"
        style={{
          left: mousePosition.x - 16,
          top: mousePosition.y - 16,
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.6) 0%, transparent 70%)',
          transition: 'transform 0.1s ease-out',
        }}
      />

      {/* Particle trail */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="fixed w-2 h-2 rounded-full pointer-events-none z-40"
          style={{
            left: particle.x - 4,
            top: particle.y - 4,
            opacity: particle.opacity,
            background: `radial-gradient(circle, rgba(236, 72, 153, ${particle.opacity}) 0%, transparent 70%)`,
          }}
        />
      ))}
    </>
  )
}
