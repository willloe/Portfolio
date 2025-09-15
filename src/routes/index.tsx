import { createBrowserRouter } from 'react-router-dom'
import { HomePage } from '@/pages/home'
import { ProjectDetailPage } from '@/pages/project-detail'
import { NotFoundPage } from '@/pages/not-found'
import { Layout } from '@/components/layout/layout'

import profileData from '@/data/profile.json'
import projectsData from '@/data/projects.json'
import experienceData from '@/data/experience.json'
import skillsData from '@/data/skills.json'

// Add these types
import type { Profile, Project, Experience, Skill } from '@/lib/schemas'

// Vite typing via tsconfig.build.json -> types:["vite/client"]
const basename = '/'

// Provide a fallback email so Profile satisfies the type
const profile: Profile = { email: '', ...(profileData as any) }

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <HomePage
              profile={profile}
              projects={projectsData as unknown as Project[]}
              experiences={experienceData as unknown as Experience[]}
              skills={skillsData as unknown as Skill[]}
            />
          ),
        },
        {
          path: 'projects/:slug',
          element: (
            <ProjectDetailPage
              projects={projectsData as unknown as Project[]}
            />
          ),
        },
        { path: '*', element: <NotFoundPage /> },
      ],
    },
  ],
  { basename }
)
