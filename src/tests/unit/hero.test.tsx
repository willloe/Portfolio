import { render, screen } from '@testing-library/react'
import { Hero } from '@/features/hero/hero'
import { ThemeProvider } from '@/lib/theme'

const mockProfile = {
  name: 'John Doe',
  role: 'Software Engineer',
  location: 'San Francisco, CA',
  email: 'john@example.com',
  headline: 'Building amazing web experiences',
  summary: 'Passionate developer with 5+ years of experience',
  socials: [],
}

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>)
}

describe('Hero', () => {
  it('renders profile information', () => {
    renderWithTheme(<Hero profile={mockProfile} />)

    expect(screen.getByText("Hello, I'm")).toBeInTheDocument()
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('Software Engineer')).toBeInTheDocument()
    expect(
      screen.getByText('Building amazing web experiences')
    ).toBeInTheDocument()
    expect(screen.getByText('San Francisco, CA')).toBeInTheDocument()
  })

  it('renders call-to-action buttons', () => {
    renderWithTheme(<Hero profile={mockProfile} />)

    expect(screen.getByText('View My Work')).toBeInTheDocument()
    expect(screen.getByText('Download Resume')).toBeInTheDocument()
  })

  it('renders scroll indicator', () => {
    renderWithTheme(<Hero profile={mockProfile} />)

    expect(screen.getByText('Scroll to explore')).toBeInTheDocument()
  })
})
