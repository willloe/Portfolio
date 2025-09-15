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
  // avatar is optional in the component, so we can omit it here safely
}

const renderWithTheme = (component: React.ReactElement) =>
  render(<ThemeProvider>{component}</ThemeProvider>)

describe('Hero', () => {
  it('renders profile information', () => {
    renderWithTheme(<Hero profile={mockProfile as any} />)

    expect(screen.getByText(/hello, i'm/i)).toBeInTheDocument()
    expect(screen.getByText(/john doe/i)).toBeInTheDocument()
    expect(screen.getByText(/software engineer/i)).toBeInTheDocument()
    expect(screen.getByText(/san francisco, ca/i)).toBeInTheDocument()

    // avatar uses alt={profile.name}
    expect(screen.getByAltText(/john doe/i)).toBeInTheDocument()
  })

  it('renders call-to-action buttons (resume is conditional)', () => {
    renderWithTheme(<Hero profile={mockProfile as any} />)

    expect(
      screen.getByRole('button', { name: /view my work/i })
    ).toBeInTheDocument()
    // No resume link because profile.resume is not provided
    expect(screen.queryByText(/download resume/i)).not.toBeInTheDocument()
  })

  it('renders scroll indicator', () => {
    renderWithTheme(<Hero profile={mockProfile as any} />)
    expect(screen.getByText(/scroll to explore/i)).toBeInTheDocument()
  })
})
