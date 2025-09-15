import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { fadeInUp, getMotionVariants } from '@/lib/motion'
import { isReducedMotion } from '@/lib/utils'

interface SectionProps {
  children: React.ReactNode
  className?: string
  id?: string
  'data-testid'?: string
  title?: string
  kicker?: string
  description?: string
  centered?: boolean
  padding?: 'sm' | 'md' | 'lg' | 'xl'
  background?: 'default' | 'muted' | 'accent'
}

export function Section({
  children,
  className,
  id,
  'data-testid': dataTestId,
  title,
  kicker,
  description,
  centered = false,
  padding = 'lg',
  background = 'default',
}: SectionProps) {
  const paddingClasses = {
    sm: 'py-8 md:py-12',
    md: 'py-12 md:py-16',
    lg: 'py-16 md:py-24',
    xl: 'py-20 md:py-32',
  }

  const backgroundClasses = {
    default: 'bg-background',
    muted: 'bg-muted/30',
    accent: 'bg-accent/5',
  }

  const reducedMotion = isReducedMotion()

  return (
    <section
      id={id}
      data-testid={dataTestId}
      className={cn(
        'relative',
        paddingClasses[padding],
        backgroundClasses[background],
        className
      )}
    >
      <div className="container-custom">
        {(title || kicker || description) && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={getMotionVariants(fadeInUp, reducedMotion)}
            className={cn(
              'mb-12 md:mb-16',
              centered && 'mx-auto max-w-3xl text-center'
            )}
          >
            {kicker && (
              <motion.p
                variants={getMotionVariants(fadeInUp, reducedMotion)}
                className="mb-2 text-sm font-medium uppercase tracking-wider text-primary"
              >
                {kicker}
              </motion.p>
            )}
            {title && (
              <motion.h2
                variants={getMotionVariants(fadeInUp, reducedMotion)}
                className="heading-2 mb-4"
              >
                {title}
              </motion.h2>
            )}
            {description && (
              <motion.p
                variants={getMotionVariants(fadeInUp, reducedMotion)}
                className="body-large text-muted-foreground"
              >
                {description}
              </motion.p>
            )}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  )
}
