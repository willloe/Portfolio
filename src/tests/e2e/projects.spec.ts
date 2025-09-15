import { test, expect } from '@playwright/test'

test.describe('Projects Page', () => {
  test('displays projects correctly', async ({ page }) => {
    await page.goto('/#projects')

    // Check that projects are displayed
    await expect(page.locator('[data-testid="project-card"]')).toHaveCount(6)

    // Check for featured projects
    await expect(page.locator('text=Featured Work')).toBeVisible()

    // Check for project filters
    await expect(page.locator('text=All')).toBeVisible()
    await expect(page.locator('text=React')).toBeVisible()
    await expect(page.locator('text=TypeScript')).toBeVisible()
  })

  test('project filtering works', async ({ page }) => {
    await page.goto('/#projects')

    // Filter by React
    await page.click('text=React')

    // Check that only React projects are shown
    await expect(page.locator('[data-testid="project-card"]')).toHaveCount(4)

    // Filter by All
    await page.click('text=All')

    // Check that all projects are shown
    await expect(page.locator('[data-testid="project-card"]')).toHaveCount(6)
  })

  test('project cards are interactive', async ({ page }) => {
    await page.goto('/#projects')

    // Hover over a project card
    const projectCard = page.locator('[data-testid="project-card"]').first()
    await projectCard.hover()

    // Check that hover effects are applied
    await expect(projectCard).toHaveClass(/group-hover/)
  })

  test('project links work', async ({ page }) => {
    await page.goto('/#projects')

    // Check for demo and repo links
    const demoLinks = page.locator('a[href*="demo"]')
    const repoLinks = page.locator('a[href*="github"]')

    await expect(demoLinks).toHaveCount(4)
    await expect(repoLinks).toHaveCount(6)
  })
})
