import { test, expect } from '@playwright/test'

test.describe('Home Page', () => {
  test('loads home page without errors', async ({ page }) => {
    await page.goto('/')

    // Check that the page loads without console errors
    const errors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text())
      }
    })

    await page.waitForLoadState('networkidle')

    // Verify main sections are present
    await expect(page.locator('h1')).toContainText('William C. Loe')
    await expect(page.locator('[data-testid="hero-section"]')).toBeVisible()
    await expect(page.locator('[data-testid="about-section"]')).toBeVisible()
    await expect(page.locator('[data-testid="projects-section"]')).toBeVisible()

    // Check for console errors
    expect(errors).toHaveLength(0)
  })

  test('navigation works correctly', async ({ page }) => {
    await page.goto('/')

    // Test navigation links
    await page.click('text=About')
    await expect(page.locator('#about')).toBeInViewport()

    await page.click('text=Projects')
    await expect(page.locator('#projects')).toBeInViewport()

    await page.click('text=Contact')
    await expect(page.locator('#contact')).toBeInViewport()
  })

  test('theme toggle works and persists', async ({ page }) => {
    await page.goto('/')

    // Check initial theme
    const html = page.locator('html')
    await expect(html).toHaveClass(/light/)

    // Toggle theme
    await page.click('[aria-label="Toggle theme"]')
    await expect(html).toHaveClass(/dark/)

    // Reload page and check persistence
    await page.reload()
    await expect(html).toHaveClass(/dark/)
  })

  test('mobile menu works', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')

    // Open mobile menu
    await page.click('[aria-label="Toggle menu"]')
    await expect(page.locator('text=About')).toBeVisible()

    // Close mobile menu
    await page.click('[aria-label="Toggle menu"]')
    await expect(page.locator('text=About')).not.toBeVisible()
  })

  test('contact form validation works', async ({ page }) => {
    await page.goto('/#contact')

    // Try to submit empty form
    await page.click('text=Send Message')

    // Check validation messages
    await expect(
      page.locator('text=Name must be at least 2 characters')
    ).toBeVisible()
    await expect(page.locator('text=Invalid email address')).toBeVisible()
    await expect(
      page.locator('text=Subject must be at least 5 characters')
    ).toBeVisible()
    await expect(
      page.locator('text=Message must be at least 10 characters')
    ).toBeVisible()
  })

  test('contact form submission works', async ({ page }) => {
    await page.goto('/#contact')

    // Fill out form
    await page.fill('[name="name"]', 'John Doe')
    await page.fill('[name="email"]', 'john@example.com')
    await page.fill('[name="subject"]', 'Test Subject')
    await page.fill('[name="message"]', 'This is a test message')

    // Submit form
    await page.click('text=Send Message')

    // Check for success message
    await expect(page.locator('text=Message sent successfully!')).toBeVisible()
  })
})
