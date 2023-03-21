# GHub

> Pesquise repositórios e usuários do GitHub.

## Objetivo

> Motivação para criar o projeto

- Este projeto foi criado como exemplo para uma decisão técnica sobre a escolha de ferramentas de teste.
- Irei criar branchs separadas para testar diferentes implementações de bibliotecas de teste, como exemplo o Vitest, Cypress, Jest, Axios Mock Adapter, MSW, Playwright.

## Tecnologias

> O que foi utilizado neste exemplo?

- [Next.js](https://nextjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [HeroIcons](https://heroicons.com/)
- [HeadlessUI](https://headlessui.com/)
- [Flowbite](https://flowbite-react.com/)
- [Axios](https://axios-http.com/)
- [React Query](https://tanstack.com/query/latest)
- [Zustand](https://github.com/pmndrs/zustand)
- [Lodash](https://lodash.com/)

## Instalação [PLAYWRIGHT]

> Como foi instalar o playwright? O que achei de implementar testes como ele?

1. Executar comando de `init` para configurar o ambiente de testes

    ```shell
    # npm
    npm init playwright@latest

    # yarn
    yarn create playwright

    # pnpm
    pnpm dlx create-playwright
    ```

    1. O comando acima, fará algumas perguntas:
       1. Aonde você quer por os testes: escolhi a pasta `tests` na raiz, igual ele sugere por padrão.
       2. Se quer configurar o fluxo do Github Actions: eu não quis, pois não irei utilizar o GH Actions, mas caso queira, é só apertar `y`
       3. Instalar browsers do Playwright: eu escolhi sim

        ![Captura de Tela 2023-03-21 às 07 41 39](https://user-images.githubusercontent.com/15758789/226583839-fdc657d6-91e4-4113-9f25-6ff1d3ca7a89.png)

    2. Após a execução do terminal concluir, alguns arquivos serão criados no seu projeto:

        ![Captura de Tela 2023-03-21 às 07 47 19](https://user-images.githubusercontent.com/15758789/226584197-8737a56d-7b11-418a-86b9-20096a51a196.png)
2. Como o Playwright é uma tecnologia desenvolvida pela Microsoft, o VS Code possui uma extensão dedicada para ele. E após o a configuração ele irá sugerir que você instale a extensão oficial, caso queira, clique em `install`

    ![Captura de Tela 2023-03-21 às 07 51 21](https://user-images.githubusercontent.com/15758789/226585038-fe2c78cb-371d-4d0f-80f8-c3199ccc778a.png)

    ![Captura de Tela 2023-03-21 às 07 53 45](https://user-images.githubusercontent.com/15758789/226585575-28a7af45-6e7b-4d68-80ff-3e114cab934c.png)

3. Execução dos testes
   1. Vamos adicionar um comando para executar nossos testes, adicione a linha abaixo na seção `scripts` do seu `package.json`

        ```json
        "test:e2e": "playwright test"
        ```

   2. Execute o comando em um terminal

        ```shell
        npm run test:e2e
        ```

        ![Captura de Tela 2023-03-21 às 07 57 22](https://user-images.githubusercontent.com/15758789/226586390-50c5954e-d2c2-4959-b550-a88c59d40dbc.png)

   3. Os testes de exemplo executaram com sucesso (agora podemos implementar nossos testes e ver se tudo está funcionando corretamente)

        ![image](https://user-images.githubusercontent.com/15758789/226586610-ca384a6e-5cdb-4fcf-b8dd-5e81a5500225.png)
4. Implementar nossos testes
   1. Home

        ```ts
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
                await expect(page).toHaveURL(/.*users/)
            })
        })
        ```

## Plugin do VSCode

> Experiência utilizando o plugin oficial

- Gostei do plugin, como o Playwright aparentemente (ao menos não achei nada sobre) não possui um modo de `watch`, o plugin facilita a execução dos testes, e evita ficar usando o terminal o tempo todo.
- Como pode ser visto na imagem abaixo, o plugin é bem completo, tem um menu lateral que agrega os testes, e ao abrir o arquivo ele mostra um ícone para executar aquele bloco de teste. E quando executa com sucesso, ele mostra um ícone de sucesso ao lado do teste.

    ![Captura de Tela 2023-03-21 às 09 49 48](https://user-images.githubusercontent.com/15758789/226610960-ea032b93-d8ea-40b7-bf47-9470f3508aea.png)

    <https://user-images.githubusercontent.com/15758789/226628170-a1efd264-8ffe-4349-9017-5b080cd0a07d.mov>

## Problemas e Erros

1. O locator `getByRole()` não encontra os links da home page, apesar de estarem acessíveis, e o Cypress ter conseguido localizá-los normalmente, tentei várias abordagens, mas não funciona. No lugar eu utilizei o `.getByTestId()` (não queria, mas foi o que funcionou).
2. O matcher `.tobeInViewport()` não funcionou com as queries que eu estava fazendo, não sei se foi uso errado, ou se algo precisava ser configurado, no lugar usei `.toBeDefined()` (mas não sei sobre a eficacia).
