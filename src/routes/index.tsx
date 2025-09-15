import { createBrowserRouter } from 'react-router-dom'
import { HomePage } from '@/pages/home'
import { ProjectDetailPage } from '@/pages/project-detail'
import { NotFoundPage } from '@/pages/not-found'
import { Layout } from '@/components/layout/layout'

// Import data (in a real app, this would come from an API)
import profileData from '@/data/profile.json'
import projectsData from '@/data/projects.json'
import experienceData from '@/data/experience.json'
import skillsData from '@/data/skills.json'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <HomePage
            profile={profileData}
            projects={projectsData}
            experiences={experienceData}
            skills={skillsData}
          />
        ),
      },
      {
        path: 'projects/:slug',
        element: <ProjectDetailPage projects={projectsData} />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
])
