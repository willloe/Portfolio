import { motion } from 'framer-motion'
import { Download, MapPin, Award } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Section } from '@/components/layout/section'
import { Container } from '@/components/layout/container'
import { staggerContainer, staggerItem, cardHover } from '@/lib/motion'
import { Profile } from '@/lib/schemas'

interface AboutProps {
  profile: Profile
}

const stats = [
  { label: 'Years Experience', value: '3+' },
  { label: 'Projects Completed', value: '15+' },
]

const highlights = [
  'Full-stack development with modern technologies',
  'UI/UX design and user experience optimization',
  'Agile methodologies and team collaboration',
  'Performance optimization and scalability',
  'AI integration and machine learning applications',
  'Cloud-native DevOps, CI/CD, and site reliability engineering',
]

export function About({ profile }: AboutProps) {
  const avatarSrc = profile.avatar || '/placeholder-avatar.jpg'

  return (
    <Section
      id="about"
      data-testid="about-section"
      title="About Me"
      description="Passionate about creating digital experiences that make a difference"
      padding="lg"
      className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
    >
      {/* Futuristic Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(6,182,212,0.1)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(139,92,246,0.1)_0%,transparent_50%)]" />

        {/* Floating code elements */}
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute left-10 top-32 font-mono text-sm text-cyan-400/30"
        >
          {'<div className="about">'}
        </motion.div>

        <motion.div
          animate={{ y: [0, 15, 0], rotate: [0, -3, 0] }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
          className="absolute bottom-32 right-10 font-mono text-sm text-purple-400/30"
        >
          {'{...props}'}
        </motion.div>
      </div>

      <Container size="lg">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16"
        >
          {/* Content */}
          <motion.div variants={staggerItem} className="space-y-6">
            <div className="space-y-4">
              <h3 className="gradient-text-cyber text-3xl font-bold">
                {profile.name}
              </h3>
              <div className="flex items-center gap-2 text-cyan-400">
                <MapPin className="h-4 w-4" />
                <span className="font-mono">{profile.location}</span>
              </div>
            </div>

            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p className="text-lg leading-relaxed text-slate-300">
                {profile.summary}
              </p>
            </div>

            {/* Highlights */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-purple-400">
                What I Do
              </h4>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {highlights.map((highlight, index) => (
                  <motion.div
                    key={highlight}
                    variants={staggerItem}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.5,
                      }}
                      className="neon-glow h-2 w-2 flex-shrink-0 rounded-full bg-cyan-400"
                    />
                    <span className="text-sm text-slate-300">{highlight}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <motion.div
              variants={staggerItem}
              className="flex flex-col gap-4 sm:flex-row"
            >
              {profile.resume && (
                <motion.a
                  href={profile.resume}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Download resume"
                  className="group relative inline-flex overflow-hidden rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 px-6 py-3 text-lg font-bold text-white shadow-2xl"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    initial={false}
                  />
                  <span className="relative z-10 inline-flex items-center gap-2">
                    <Download className="h-5 w-5 transition-transform group-hover:-translate-y-0.5" />
                    Download Resume
                  </span>
                </motion.a>
              )}

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  document
                    .querySelector('#contact')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
                className="glass-morphism-dark rounded-full border border-cyan-400/50 px-6 py-3 text-lg font-bold text-cyan-400 transition-all duration-300 hover:bg-cyan-400/10"
              >
                Get In Touch
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Stats & Image */}
          <motion.div variants={staggerItem} className="space-y-8">
            {/* Profile Image */}
            <motion.div variants={cardHover} className="group relative">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src={avatarSrc}
                  alt={`${profile.name} portrait`}
                  className="h-80 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              <div className="absolute -bottom-4 -right-4 flex h-24 w-24 items-center justify-center rounded-full bg-primary shadow-lg">
                <Award className="h-8 w-8 text-primary-foreground" />
              </div>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-2 gap-4"
            >
              {stats.map(stat => (
                <motion.div
                  key={stat.label}
                  variants={staggerItem}
                  whileHover={{ scale: 1.05 }}
                  className="group"
                >
                  <Card className="card-interactive h-full">
                    <CardContent className="p-6 text-center">
                      <div className="text-2xl font-bold text-primary transition-transform group-hover:scale-110">
                        {stat.value}
                      </div>
                      <div className="mt-1 text-sm text-muted-foreground">
                        {stat.label}
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
