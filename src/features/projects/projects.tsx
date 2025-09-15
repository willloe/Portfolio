import { useState } from 'react'
import { motion } from 'framer-motion'
import { ProjectCard } from './project-card'
import { Section } from '@/components/layout/section'
import { Container } from '@/components/layout/container'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { staggerContainer, staggerItem } from '@/lib/motion'
import { isReducedMotion } from '@/lib/utils'
import { Project } from '@/lib/schemas'

interface ProjectsProps {
  projects: Project[]
}

const allTags = [
  'All',
  'React',
  'TypeScript',
  'Python',
  'FastAPI',
  'PyTorch',
  'Docker',
  'PostgreSQL',
  'AWS',
  'Tailwind CSS',
  'Vite',
  'Framer Motion',
  'Hugging Face',
  'CUDA',
]

export function Projects({ projects }: ProjectsProps) {
  const [selectedTag, setSelectedTag] = useState('All')
  const reducedMotion = isReducedMotion()

  const filteredProjects =
    selectedTag === 'All'
      ? projects
      : projects.filter(
          project =>
            project.tech.some(tech =>
              tech.toLowerCase().includes(selectedTag.toLowerCase())
            ) ||
            project.tags?.some(tag =>
              tag.toLowerCase().includes(selectedTag.toLowerCase())
            )
        )

  const featuredProjects = projects.filter(project => project.featured)
  const otherProjects = projects.filter(project => !project.featured)

  return (
    <Section
      id="projects"
      data-testid="projects-section"
      title="Featured Projects"
      description="A showcase of my recent work and side projects"
      padding="lg"
      className="relative bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900"
    >
      {/* Futuristic Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="cyber-grid absolute inset-0" />
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
          className="absolute right-20 top-20 h-32 w-32 rounded-lg border border-cyan-400/20"
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
          className="absolute bottom-20 left-20 h-24 w-24 rounded-full border border-purple-400/20"
        />
      </div>

      <Container size="lg">
        {/* Filter Tags */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainer}
          className="mb-12"
        >
          <motion.div
            variants={staggerItem}
            className="flex flex-wrap justify-center gap-3"
          >
            {allTags.map(tag => (
              <motion.button
                key={tag}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedTag(tag)}
                className={`rounded-full px-4 py-2 font-medium transition-all duration-300 ${
                  selectedTag === tag
                    ? 'neon-glow bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                    : 'glass-morphism-dark border border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10'
                }`}
              >
                {tag}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>

        {/* Featured Projects */}
        {selectedTag === 'All' && featuredProjects.length > 0 && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={staggerContainer}
            className="mb-16"
          >
            <motion.div variants={staggerItem} className="mb-8">
              <h3 className="mb-2 text-2xl font-bold text-foreground">
                Featured Work
              </h3>
              <p className="text-muted-foreground">
                Highlighted projects that showcase my skills and expertise
              </p>
            </motion.div>
            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 gap-8 lg:grid-cols-2"
            >
              {featuredProjects.map((project, index) => (
                <motion.div
                  key={project.slug}
                  variants={staggerItem}
                  className="lg:col-span-1"
                >
                  <ProjectCard project={project} index={index} />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}

        {/* All Projects Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainer}
        >
          {selectedTag !== 'All' && (
            <motion.div variants={staggerItem} className="mb-8">
              <h3 className="mb-2 text-2xl font-bold text-foreground">
                {selectedTag} Projects
              </h3>
              <p className="text-muted-foreground">
                {filteredProjects.length} project
                {filteredProjects.length !== 1 ? 's' : ''} found
              </p>
            </motion.div>
          )}

          {filteredProjects.length > 0 ? (
            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.slug}
                  variants={staggerItem}
                  transition={{ delay: index * 0.1 }}
                >
                  <ProjectCard project={project} index={index} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div variants={staggerItem} className="py-12 text-center">
              <div className="mb-4 text-muted-foreground">
                <p className="text-lg">No projects found for "{selectedTag}"</p>
                <p className="text-sm">Try selecting a different filter</p>
              </div>
              <Button variant="outline" onClick={() => setSelectedTag('All')}>
                Show All Projects
              </Button>
            </motion.div>
          )}
        </motion.div>

        {/* View More Button */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerItem}
          className="mt-12 text-center"
        >
          <Button
            size="lg"
            variant="outline"
            onClick={() =>
              document
                .querySelector('#contact')
                ?.scrollIntoView({ behavior: 'smooth' })
            }
          >
            Interested in working together?
          </Button>
        </motion.div>
      </Container>
    </Section>
  )
}
