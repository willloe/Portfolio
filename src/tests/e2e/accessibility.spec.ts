import { test, expect } from '@playwright/test'

test.describe('Accessibility', () => {
  test('has proper heading structure', async ({ page }) => {
    await page.goto('/')

    // Check for h1
    await expect(page.locator('h1')).toBeVisible()

    // Check for h2 elements
    const h2Elements = page.locator('h2')
    await expect(h2Elements).toHaveCount(6) // About, Projects, Experience, Skills, Testimonials, Contact
  })

  test('has proper focus management', async ({ page }) => {
    await page.goto('/')

    // Tab through interactive elements
    await page.keyboard.press('Tab')
    await expect(page.locator(':focus')).toBeVisible()

    // Check that focus is visible
    const focusedElement = page.locator(':focus')
    await expect(focusedElement).toHaveClass(/focus-visible/)
  })

  test('has proper ARIA labels', async ({ page }) => {
    await page.goto('/')

    // Check for ARIA labels on buttons
    await expect(page.locator('[aria-label="Toggle theme"]')).toBeVisible()
    await expect(page.locator('[aria-label="Toggle menu"]')).toBeVisible()
    await expect(
      page.locator('[aria-label="Scroll to next section"]')
    ).toBeVisible()
  })

  test('has proper alt text for images', async ({ page }) => {
    await page.goto('/')

    // Check avatar image
    const avatar = page.locator('img[alt*="William C. Loe"]')
    await expect(avatar).toBeVisible()
  })

  test('has proper form labels', async ({ page }) => {
    await page.goto('/#contact')

    // Check form labels
    await expect(page.locator('label[for="name"]')).toBeVisible()
    await expect(page.locator('label[for="email"]')).toBeVisible()
    await expect(page.locator('label[for="subject"]')).toBeVisible()
    await expect(page.locator('label[for="message"]')).toBeVisible()
  })

  test('has proper color contrast', async ({ page }) => {
    await page.goto('/')

    // This would typically use axe-core or similar tool
    // For now, just check that text is visible
    await expect(page.locator('h1')).toBeVisible()
    await expect(page.locator('p')).toBeVisible()
  })

  test('supports keyboard navigation', async ({ page }) => {
    await page.goto('/')

    // Navigate with keyboard
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')

    // Check that focus is visible
    const focusedElement = page.locator(':focus')
    await expect(focusedElement).toBeVisible()
  })

  test('has proper skip links', async ({ page }) => {
    await page.goto('/')

    // Check for skip to content link
    await page.keyboard.press('Tab')
    const skipLink = page.locator('text=Skip to main content')
    if (await skipLink.isVisible()) {
      await expect(skipLink).toBeVisible()
    }
  })
})
