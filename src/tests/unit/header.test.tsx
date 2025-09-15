import { render, screen } from '@testing-library/react'
import { Header } from '@/components/layout/header'
import { ThemeProvider } from '@/lib/theme'

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>)
}

describe('Header', () => {
  it('renders navigation items', () => {
    renderWithTheme(<Header />)

    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Projects')).toBeInTheDocument()
    expect(screen.getByText('Experience')).toBeInTheDocument()
    expect(screen.getByText('Skills')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })

  it('renders logo', () => {
    renderWithTheme(<Header />)
    expect(screen.getByText('WL')).toBeInTheDocument()
  })

  it('renders theme toggle button', () => {
    renderWithTheme(<Header />)
    expect(screen.getByLabelText('Toggle theme')).toBeInTheDocument()
  })

  it('renders mobile menu button', () => {
    renderWithTheme(<Header />)
    expect(screen.getByLabelText('Toggle menu')).toBeInTheDocument()
  })
})
