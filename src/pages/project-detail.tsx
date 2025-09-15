import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ExternalLink, Github, Calendar, Tag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Container } from '@/components/layout/container'
import { cn } from '@/lib/utils'
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/motion'
import { isReducedMotion } from '@/lib/utils'
import { Project } from '@/lib/schemas'

interface ProjectDetailPageProps {
  projects: Project[]
}

export function ProjectDetailPage({ projects }: ProjectDetailPageProps) {
  const { slug } = useParams<{ slug: string }>()
  const project = projects.find(p => p.slug === slug)
  const reducedMotion = isReducedMotion()

  if (!project) {
    return (
      <Container size="lg" className="py-20">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold text-foreground">
            Project Not Found
          </h1>
          <p className="mb-8 text-muted-foreground">
            The project you're looking for doesn't exist or has been moved.
          </p>
          <Button asChild>
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </Container>
    )
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'long',
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
      animate="visible"
      variants={staggerContainer}
      className="min-h-screen pt-20"
    >
      {/* Header */}
      <motion.div
        variants={staggerItem}
        className="border-b border-border/50 bg-muted/30"
      >
        <Container size="lg" className="py-12">
          <div className="mb-6 flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Projects
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Badge variant={getStatusColor(project.status)}>
                  {project.status.replace('-', ' ')}
                </Badge>
                {project.featured && (
                  <Badge variant="secondary">Featured</Badge>
                )}
              </div>

              <h1 className="text-4xl font-bold text-foreground md:text-5xl">
                {project.title}
              </h1>

              <p className="text-xl leading-relaxed text-muted-foreground">
                {project.summary}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tech.slice(0, 6).map(tech => (
                  <Badge key={tech} variant="outline">
                    {tech}
                  </Badge>
                ))}
                {project.tech.length > 6 && (
                  <Badge variant="outline">
                    +{project.tech.length - 6} more
                  </Badge>
                )}
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                {project.links.demo && (
                  <Button size="lg" asChild>
                    <a
                      href={project.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View Live Demo
                    </a>
                  </Button>
                )}
                {project.links.repo && (
                  <Button size="lg" variant="outline" asChild>
                    <a
                      href={project.links.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="mr-2 h-4 w-4" />
                      View Source Code
                    </a>
                  </Button>
                )}
              </div>
            </div>

            <div className="relative">
              <img
                src={project.images?.[0] || '/placeholder-project.jpg'}
                alt={project.title}
                className="h-80 w-full rounded-2xl object-cover shadow-2xl"
              />
            </div>
          </div>
        </Container>
      </motion.div>

      {/* Content */}
      <Container size="lg" className="py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Main Content */}
          <div className="space-y-12 lg:col-span-2">
            {/* Description */}
            <motion.section variants={staggerItem}>
              <h2 className="mb-6 text-2xl font-bold text-foreground">
                About This Project
              </h2>
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <p className="text-lg leading-relaxed text-muted-foreground">
                  {project.description}
                </p>
              </div>
            </motion.section>

            {/* Key Features */}
            <motion.section variants={staggerItem}>
              <h2 className="mb-6 text-2xl font-bold text-foreground">
                Key Features
              </h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {project.highlights.map((highlight, index) => (
                  <Card key={index} className="card-elevated">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-3">
                        <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-primary" />
                        <p className="text-muted-foreground">{highlight}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.section>

            {/* Images */}
            {project.images && project.images.length > 1 && (
              <motion.section variants={staggerItem}>
                <h2 className="mb-6 text-2xl font-bold text-foreground">
                  Project Screenshots
                </h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {project.images.slice(1).map((image, index) => (
                    <motion.div
                      key={index}
                      variants={fadeInUp}
                      className="group relative overflow-hidden rounded-lg"
                    >
                      <img
                        src={image}
                        alt={`${project.title} screenshot ${index + 1}`}
                        className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Project Info */}
            <motion.div variants={staggerItem}>
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle>Project Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {project.startDate && (
                    <div className="flex items-center gap-3">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm font-medium text-foreground">
                          Timeline
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {formatDate(project.startDate)}
                          {project.endDate &&
                            ` - ${formatDate(project.endDate)}`}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-3">
                    <Tag className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="text-sm font-medium text-foreground">
                        Status
                      </div>
                      <div className="text-sm capitalize text-muted-foreground">
                        {project.status.replace('-', ' ')}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Technologies */}
            <motion.div variants={staggerItem}>
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle>Technologies Used</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map(tech => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Tags */}
            {project.tags && project.tags.length > 0 && (
              <motion.div variants={staggerItem}>
                <Card className="card-elevated">
                  <CardHeader>
                    <CardTitle>Tags</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map(tag => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        </div>
      </Container>
    </motion.div>
  )
}
