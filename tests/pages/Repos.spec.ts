import { test, expect } from '@playwright/test'

// Access app and go to Users page by clicking on 'Usuarios'link
test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000')

    await page.getByTestId('Repositórios').click()
})

test('Fill input and search for repos', async ({ page }) => {
    const responsePromise = () => page.waitForResponse('**/repos?*')

    await expect(page).toHaveURL(/.*repos/)

    const searchInput = page.getByPlaceholder('Pesquisar')

    searchInput.type('linux')

    await responsePromise()

    expect(page.getByText('Linux kernel source tree')).toBeDefined()
})
