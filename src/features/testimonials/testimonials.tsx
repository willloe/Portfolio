import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Section } from '@/components/layout/section'
import { Container } from '@/components/layout/container'
import { cn } from '@/lib/utils'
import { staggerContainer, staggerItem } from '@/lib/motion'
import { isReducedMotion } from '@/lib/utils'
import { Testimonial } from '@/lib/schemas'

interface TestimonialsProps {
  testimonials: Testimonial[]
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const reducedMotion = isReducedMotion()

  const nextTestimonial = () => {
    setCurrentIndex(prev => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex(
      prev => (prev - 1 + testimonials.length) % testimonials.length
    )
  }

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index)
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <Section
      id="testimonials"
      title="What People Say"
      description="Testimonials from clients and colleagues"
      padding="lg"
      background="muted"
    >
      <Container size="lg">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="space-y-8"
        >
          {/* Main Testimonial */}
          <motion.div variants={staggerItem} className="relative">
            <Card className="card-elevated mx-auto max-w-4xl">
              <CardContent className="p-8 md:p-12">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6 text-center"
                  >
                    {/* Quote Icon */}
                    <div className="flex justify-center">
                      <div className="rounded-full bg-primary/10 p-3">
                        <Quote className="h-6 w-6 text-primary" />
                      </div>
                    </div>

                    {/* Quote */}
                    <blockquote className="text-lg font-medium leading-relaxed text-foreground md:text-xl lg:text-2xl">
                      "{currentTestimonial.quote}"
                    </blockquote>

                    {/* Rating */}
                    {currentTestimonial.rating && (
                      <div className="flex justify-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              'h-5 w-5',
                              i < currentTestimonial.rating!
                                ? 'fill-current text-yellow-400'
                                : 'text-muted-foreground'
                            )}
                          />
                        ))}
                      </div>
                    )}

                    {/* Author */}
                    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={currentTestimonial.avatar} />
                        <AvatarFallback>
                          {currentTestimonial.name
                            .split(' ')
                            .map(n => n[0])
                            .join('')
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-center sm:text-left">
                        <div className="font-semibold text-foreground">
                          {currentTestimonial.name}
                        </div>
                        <div className="text-muted-foreground">
                          {currentTestimonial.title}
                          {currentTestimonial.company && (
                            <span> at {currentTestimonial.company}</span>
                          )}
                        </div>
                        {currentTestimonial.date && (
                          <div className="text-sm text-muted-foreground">
                            {new Date(
                              currentTestimonial.date
                            ).toLocaleDateString('en-US', {
                              month: 'long',
                              year: 'numeric',
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>

          {/* Navigation */}
          <motion.div
            variants={staggerItem}
            className="flex items-center justify-center gap-4"
          >
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={cn(
                    'h-3 w-3 rounded-full transition-all duration-200',
                    index === currentIndex
                      ? 'scale-125 bg-primary'
                      : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  )}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </motion.div>

          {/* All Testimonials Grid (Desktop) */}
          <motion.div variants={staggerItem} className="hidden lg:block">
            <h3 className="mb-6 text-center text-xl font-semibold text-foreground">
              More Testimonials
            </h3>
            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {testimonials.slice(0, 6).map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  variants={staggerItem}
                  whileHover={reducedMotion ? {} : { y: -5 }}
                  className="group cursor-pointer"
                  onClick={() => goToTestimonial(index)}
                >
                  <Card className="card-interactive h-full">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={testimonial.avatar} />
                            <AvatarFallback>
                              {testimonial.name
                                .split(' ')
                                .map(n => n[0])
                                .join('')
                                .toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="min-w-0 flex-1">
                            <div className="truncate font-medium text-foreground">
                              {testimonial.name}
                            </div>
                            <div className="truncate text-sm text-muted-foreground">
                              {testimonial.title}
                            </div>
                          </div>
                        </div>
                        <p className="line-clamp-3 text-sm text-muted-foreground">
                          "{testimonial.quote}"
                        </p>
                        {testimonial.rating && (
                          <div className="flex gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={cn(
                                  'h-3 w-3',
                                  i < testimonial.rating!
                                    ? 'fill-current text-yellow-400'
                                    : 'text-muted-foreground'
                                )}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  )
}
