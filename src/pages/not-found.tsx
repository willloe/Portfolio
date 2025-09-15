import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, ArrowLeft, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/layout/container'
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/motion'
import { isReducedMotion } from '@/lib/utils'

export function NotFoundPage() {
  const reducedMotion = isReducedMotion()

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-background to-muted/20"
    >
      <Container size="md" centered>
        <motion.div variants={staggerItem} className="space-y-8 text-center">
          {/* 404 Animation */}
          <motion.div variants={fadeInUp} className="relative">
            <div className="select-none text-8xl font-bold text-primary/20 md:text-9xl">
              404
            </div>
            <motion.div
              animate={reducedMotion ? {} : { rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform"
            >
              <Search className="h-16 w-16 text-primary" />
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div variants={staggerItem} className="space-y-4">
            <h1 className="text-4xl font-bold text-foreground md:text-5xl">
              Page Not Found
            </h1>
            <p className="mx-auto max-w-2xl text-xl leading-relaxed text-muted-foreground">
              Oops! The page you're looking for doesn't exist. It might have
              been moved, deleted, or you entered the wrong URL.
            </p>
          </motion.div>

          {/* Actions */}
          <motion.div
            variants={staggerItem}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button size="lg" asChild>
              <Link to="/">
                <Home className="mr-2 h-4 w-4" />
                Go Home
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
          </motion.div>

          {/* Help Text */}
          <motion.div variants={staggerItem} className="pt-8">
            <p className="text-sm text-muted-foreground">
              Need help?{' '}
              <Link to="/#contact" className="text-primary hover:underline">
                Contact me
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </Container>
    </motion.div>
  )
}
