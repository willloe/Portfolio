import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface Particle {
  id: number
  x: number
  y: number
  size: number
  color: string
  speed: number
  direction: number
}

interface ParticleSystemProps {
  particleCount?: number
  className?: string
}

export function ParticleSystem({
  particleCount = 50,
  className = '',
}: ParticleSystemProps) {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    const colors = ['#06b6d4', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b']
    const newParticles: Particle[] = []

    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: Math.random() * 0.5 + 0.1,
        direction: Math.random() * 360,
      })
    }

    setParticles(newParticles)
  }, [particleCount])

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            opacity: 0.6,
          }}
          animate={{
            x: [0, Math.cos(particle.direction) * 50],
            y: [0, Math.sin(particle.direction) * 50],
            opacity: [0.6, 0.1, 0.6],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: 'linear',
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  )
}
