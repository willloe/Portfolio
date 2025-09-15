import { motion } from 'framer-motion'
import { ExternalLink, Github, Calendar, Tag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { cardHover, fadeInUp, staggerItem } from '@/lib/motion'
import { isReducedMotion } from '@/lib/utils'
import { Project } from '@/lib/schemas'

interface ProjectCardProps {
  project: Project
  index: number
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const reducedMotion = isReducedMotion()

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success'
      case 'in-progress':
        return 'warning'
      case 'planned':
        return 'info'
      default:
        return 'default'
    }
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={staggerItem}
      transition={{ delay: index * 0.1 }}
      className="group"
    >
      <Card
        className="
          /* single base
          */
          /*            subtle edge */ relative
          h-full overflow-hidden       rounded-2xl bg-slate-900/60 shadow-[0_8px_30px_rgb(2_6_23/0.45)] ring-1
          ring-white/10
          backdrop-blur-sm
        "
        data-testid="project-card"
      >
        {/* Futuristic Image Container */}
        <div className="relative overflow-hidden">
          <img
            src={project.images?.[0] || '/placeholder-project.jpg'}
            alt={project.title}
            className="h-48 w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Cyberpunk overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-cyan-400/10" />

          {/* Animated scan line */}
          <motion.div
            className="absolute inset-0 h-0.5 w-full bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"
            animate={{
              y: [0, 192, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Status Badge */}
          <div className="absolute right-4 top-4">
            <Badge
              variant={getStatusColor(project.status)}
              className="glass-morphism-dark text-white-400 border-cyan-400/30"
            >
              {project.status.replace('-', ' ')}
            </Badge>
          </div>

          {/* Featured Badge */}
          {project.featured && (
            <div className="absolute left-4 top-4">
              <Badge className="border-0 bg-gradient-to-r from-cyan-500 to-purple-500 text-white">
                <motion.span
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Featured
                </motion.span>
              </Badge>
            </div>
          )}

          {/* Futuristic Overlay Links */}
          <div className="absolute inset-0 flex items-center justify-center gap-4 bg-slate-900/80 opacity-0 backdrop-blur-sm transition-all duration-500 group-hover:opacity-100">
            {project.links.demo && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="neon-glow flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 text-sm font-medium text-white"
              >
                <ExternalLink className="h-4 w-4" />
                Live Demo
              </motion.button>
            )}
            {project.links.repo && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="glass-morphism-dark flex items-center gap-2 rounded-full border border-cyan-400/50 px-4 py-2 text-sm font-medium text-cyan-400 transition-colors hover:bg-cyan-400/10"
              >
                <Github className="h-4 w-4" />
                Code
              </motion.button>
            )}
          </div>
        </div>

        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-xl font-bold text-white transition-colors group-hover:text-cyan-400">
              {project.title}
            </h3>
          </div>
          <p className="text-sm leading-relaxed text-slate-300">
            {project.summary}
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Futuristic Tech Stack */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-cyan-400">
              <Tag className="h-4 w-4" />
              Technologies
            </div>
            <div className="flex flex-wrap gap-2">
              {project.tech.slice(0, 4).map(tech => (
                <Badge
                  key={tech}
                  className="glass-morphism-dark border-cyan-400/30 text-xs text-cyan-400 transition-colors hover:bg-cyan-400/10"
                >
                  {tech}
                </Badge>
              ))}
              {project.tech.length > 4 && (
                <Badge className="glass-morphism-dark border-purple-400/30 text-xs text-purple-400">
                  +{project.tech.length - 4} more
                </Badge>
              )}
            </div>
          </div>

          {/* Futuristic Highlights */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-purple-400">
              Key Features
            </h4>
            <ul className="space-y-1">
              {project.highlights.slice(0, 3).map((highlight, idx) => (
                <motion.li
                  key={idx}
                  className="flex items-start gap-2 text-sm text-slate-300"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: idx * 0.5,
                    }}
                    className="neon-glow mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-cyan-400"
                  />
                  {highlight}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Futuristic Date */}
          {project.startDate && (
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <Calendar className="h-4 w-4 text-cyan-400" />
              <span className="font-mono">
                {formatDate(project.startDate)}
                {project.endDate && ` - ${formatDate(project.endDate)}`}
              </span>
            </div>
          )}
        </CardContent>

        <CardFooter className="pt-0">
          <div className="flex w-full flex-wrap gap-2">
            {project.links.demo && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="neon-glow flex flex-1 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-3 py-2 text-sm font-medium text-white"
                asChild
              >
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-4 w-4" />
                  Demo
                </a>
              </motion.button>
            )}
            {project.links.repo && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="glass-morphism-dark flex flex-1 items-center justify-center gap-2 rounded-lg border border-cyan-400/30 px-3 py-2 text-sm font-medium text-cyan-400 transition-colors hover:bg-cyan-400/10"
                asChild
              >
                <a
                  href={project.links.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-4 w-4" />
                  Code
                </a>
              </motion.button>
            )}
            {project.links.caseStudy && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="glass-morphism-dark flex-1 rounded-lg border border-purple-400/30 px-3 py-2 text-sm font-medium text-purple-400 transition-colors hover:bg-purple-400/10"
                asChild
              >
                <a
                  href={project.links.caseStudy}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Case Study
                </a>
              </motion.button>
            )}
          </div>
        </CardFooter>

        {/* Cyberpunk Footer Accent */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </Card>
    </motion.div>
  )
}
