import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { Send, Mail, Phone, MapPin, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/motion'
import { isReducedMotion } from '@/lib/utils'
import {
  ContactForm as ContactFormType,
  contactFormSchema,
} from '@/lib/schemas'
import { useToast } from '@/hooks/use-toast'

interface ContactFormProps {
  profile: {
    name: string
    email: string
    location: string
  }
}

export function ContactForm({ profile }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const reducedMotion = isReducedMotion()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormType>({
    resolver: zodResolver(contactFormSchema),
  })

  const onSubmit = async (data: ContactFormType) => {
    setIsSubmitting(true)

    try {
      // Simulate API call with security considerations
      await new Promise(resolve => setTimeout(resolve, 2000))

      // In a real app, you would:
      // 1. Send to your backend API (not directly to email)
      // 2. Implement rate limiting and CAPTCHA
      // 3. Sanitize input data
      // 4. Log attempts for security monitoring
      // 5. Use environment variables for sensitive data

      console.log('Contact form data:', {
        ...data,
        timestamp: new Date().toISOString(),
        // Never log sensitive data in production
      })

      toast({
        title: 'Message sent successfully!',
        description:
          "Thank you for reaching out. I'll get back to you within 24 hours.",
        variant: 'success',
      })

      reset()
    } catch (error) {
      toast({
        title: 'Error sending message',
        description:
          'Please try again later or contact me directly via LinkedIn.',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: MapPin,
      label: 'Location',
      value: profile.location,
    },
    {
      icon: Clock,
      label: 'Response Time',
      value: 'Within 24 hours',
    },
  ]

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={staggerContainer}
      className="grid grid-cols-1 gap-8 lg:grid-cols-2"
    >
      {/* Contact Info */}
      <motion.div variants={staggerItem} className="space-y-6">
        <div>
          <h3 className="mb-4 text-2xl font-bold text-white">
            Let's Get In Touch
          </h3>
          <p className="leading-relaxed text-slate-300">
            I'm always interested in new opportunities and exciting projects.
            Whether you have a question or just want to say hi, I'll try my best
            to get back to you!
          </p>
        </div>

        <div className="space-y-4">
          {contactInfo.map((info, index) => (
            <motion.div
              key={info.label}
              variants={staggerItem}
              className="flex items-center gap-4"
            >
              <div className="rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-3">
                <info.icon className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <div className="text-sm font-medium text-slate-400">
                  {info.label}
                </div>
                {info.href ? (
                  <a
                    href={info.href}
                    className="text-white transition-colors hover:text-purple-400"
                  >
                    {info.value}
                  </a>
                ) : (
                  <div className="text-white">{info.value}</div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="pt-4">
          <h4 className="mb-3 text-lg font-semibold text-white">
            What I'm Looking For
          </h4>
          <div className="flex flex-wrap gap-2">
            {[
              'Full-time opportunities',
              'Internships',
              'Research projects',
              'Open source contributions',
            ].map(item => (
              <Badge
                key={item}
                className="border border-purple-400/30 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-xs text-purple-300 transition-colors hover:bg-purple-500/30"
              >
                {item}
              </Badge>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Contact Form */}
      <motion.div variants={staggerItem}>
        <Card className="border-purple-400/20 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Send className="h-5 w-5 text-purple-400" />
              Send a Message
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-slate-300"
                  >
                    Name *
                  </label>
                  <Input
                    id="name"
                    {...register('name')}
                    placeholder="Your name"
                    className={cn(errors.name && 'border-destructive')}
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-slate-300"
                  >
                    Email *
                  </label>
                  <Input
                    id="email"
                    type="email"
                    {...register('email')}
                    placeholder="your@email.com"
                    className={cn(errors.email && 'border-destructive')}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="subject"
                  className="text-sm font-medium text-slate-300"
                >
                  Subject *
                </label>
                <Input
                  id="subject"
                  {...register('subject')}
                  placeholder="What's this about?"
                  className={cn(errors.subject && 'border-destructive')}
                />
                {errors.subject && (
                  <p className="text-sm text-destructive">
                    {errors.subject.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-slate-300"
                >
                  Message *
                </label>
                <Textarea
                  id="message"
                  {...register('message')}
                  placeholder="Tell me about your project or question..."
                  rows={6}
                  className={cn(errors.message && 'border-destructive')}
                />
                {errors.message && (
                  <p className="text-sm text-destructive">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                size="lg"
                className="group w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
