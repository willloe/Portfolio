import { render, screen, waitFor } from '@testing-library/react'
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

    expect(screen.getByLabelText(/name \*/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email \*/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/subject \*/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/message \*/i)).toBeInTheDocument()
  })

  it('validates required fields', async () => {
    const user = userEvent.setup()
    renderWithTheme(<ContactForm profile={mockProfile} />)

    await user.click(screen.getByRole('button', { name: /send message/i }))

    await waitFor(() => {
      expect(
        screen.getByText(/name must be at least 2 characters/i)
      ).toBeInTheDocument()
      expect(
        screen.getByText(/subject must be at least 5 characters/i)
      ).toBeInTheDocument()
      expect(
        screen.getByText(/message must be at least 10 characters/i)
      ).toBeInTheDocument()
    })
  })

  it('submits form with valid data', async () => {
    const user = userEvent.setup()
    renderWithTheme(<ContactForm profile={mockProfile} />)

    await user.type(screen.getByLabelText(/name \*/i), 'John Doe')
    await user.type(screen.getByLabelText(/email \*/i), 'john@example.com')
    await user.type(screen.getByLabelText(/subject \*/i), 'Test Subject')
    await user.type(
      screen.getByLabelText(/message \*/i),
      'This is a test message'
    )

    await user.click(screen.getByRole('button', { name: /send message/i }))

    await waitFor(() => {
      expect(screen.getByText(/sending\.\.\./i)).toBeInTheDocument()
    })
  })

  it('renders contact information (location + response time)', () => {
    renderWithTheme(<ContactForm profile={mockProfile} />)

    // Email is not displayed in the info panel in the current UI
    expect(screen.getByText(/san francisco, ca/i)).toBeInTheDocument()
    expect(screen.getByText(/within 24 hours/i)).toBeInTheDocument()
    expect(screen.getByText(/let's get in touch/i)).toBeInTheDocument()
  })
})
