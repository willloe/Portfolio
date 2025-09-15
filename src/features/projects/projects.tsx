import { useCallback, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ProjectCard } from './project-card'
import { Section } from '@/components/layout/section'
import { Container } from '@/components/layout/container'
import { Button } from '@/components/ui/button'
import { staggerContainer, staggerItem } from '@/lib/motion'
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

// -----------------------------
// helpers
// -----------------------------
function normalize(s?: string) {
  return (s || '').toLowerCase().trim()
}

const TAG_ALIASES: Record<string, string[]> = {
  'tailwind css': ['tailwind', 'tailwindcss'],
  'node.js': ['node', 'nodejs'],
  pytorch: ['torch'],
}

const STATUS_RANK: Record<string, number> = {
  'in-progress': 0,
  submitted: 1,
  'under-review': 1,
  planned: 2,
  preprint: 2,
  accepted: 3,
  completed: 3,
}

function rankStatus(status?: string) {
  const key = normalize(status)
  return STATUS_RANK[key] ?? 4
}

function ts(date?: string) {
  if (!date) return Number.NEGATIVE_INFINITY
  const n = new Date(date).getTime()
  return Number.isFinite(n) ? n : Number.NEGATIVE_INFINITY
}

function compareProjects(a: Project, b: Project) {
  // 1) status priority
  const ra = rankStatus(a.status)
  const rb = rankStatus(b.status)
  if (ra !== rb) return ra - rb

  // 2) date priority inside the same status bucket
  const aInProgress = normalize(a.status) === 'in-progress'
  const bInProgress = normalize(b.status) === 'in-progress'

  if (aInProgress && bInProgress) {
    // newer start first
    return ts(b.startDate) - ts(a.startDate)
  }

  // prefer endDate if present, else startDate — newer first
  const aKey = ts(a.endDate) > 0 ? ts(a.endDate) : ts(a.startDate)
  const bKey = ts(b.endDate) > 0 ? ts(b.endDate) : ts(b.startDate)
  return bKey - aKey
}

export function Projects({ projects }: ProjectsProps) {
  const [selectedTag, setSelectedTag] = useState('All')

  // pre-sort once
  const sortedProjects = useMemo(
    () => [...projects].sort(compareProjects),
    [projects]
  )

  // filter predicate (with alias support)
  const matchesSelected = useCallback(
    (p: Project) => {
      const selected = normalize(selectedTag)
      if (selected === 'all' || !selected) return true

      const tech = (p.tech ?? []).map(normalize)
      const tags = (p.tags ?? []).map(normalize)
      const set = new Set([...tech, ...tags])

      if (set.has(selected)) return true

      for (const [canon, alts] of Object.entries(TAG_ALIASES)) {
        if (canon === selected && alts.some(a => set.has(a))) return true
        if (alts.includes(selected) && set.has(canon)) return true
      }
      return false
    },
    [selectedTag]
  )

  // apply filtering over the sorted list so order is preserved
  const filteredSorted = useMemo(
    () => sortedProjects.filter(matchesSelected),
    [sortedProjects, matchesSelected]
  )

  // split featured vs. the rest (for the "All" view)
  const featuredSorted = useMemo(
    () => sortedProjects.filter(p => p.featured),
    [sortedProjects]
  )
  const nonFeaturedSorted = useMemo(
    () => sortedProjects.filter(p => !p.featured),
    [sortedProjects]
  )

  return (
    <Section
      id="projects"
      data-testid="projects-section"
      title="Featured Projects"
      description="A showcase of my recent work and side projects"
      padding="lg"
      className="relative bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900"
    >
      {/* Background accents */}
      <div className="absolute inset-0 -z-10">
        <div className="cyber-grid absolute inset-0" />
        <motion.div
          animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute right-20 top-20 h-32 w-32 rounded-lg border border-cyan-400/20"
        />
        <motion.div
          animate={{ rotate: [360, 0], scale: [1, 0.8, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-20 left-20 h-24 w-24 rounded-full border border-purple-400/20"
        />
      </div>

      <Container size="lg">
        {/* Filters */}
        <motion.div
          initial="hidden"
          animate="visible"
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

        {/* Featured only on "All" (no duplicates in grid) */}
        {selectedTag === 'All' && featuredSorted.length > 0 && (
          <motion.div
            initial="hidden"
            animate="visible"
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
              {featuredSorted.map((project, index) => (
                <motion.div key={project.slug} variants={staggerItem}>
                  <ProjectCard project={project} index={index} />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}

        {/* Filtered / All grid */}
        <motion.div
          initial={false}
          animate="visible"
          variants={staggerContainer}
        >
          {selectedTag !== 'All' && (
            <motion.div variants={staggerItem} className="mb-8">
              <h3 className="mb-2 text-2xl font-bold text-foreground">
                {selectedTag} Projects
              </h3>
              <p className="text-muted-foreground">
                {filteredSorted.length} project
                {filteredSorted.length !== 1 ? 's' : ''} found
              </p>
            </motion.div>
          )}

          {(() => {
            const list =
              selectedTag === 'All' ? nonFeaturedSorted : filteredSorted

            return list.length > 0 ? (
              <motion.div
                key={selectedTag} // force clean remount so new items are visible
                initial={false}
                animate="visible"
                variants={staggerContainer}
                className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
              >
                {list.map((project, index) => (
                  <motion.div key={project.slug} variants={staggerItem}>
                    <ProjectCard project={project} index={index} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div variants={staggerItem} className="py-12 text-center">
                <div className="mb-4 text-muted-foreground">
                  <p className="text-lg">
                    No projects found for “{selectedTag}”
                  </p>
                  <p className="text-sm">Try selecting a different filter</p>
                </div>
                <Button variant="outline" onClick={() => setSelectedTag('All')}>
                  Show All Projects
                </Button>
              </motion.div>
            )
          })()}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial="hidden"
          animate="visible"
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
