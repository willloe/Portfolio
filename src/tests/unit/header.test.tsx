import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Header } from '@/components/layout/header'
import { ThemeProvider } from '@/lib/theme'

const renderWithTheme = (component: React.ReactElement) =>
  render(<ThemeProvider>{component}</ThemeProvider>)

describe('Header', () => {
  const navItems = ['Home', 'About', 'Projects', 'Experience', 'Contact']

  it('renders desktop navigation items', () => {
    renderWithTheme(<Header />)
    navItems.forEach(label => {
      expect(screen.getByRole('button', { name: label })).toBeInTheDocument()
    })
  })

  it('renders logo', () => {
    renderWithTheme(<Header />)
    expect(screen.getByText('WL')).toBeInTheDocument()
  })

  it('renders theme toggle and mobile menu buttons', () => {
    renderWithTheme(<Header />)
    expect(screen.getByLabelText(/toggle theme/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/toggle menu/i)).toBeInTheDocument()
  })

  it('renders mobile navigation items when menu is opened', async () => {
    const user = userEvent.setup()
    renderWithTheme(<Header />)

    await user.click(screen.getByLabelText(/toggle menu/i))

    navItems.forEach(label => {
      // items appear again inside the mobile sheet
      expect(screen.getAllByText(label).length).toBeGreaterThan(0)
    })
  })
})
