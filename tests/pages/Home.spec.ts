import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000')
})

test.describe('Home Page', () => {
    test('Visit home', async ({ page }) => {
        await expect(page).toHaveTitle(/GHub/)

        const welcomeText = page.getByText('Olá, bem-vindo ao GHub')
        const subWelcomeText = page.getByText(
            'Encontre usuários ou repositórios do GitHub'
        )

        const usersLink = page.getByTestId('Usuários')
        const reposLink = page.getByTestId('Repositórios')

        expect(welcomeText).toBeDefined()
        expect(subWelcomeText).toBeDefined()

        expect(usersLink).toBeDefined()
        expect(reposLink).toBeDefined()
    })

    test('On home, visit Users page', async ({ page }) => {
        await page.goto('http://localhost:3000')

        // Click the get started link.
        await page.getByTestId('Usuários').click()

        // Expects the URL to contain intro.
        await expect(page).toHaveURL(/.*users/)
    })

    test('On home, visit Repos page', async ({ page }) => {
        await page.goto('http://localhost:3000')

        // Click the get started link.
        await page.getByTestId('Repositórios').click()

        // Expects the URL to contain intro.
        await expect(page).toHaveURL(/.*repos/)
    })
})
