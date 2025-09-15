import { motion } from 'framer-motion'
import {
  Calendar,
  MapPin,
  ExternalLink,
  Briefcase,
  GraduationCap,
  Heart,
  Code,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Section } from '@/components/layout/section'
import { Container } from '@/components/layout/container'
import { cn } from '@/lib/utils'
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/motion'
import { Experience as ExperienceType } from '@/lib/schemas'
import { formatDateRange } from '@/lib/utils'

interface ExperienceProps {
  experiences: ExperienceType[]
}

const typeIcons = {
  work: Briefcase,
  education: GraduationCap,
  volunteer: Heart,
  freelance: Code,
}

const typeColors = {
  work: 'bg-blue-500',
  education: 'bg-green-500',
  volunteer: 'bg-purple-500',
  freelance: 'bg-orange-500',
}

export function Experience({ experiences }: ExperienceProps) {
  const sortedExperiences = [...experiences].sort((a, b) => {
    if (a.current && !b.current) return -1
    if (!a.current && b.current) return 1
    return new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  })

  return (
    <Section
      id="experience"
      title="Experience & Education"
      description="My professional journey and educational background"
      padding="lg"
      background="muted"
    >
      <Container size="lg">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="relative"
        >
          {/* Timeline Line */}
          <div className="absolute bottom-0 left-8 top-0 hidden w-0.5 bg-border md:block" />

          {/* Timeline Items */}
          <div className="space-y-8">
            {sortedExperiences.map((experience, index) => {
              const Icon = typeIcons[experience.type]
              const colorClass = typeColors[experience.type]

              return (
                <motion.div
                  key={experience.id}
                  variants={staggerItem}
                  className="relative flex items-start gap-6"
                >
                  {/* Timeline Dot */}
                  <div className="relative flex-shrink-0">
                    <div
                      className={cn(
                        'flex h-16 w-16 items-center justify-center rounded-full text-white shadow-lg',
                        colorClass
                      )}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    {index < sortedExperiences.length - 1 && (
                      <div className="absolute left-1/2 top-16 hidden h-8 w-0.5 -translate-x-1/2 transform bg-border md:block" />
                    )}
                  </div>

                  {/* Content */}
                  <motion.div variants={fadeInUp} className="min-w-0 flex-1">
                    <Card className="card-interactive">
                      <CardContent className="p-6">
                        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                          <div className="flex-1">
                            <h3 className="mb-1 text-xl font-semibold text-foreground">
                              {experience.role}
                            </h3>
                            <div className="mb-2 flex items-center gap-2 text-lg font-medium text-primary">
                              {experience.logo && (
                                <img
                                  src={experience.logo}
                                  alt={experience.company}
                                  className="h-6 w-6 rounded object-cover"
                                />
                              )}
                              <span>{experience.company}</span>
                              {experience.website && (
                                <a
                                  href={experience.website}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-muted-foreground transition-colors hover:text-primary"
                                >
                                  <ExternalLink className="h-4 w-4" />
                                </a>
                              )}
                            </div>
                            {experience.location && (
                              <div className="mb-2 flex items-center gap-1 text-sm text-muted-foreground">
                                <MapPin className="h-4 w-4" />
                                <span>{experience.location}</span>
                              </div>
                            )}
                          </div>
                          <div className="flex flex-col gap-2 sm:items-end">
                            <Badge variant="outline" className="text-xs">
                              {experience.type.replace('-', ' ')}
                            </Badge>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Calendar className="h-4 w-4" />
                              <span>
                                {formatDateRange(
                                  experience.startDate,
                                  experience.endDate
                                )}
                                {experience.current && (
                                  <Badge
                                    variant="success"
                                    className="ml-2 text-xs"
                                  >
                                    Current
                                  </Badge>
                                )}
                              </span>
                            </div>
                          </div>
                        </div>

                        {experience.description && (
                          <p className="mb-4 leading-relaxed text-muted-foreground">
                            {experience.description}
                          </p>
                        )}

                        {experience.highlights &&
                          experience.highlights.length > 0 && (
                            <div className="space-y-2">
                              <h4 className="text-sm font-medium text-foreground">
                                Key Achievements
                              </h4>
                              <ul className="space-y-1">
                                {experience.highlights.map((highlight, idx) => (
                                  <li
                                    key={idx}
                                    className="flex items-start gap-2 text-sm text-muted-foreground"
                                  >
                                    <div className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                                    {highlight}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </Container>
    </Section>
  )
}
