import { test, expect } from '@playwright/test'

// Access app and go to Users page by clicking on 'Usuarios'link
test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000')

    await page.getByTestId('Usuários').click()
})

test('Fill input and search for user', async ({ page }) => {
    const responsePromise = () =>
        page.waitForResponse('https://api.github.com/users/*')

    await expect(page).toHaveURL(/.*users/)

    const searchInput = page.getByPlaceholder('Pesquisar')

    searchInput.type('torvalds')

    await responsePromise()

    expect(page.getByText('Linus Torvalds')).toBeDefined()
    expect(page.getByText('Linux Foundation')).toBeDefined()
})
