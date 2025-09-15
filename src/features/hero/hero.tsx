import { motion, useScroll, useTransform } from 'framer-motion'
import { Download, ExternalLink, Sparkles, Zap, Code2 } from 'lucide-react'
import { Container } from '@/components/layout/container'
import {
  fadeInUp,
  staggerContainer,
  staggerItem,
  parallaxUp,
} from '@/lib/motion'
import { isReducedMotion } from '@/lib/utils'
import { Profile } from '@/lib/schemas'
import { useEffect, useRef, useState } from 'react'
import { ParticleSystem } from '@/components/effects/particle-system'

interface HeroProps {
  profile: Profile
}

export function Hero({ profile }: HeroProps) {
  const reducedMotion = isReducedMotion()
  const { scrollY } = useScroll()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef<HTMLElement>(null)

  // Parallax effects
  const y1 = useTransform(scrollY, [0, 500], [0, -150])
  const y2 = useTransform(scrollY, [0, 500], [0, -100])
  const y3 = useTransform(scrollY, [0, 500], [0, -200])

  // Center scroll position on load
  useEffect(() => {
    window.scrollTo(0, window.innerHeight / 2)
  }, [])

  // Mouse tracking for interactive elements
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect()
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const scrollToNext = () => {
    const aboutSection = document.querySelector('#about')
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      ref={heroRef}
      id="home"
      data-testid="hero-section"
      className="md:pt-34 relative flex min-h-screen scroll-mt-28 items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pb-24 pt-28 md:scroll-mt-40"
    >
      {/* Futuristic Background Grid */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />

        {/* Animated gradient orbs */}
        <motion.div
          style={{ y: y1 }}
          className="absolute left-1/4 top-1/4 h-96 w-96 animate-pulse-slow rounded-full bg-gradient-to-r from-cyan-400/20 to-blue-500/20 blur-3xl"
        />
        <motion.div
          style={{ y: y2 }}
          className="absolute bottom-1/4 right-1/4 h-[500px] w-[500px] animate-pulse-slow rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-3xl"
        />
        <motion.div
          style={{ y: y3 }}
          className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-gradient-to-r from-emerald-400/10 to-cyan-400/10 blur-3xl"
        />

        {/* Floating geometric shapes */}
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute right-20 top-20 h-32 w-32 rounded-lg border border-cyan-400/30"
        />
        <motion.div
          animate={{
            rotate: [360, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute bottom-32 left-20 h-24 w-24 rounded-full border border-purple-400/30"
        />
      </div>

      <Container size="lg" centered className="relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="space-y-12 text-center"
        >
          {/* Futuristic Avatar with Holographic Effect */}
          <motion.div variants={staggerItem} className="relative inline-block">
            <div className="group relative">
              {/* Holographic ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute -inset-4 rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 opacity-20 blur-sm"
              />

              {/* Main avatar container */}
              <motion.div
                variants={parallaxUp}
                className="relative h-40 w-40 overflow-hidden rounded-full border-2 border-cyan-400/50 bg-white/5 shadow-2xl backdrop-blur-sm md:h-48 md:w-48"
                style={{
                  transform: `perspective(1000px) rotateX(${mousePosition.y * 10 - 5}deg) rotateY(${mousePosition.x * 10 - 5}deg)`,
                }}
              >
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="h-full w-full object-cover"
                />

                {/* Glitch effect overlay */}
                <motion.div
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [1, 1.02, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 2,
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-500/20 mix-blend-overlay"
                />
              </motion.div>

              {/* Floating tech icons */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute -right-4 -top-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 shadow-lg"
              >
                <Code2 className="h-6 w-6 text-white" />
              </motion.div>

              <motion.div
                animate={{
                  y: [0, 10, 0],
                  rotate: [0, -5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1,
                }}
                className="absolute -bottom-4 -left-4 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg"
              >
                <Zap className="h-5 w-5 text-white" />
              </motion.div>
            </div>
          </motion.div>

          {/* Futuristic Typography */}
          <motion.div variants={staggerItem} className="space-y-6">
            <motion.div variants={fadeInUp} className="relative inline-block">
              <motion.p
                variants={fadeInUp}
                className="font-mono text-lg uppercase tracking-wider text-cyan-400 md:text-xl"
                animate={{
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                Hello, I'm
              </motion.p>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-6xl font-black tracking-tight md:text-7xl lg:text-8xl"
              style={{
                background:
                  'linear-gradient(45deg, #06b6d4, #8b5cf6, #ec4899, #06b6d4)',
                backgroundSize: '300% 300%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'gradient-x 3s ease infinite',
              }}
            >
              {profile.name}
            </motion.h1>

            <motion.div variants={fadeInUp} className="relative">
              <motion.h2
                variants={fadeInUp}
                className="text-2xl font-bold text-white/90 md:text-3xl lg:text-4xl"
              >
                {profile.role}
              </motion.h2>

              {/* Animated underline */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.5, delay: 0.5 }}
                className="mt-2 h-1 rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500"
              />
            </motion.div>
          </motion.div>

          {/* Futuristic Headline with Typewriter Effect */}
          <motion.div variants={staggerItem} className="mx-auto max-w-4xl">
            <motion.div
              variants={fadeInUp}
              className="text-xl font-light leading-relaxed text-white/80 md:text-2xl lg:text-3xl"
            >
              <span className="font-mono text-cyan-400">const</span> developer ={' '}
              {'{'}
              <br />
              <span className="ml-4 text-purple-400">passion:</span>{' '}
              <span className="text-pink-400">"{profile.headline}"</span>,
              <br />
              <span className="ml-4 text-purple-400">skills:</span>{' '}
              <span className="text-emerald-400">
                ["React", "TypeScript", "AI"]
              </span>
              ,
              <br />
              <span className="ml-4 text-purple-400">vision:</span>{' '}
              <span className="text-yellow-400">"Building the future"</span>
              <br />
              {'}'}
            </motion.div>
          </motion.div>

          {/* Location with animated icon */}
          <motion.div variants={staggerItem}>
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-3 rounded-full border border-cyan-400/30 bg-white/5 px-6 py-2 backdrop-blur-sm"
            >
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="h-2 w-2 rounded-full bg-cyan-400"
              />
              <span className="font-mono text-sm text-cyan-400">
                {profile.location}
              </span>
            </motion.div>
          </motion.div>

          {/* Futuristic CTA Buttons */}
          <motion.div
            variants={staggerItem}
            className="flex flex-col items-center justify-center gap-6 pt-2 sm:flex-row"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                document
                  .querySelector('#projects')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
              className="group relative overflow-hidden rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 text-lg font-bold text-white shadow-2xl"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                initial={false}
              />
              <span className="relative z-10 flex items-center gap-3">
                <Sparkles className="h-5 w-5" />
                View My Work
                <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>

              {/* Animated border */}
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 opacity-75"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                style={{
                  padding: '2px',
                  background:
                    'linear-gradient(45deg, #06b6d4, #8b5cf6, #ec4899, #06b6d4)',
                  WebkitMask:
                    'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude',
                }}
              />
            </motion.button>

            {profile.resume && (
              <motion.a
                href={profile.resume}
                download
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative inline-flex items-center gap-3 rounded-full border border-cyan-400/50 bg-white/10 px-8 py-4 text-lg font-bold text-cyan-400 backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
              >
                <Download className="h-5 w-5 transition-transform group-hover:translate-y-[-2px]" />
                Download Resume
              </motion.a>
            )}
          </motion.div>

          {/* Futuristic Scroll Indicator */}
          <motion.div variants={staggerItem} className="pt-10">
            <motion.button
              variants={fadeInUp}
              onClick={scrollToNext}
              className="group inline-flex flex-col items-center gap-4 text-cyan-400 transition-colors hover:text-white"
              aria-label="Scroll to next section"
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="relative"
              >
                <div className="flex h-12 w-8 justify-center rounded-full border-2 border-cyan-400/50">
                  <motion.div
                    animate={{ y: [0, 16, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="mt-2 h-3 w-1 rounded-full bg-cyan-400"
                  />
                </div>
              </motion.div>
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="font-mono text-sm uppercase tracking-wider"
              >
                Scroll to explore
              </motion.span>
            </motion.button>
          </motion.div>
        </motion.div>
      </Container>

      {/* Futuristic Floating Elements */}
      {!reducedMotion && (
        <>
          {/* Floating code snippets */}
          <motion.div
            animate={{
              y: [0, -30, 0],
              rotate: [0, 10, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute left-10 top-20 font-mono text-xs text-cyan-400/60"
          >
            {'<div>'}
          </motion.div>

          <motion.div
            animate={{
              y: [0, 25, 0],
              rotate: [0, -8, 0],
              opacity: [0.4, 0.9, 0.4],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 2,
            }}
            className="absolute right-20 top-40 font-mono text-xs text-purple-400/60"
          >
            {'{...props}'}
          </motion.div>

          <motion.div
            animate={{
              y: [0, -20, 0],
              x: [0, 15, 0],
              opacity: [0.2, 0.7, 0.2],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 4,
            }}
            className="absolute bottom-40 left-20 font-mono text-xs text-pink-400/60"
          >
            {'const'}
          </motion.div>

          {/* Floating geometric shapes */}
          <motion.div
            animate={{
              y: [0, -40, 0],
              rotate: [0, 180, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute right-32 top-32 h-6 w-6 rotate-45 border border-cyan-400/40"
          />

          <motion.div
            animate={{
              y: [0, 35, 0],
              rotate: [360, 180, 0],
              scale: [1, 0.8, 1],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 3,
            }}
            className="absolute bottom-32 left-32 h-4 w-4 rounded-full bg-gradient-to-r from-purple-500/30 to-pink-500/30"
          />

          {/* Floating particles */}
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -Math.random() * 50 - 20, 0],
                x: [0, Math.random() * 40 - 20, 0],
                opacity: [0, 0.6, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 10 + 8,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: Math.random() * 5,
              }}
              className="absolute h-1 w-1 rounded-full bg-cyan-400/60"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </>
      )}

      {/* Particle System */}
      {!reducedMotion && <ParticleSystem particleCount={30} />}
    </section>
  )
}
