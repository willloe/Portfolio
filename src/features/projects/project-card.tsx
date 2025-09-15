import { motion } from 'framer-motion'
import { ExternalLink, Github, Calendar, Tag, FileText } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { staggerItem } from '@/lib/motion'
import { isReducedMotion } from '@/lib/utils'
import { Project } from '@/lib/schemas'

interface ProjectCardProps {
  project: Project
  index: number
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const reducedMotion = isReducedMotion()

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
    })

  // Read paper link safely even if your schema doesn't (yet) declare `paper`
  const paperUrl = project.links?.paper ?? project.links?.caseStudy ?? ''

  const techLabel =
    (project as any).kind === 'research' ? 'Methods & Tools' : 'Technologies'

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
      case 'accepted':
        return 'success'
      case 'in-progress':
      case 'submitted':
      case 'under-review':
        return 'warning'
      case 'planned':
      case 'preprint':
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
        className="relative h-full overflow-hidden rounded-2xl bg-slate-900/60 shadow-[0_8px_30px_rgb(2_6_23/0.45)] ring-1 ring-white/10 backdrop-blur-sm"
        data-testid="project-card"
      >
        {/* Image + overlay */}
        <div className="relative overflow-hidden">
          <img
            src={project.images?.[0] || '/placeholder-project.jpg'}
            alt={project.title}
            className="h-48 w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Gradient wash */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-cyan-400/10" />

          {/* Scan line (respect reduced motion) */}
          <motion.div
            className="absolute inset-0 h-0.5 w-full bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"
            animate={reducedMotion ? undefined : { y: [0, 192, 0] }}
            transition={
              reducedMotion
                ? undefined
                : { duration: 3, repeat: Infinity, ease: 'easeInOut' }
            }
          />

          {/* Status badge */}
          <div className="absolute right-4 top-4">
            <Badge
              variant={getStatusColor(project.status)}
              className="glass-morphism-dark text-white-400 border-cyan-400/30"
            >
              {project.status.replace('-', ' ')}
            </Badge>
          </div>

          {/* Featured badge */}
          {project.featured && (
            <div className="absolute left-4 top-4">
              <Badge className="border-0 bg-gradient-to-r from-cyan-500 to-purple-500 text-white">
                <motion.span
                  animate={
                    reducedMotion ? undefined : { opacity: [0.7, 1, 0.7] }
                  }
                  transition={
                    reducedMotion
                      ? undefined
                      : { duration: 2, repeat: Infinity }
                  }
                >
                  Featured
                </motion.span>
              </Badge>
            </div>
          )}

          {/* Overlay actions */}
          <div className="absolute inset-0 flex items-center justify-center gap-4 bg-slate-900/80 opacity-0 backdrop-blur-sm transition-all duration-500 group-hover:opacity-100">
            {project.links?.demo && (
              <motion.a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Open live demo"
                className="neon-glow inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 text-sm font-medium text-white"
              >
                <ExternalLink className="h-4 w-4" />
                <span className="leading-none">Live Demo</span>
              </motion.a>
            )}

            {project.links?.repo && (
              <motion.a
                href={project.links.repo}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Open source code"
                className="glass-morphism-dark inline-flex items-center justify-center gap-2 rounded-full border border-cyan-400/50 px-4 py-2 text-sm font-medium text-cyan-400 transition-colors hover:bg-cyan-400/10"
              >
                <Github className="h-4 w-4" />
                <span className="leading-none">Code</span>
              </motion.a>
            )}

            {paperUrl && (
              <motion.a
                href={paperUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Read paper (PDF)"
                className="glass-morphism-dark inline-flex items-center justify-center gap-2 rounded-full border border-purple-400/50 px-4 py-2 text-sm font-medium text-purple-300 transition-colors hover:bg-purple-400/10"
              >
                <FileText className="h-4 w-4" />
                <span className="leading-none">Read Paper</span>
              </motion.a>
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
          {/* Tech stack */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-cyan-400">
              <Tag className="h-4 w-4" />
              {techLabel}
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

          {/* Dates */}
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
          {(() => {
            const caseStudyUrl = project.links?.caseStudy?.trim()
            const explicitPaperUrl = project.links?.paper?.trim()
            const pdfUrl = [explicitPaperUrl, caseStudyUrl].find(
              u => typeof u === 'string' && /\.pdf(\?|$)/i.test(u!)
            )
            const caseStudyWebUrl =
              caseStudyUrl && caseStudyUrl !== pdfUrl ? caseStudyUrl : undefined

            return (
              <div className="flex w-full flex-wrap gap-2">
                {project.links?.demo && (
                  <motion.a
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    aria-label="Open live demo"
                    className="neon-glow inline-flex w-full flex-1 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-3 py-4 text-sm font-medium text-white"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span className="leading-none">Demo</span>
                  </motion.a>
                )}

                {project.links?.repo && (
                  <motion.a
                    href={project.links.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    aria-label="Open source code"
                    className="glass-morphism-dark inline-flex w-full flex-1 items-center justify-center gap-2 rounded-lg border border-cyan-400/30 px-3 py-4 text-sm font-medium text-cyan-400 transition-colors hover:bg-cyan-400/10"
                  >
                    <Github className="h-4 w-4" />
                    <span className="leading-none">Code</span>
                  </motion.a>
                )}

                {pdfUrl && (
                  <motion.a
                    href={pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    aria-label="Read paper (PDF)"
                    className="glass-morphism-dark inline-flex w-full flex-1 items-center justify-center gap-2 rounded-lg border border-purple-400/30 px-3 py-4 text-sm font-medium text-purple-400 transition-colors hover:bg-purple-400/10"
                  >
                    <FileText className="h-4 w-4" />
                    <span className="leading-none">Read Paper (PDF)</span>
                  </motion.a>
                )}

                {caseStudyWebUrl && (
                  <motion.a
                    href={caseStudyWebUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    aria-label="Open case study"
                    className="glass-morphism-dark inline-flex w-full flex-1 items-center justify-center gap-2 rounded-lg border border-purple-400/30 px-3 py-4 text-sm font-medium text-purple-400 transition-colors hover:bg-purple-400/10"
                  >
                    <span className="leading-none">Case Study</span>
                  </motion.a>
                )}
              </div>
            )
          })()}
        </CardFooter>

        {/* Accent */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </Card>
    </motion.div>
  )
}
