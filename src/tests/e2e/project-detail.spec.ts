import { test, expect } from '@playwright/test'

test.describe('Project Detail Page', () => {
  test('loads project detail page', async ({ page }) => {
    await page.goto('/projects/ai-chat-platform')

    // Check that project details are displayed
    await expect(page.locator('h1')).toContainText('AI Chat Platform')
    await expect(
      page.locator('text=Real-time messaging with WebSocket integration')
    ).toBeVisible()

    // Check for project links
    await expect(page.locator('text=View Live Demo')).toBeVisible()
    await expect(page.locator('text=View Source Code')).toBeVisible()
  })

  test('displays project information correctly', async ({ page }) => {
    await page.goto('/projects/ai-chat-platform')

    // Check project status
    await expect(page.locator('text=completed')).toBeVisible()

    // Check technologies
    await expect(page.locator('text=React')).toBeVisible()
    await expect(page.locator('text=TypeScript')).toBeVisible()
    await expect(page.locator('text=Node.js')).toBeVisible()

    // Check timeline
    await expect(page.locator('text=Jun 2023 - Dec 2023')).toBeVisible()
  })

  test('back navigation works', async ({ page }) => {
    await page.goto('/projects/ai-chat-platform')

    // Click back button
    await page.click('text=Back to Projects')

    // Should navigate back to home page
    await expect(page).toHaveURL('/')
  })

  test('handles non-existent project', async ({ page }) => {
    await page.goto('/projects/non-existent-project')

    // Check for 404 message
    await expect(page.locator('text=Project Not Found')).toBeVisible()
    await expect(page.locator('text=Back to Home')).toBeVisible()
  })
})
