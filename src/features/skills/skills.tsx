import { motion } from 'framer-motion'
import {
  Code,
  Database,
  Cloud,
  Smartphone,
  Palette,
  TestTube,
  Brain,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Section } from '@/components/layout/section'
import { Container } from '@/components/layout/container'
import { cn } from '@/lib/utils'
import {
  fadeInUp,
  staggerContainer,
  staggerItem,
  cardHover,
} from '@/lib/motion'
import { isReducedMotion } from '@/lib/utils'
import { Skill } from '@/lib/schemas'

interface SkillsProps {
  skills: Skill[]
}

const categoryIcons = {
  'Frontend Development': Code,
  'Backend Development': Code,
  Databases: Database,
  'Cloud & DevOps': Cloud,
  'Mobile Development': Smartphone,
  'Design & Tools': Palette,
  Testing: TestTube,
  'AI & Machine Learning': Brain,
}

const levelColors = {
  beginner: 'bg-red-500',
  intermediate: 'bg-yellow-500',
  advanced: 'bg-blue-500',
  expert: 'bg-green-500',
}

const levelProgress = {
  beginner: 25,
  intermediate: 50,
  advanced: 75,
  expert: 100,
}

export function Skills({ skills }: SkillsProps) {
  const reducedMotion = isReducedMotion()

  return (
    <Section
      id="skills"
      title="Skills & Expertise"
      description="Technologies and tools I work with"
      padding="lg"
    >
      <Container size="lg">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {skills.map((skill, categoryIndex) => {
            const Icon =
              categoryIcons[skill.category as keyof typeof categoryIcons] ||
              Code

            return (
              <motion.div
                key={skill.category}
                variants={staggerItem}
                whileHover={reducedMotion ? {} : { y: -5 }}
                className="group"
              >
                <Card className="card-interactive h-full">
                  <CardHeader className="pb-4">
                    <div className="mb-2 flex items-center gap-3">
                      <div className="rounded-lg bg-primary/10 p-2">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle className="text-lg">
                        {skill.category}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {skill.items.map((item, itemIndex) => (
                      <motion.div
                        key={item.name}
                        variants={fadeInUp}
                        transition={{ delay: itemIndex * 0.1 }}
                        className="space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-foreground">
                            {item.name}
                          </span>
                          <div className="flex items-center gap-2">
                            {item.level && (
                              <Badge
                                variant="outline"
                                className={cn(
                                  'text-xs',
                                  levelColors[item.level] &&
                                    `border-current text-current`
                                )}
                              >
                                {item.level}
                              </Badge>
                            )}
                            {item.years && (
                              <span className="text-xs text-muted-foreground">
                                {item.years}y
                              </span>
                            )}
                          </div>
                        </div>

                        {item.level && (
                          <Progress
                            value={levelProgress[item.level]}
                            className="h-2"
                          />
                        )}

                        {item.description && (
                          <p className="text-xs text-muted-foreground">
                            {item.description}
                          </p>
                        )}
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Skills Summary */}
        <motion.div variants={staggerItem} className="mt-16 text-center">
          <Card className="card-elevated">
            <CardContent className="p-8">
              <h3 className="mb-4 text-2xl font-bold text-foreground">
                Always Learning
              </h3>
              <p className="mx-auto mb-6 max-w-2xl text-muted-foreground">
                I'm passionate about staying up-to-date with the latest
                technologies and best practices. I believe in continuous
                learning and regularly explore new tools and frameworks to
                improve my skills.
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {[
                  'TypeScript',
                  'React',
                  'Node.js',
                  'Python',
                  'AWS',
                  'Docker',
                  'AI/ML',
                ].map(tech => (
                  <Badge key={tech} variant="secondary" className="text-sm">
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </Container>
    </Section>
  )
}
