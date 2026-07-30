import { test, expect } from '@playwright/test'

test.describe('Live Chat', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
  })

  test('opens chat panel when clicking floating button', async ({ page }) => {
    await page.getByRole('button', { name: /open live chat/i }).click()
    await expect(page.getByPlaceholder('Ask me anything...')).toBeVisible()
  })

  test('sends message and receives response (portfolio question)', async ({ page }) => {
    await page.getByRole('button', { name: /open live chat/i }).click()
    await page.getByPlaceholder('Ask me anything...').fill('What do you do?')
    await page.getByRole('button', { name: /send/i }).click()

    await page.waitForTimeout(4000)
    const botMessages = page.locator('.bg-muted')
    await expect(botMessages.last()).toBeVisible({ timeout: 20000 })
    const text = await botMessages.last().textContent()
    expect(text).toMatch(/Full-Stack|skills|developer|create|digital/i)
  })

  test('sends message and receives response (general question)', async ({ page }) => {
    await page.getByRole('button', { name: /open live chat/i }).click()
    await page.getByPlaceholder('Ask me anything...').fill('What is the capital of France?')
    await page.getByRole('button', { name: /send/i }).click()

    await page.waitForTimeout(4000)
    const botMessages = page.locator('.bg-muted')
    await expect(botMessages.last()).toBeVisible({ timeout: 20000 })
    const lastText = await botMessages.last().textContent()
    expect(lastText).toMatch(/Paris|capital|France|smart bot|API key/i)
  })

  test('sends message and receives response (math)', async ({ page }) => {
    await page.getByRole('button', { name: /open live chat/i }).click()
    await page.getByPlaceholder('Ask me anything...').fill('What is 15 * 20?')
    await page.getByRole('button', { name: /send/i }).click()

    await page.waitForTimeout(4000)
    const botMessages = page.locator('.bg-muted')
    await expect(botMessages.last()).toBeVisible({ timeout: 20000 })
    const text = await botMessages.last().textContent()
    expect(text).toMatch(/300|answer/i)
  })

  test('answers mobile app question', async ({ page }) => {
    await page.getByRole('button', { name: /open live chat/i }).click()
    await page.getByPlaceholder('Ask me anything...').fill('what did you understand about Mobile App')
    await page.getByRole('button', { name: /send/i }).click()

    await page.waitForTimeout(4000)
    const botMessages = page.locator('.bg-muted')
    await expect(botMessages.last()).toBeVisible({ timeout: 20000 })
    const text = await botMessages.last().textContent()
    expect(text).toMatch(/mobile|app|Full-Stack|PWA|React|skills|projects/i)
  })

  test('quick question buttons work', async ({ page }) => {
    await page.getByRole('button', { name: /open live chat/i }).click()
    await page.getByRole('button', { name: 'What do you do?' }).click()

    await page.waitForTimeout(4000)
    const userBubble = page.locator('.bg-primary').filter({ hasText: 'What do you do?' })
    await expect(userBubble).toBeVisible()
    await expect(page.locator('.bg-muted').last()).toBeVisible({ timeout: 20000 })
  })
})
