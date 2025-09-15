import { Hero } from '@/features/hero/hero'
import { About } from '@/features/about/about'
import { Projects } from '@/features/projects/projects'
import { Experience } from '@/features/experience/experience'
// import { Skills } from '@/features/skills/skills'
import { Contact } from '@/features/contact/contact'
import {
  Profile,
  Project,
  Experience as ExperienceType,
  Skill,
} from '@/lib/schemas'

interface HomePageProps {
  profile: Profile
  projects: Project[]
  experiences: ExperienceType[]
  skills: Skill[]
}

export function HomePage({
  profile,
  projects,
  experiences,
  // skills,
}: HomePageProps) {
  return (
    <>
      <Hero profile={profile} />
      <About profile={profile} />
      <Projects projects={projects} />
      <Experience experiences={experiences} />
      {/* <Skills skills={skills} /> */}
      <Contact profile={profile} />
    </>
  )
}
