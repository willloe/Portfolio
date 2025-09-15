import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface LoadingScreenProps {
  onComplete: () => void
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [loadingText, setLoadingText] = useState('Initializing...')

  useEffect(() => {
    const loadingSteps = [
      { text: 'Initializing...', progress: 20 },
      { text: 'Loading assets...', progress: 40 },
      { text: 'Compiling code...', progress: 60 },
      { text: 'Optimizing performance...', progress: 80 },
      { text: 'Ready!', progress: 100 },
    ]

    let currentStep = 0
    const interval = setInterval(() => {
      if (currentStep < loadingSteps.length) {
        setLoadingText(loadingSteps[currentStep].text)
        setProgress(loadingSteps[currentStep].progress)
        currentStep++
      } else {
        clearInterval(interval)
        setTimeout(onComplete, 500)
      }
    }, 800)

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900"
    >
      {/* Cyberpunk Grid Background */}
      <div className="cyber-grid absolute inset-0" />

      {/* Animated Logo */}
      <motion.div
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="gradient-text-cyber mb-8 text-6xl font-black"
      >
        WL
      </motion.div>

      {/* Loading Bar */}
      <div className="mb-4 h-2 w-80 overflow-hidden rounded-full bg-slate-800">
        <motion.div
          className="h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Loading Text */}
      <motion.div
        key={loadingText}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-mono text-lg text-cyan-400"
      >
        {loadingText}
      </motion.div>

      {/* Floating Elements */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute right-20 top-20 h-8 w-8 rounded-lg border border-cyan-400/50"
      />

      <motion.div
        animate={{
          y: [0, 20, 0],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
        className="absolute bottom-20 left-20 h-6 w-6 rounded-full border border-purple-400/50"
      />
    </motion.div>
  )
}
