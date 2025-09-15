import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ContactForm } from '@/features/contact/contact-form'
import { ThemeProvider } from '@/lib/theme'

const mockProfile = {
  name: 'John Doe',
  email: 'john@example.com',
  location: 'San Francisco, CA',
}

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>)
}

describe('ContactForm', () => {
  it('renders form fields', () => {
    renderWithTheme(<ContactForm profile={mockProfile} />)

    expect(screen.getByLabelText('Name *')).toBeInTheDocument()
    expect(screen.getByLabelText('Email *')).toBeInTheDocument()
    expect(screen.getByLabelText('Subject *')).toBeInTheDocument()
    expect(screen.getByLabelText('Message *')).toBeInTheDocument()
    expect(screen.getByLabelText('Company')).toBeInTheDocument()
    expect(screen.getByLabelText('Budget')).toBeInTheDocument()
  })

  it('validates required fields', async () => {
    const user = userEvent.setup()
    renderWithTheme(<ContactForm profile={mockProfile} />)

    const submitButton = screen.getByText('Send Message')
    await user.click(submitButton)

    await waitFor(() => {
      expect(
        screen.getByText('Name must be at least 2 characters')
      ).toBeInTheDocument()
      expect(screen.getByText('Invalid email address')).toBeInTheDocument()
      expect(
        screen.getByText('Subject must be at least 5 characters')
      ).toBeInTheDocument()
      expect(
        screen.getByText('Message must be at least 10 characters')
      ).toBeInTheDocument()
    })
  })

  it('submits form with valid data', async () => {
    const user = userEvent.setup()
    renderWithTheme(<ContactForm profile={mockProfile} />)

    await user.type(screen.getByLabelText('Name *'), 'John Doe')
    await user.type(screen.getByLabelText('Email *'), 'john@example.com')
    await user.type(screen.getByLabelText('Subject *'), 'Test Subject')
    await user.type(
      screen.getByLabelText('Message *'),
      'This is a test message'
    )

    const submitButton = screen.getByText('Send Message')
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('Sending...')).toBeInTheDocument()
    })
  })

  it('renders contact information', () => {
    renderWithTheme(<ContactForm profile={mockProfile} />)

    expect(screen.getByText('john@example.com')).toBeInTheDocument()
    expect(screen.getByText('San Francisco, CA')).toBeInTheDocument()
    expect(screen.getByText('Within 24 hours')).toBeInTheDocument()
  })
})
