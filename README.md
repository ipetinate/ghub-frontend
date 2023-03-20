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

## Instalação [VITEST]

> Como foi instalar o Vitest? Foi simples? Deu trabalho?

- Passo a passo:
  - Instalar os pacotes

    ```shell
    npm i -D vitest @vitejs/plugin-react @testing-library/react @testing-library/dom @testing-library/user-event
    ```

  - Criar o arquivo de configuração `vitest.config.ts`:

    ```javascript
    import react from '@vitejs/plugin-react'

    import { defineConfig } from 'vitest/config'

    export default defineConfig({
        plugins: [react()],
        test: {
            globals: true,
            environment: 'jsdom'
        }
    })

    ```

  - Configurar o `tsconfig.json` para enxergar os tipos globais, adicione a linha abaixo dentro do objeto `compilerOptions`

    ```json
    "types": ["vitest/globals"]
    ```

  - Adicionar scripts no `package.json`

    ```json
    {
        "test": "vitest",
        "coverage": "vitest run --coverage"
    }
    ```

  - Agora rode o comando

    ```shell
    npm run test
    ```

    - Vai ver o seguinte erro

        ![226350360-9018f07d-b04d-49db-832a-c35e5bba45d1](https://user-images.githubusercontent.com/15758789/226353001-45ee1a4d-fe7e-44c8-ba30-344f7ecd2e6f.png)

  - O vitest não vai conseguir entender os caminhos com `aliases` (`@/...`) que configuramos no init do Next, então precisamos adicionar seguinte trecho de código no objeto `test` do `vitest.config.js` pra resolver esse problema:

    ```javascript
    alias: {
        '@': path.resolve(__dirname, './src')
    },
    ```

    - O arquivo deve ficar assim:

        ```javascript
        import { defineConfig } from 'vitest/config'

        import path from 'path'
        import react from '@vitejs/plugin-react'

        export default defineConfig({
            plugins: [react()],
            test: {
                globals: true,
                environment: 'jsdom',
                alias: {
                    '@': path.resolve(__dirname, './src')
                },
            }
        })
        ```

  - Depois disso, tudo deve "funcionar", digo isso pois os problemas com o Vitest acabaram, mas temos que resolver os problemas com dependencias (esses problemas nos acompanham em qualquer framework). Como fizemos com o Jest, vamos fazer aqui, criar um arquivo com um `customRender()` que irá ter um Wrapper com os providers do projeto (React Query, NextRouter, etc) e o mock do NextRouter.

    ![Captura de Tela 2023-03-20 às 08 16 39](https://user-images.githubusercontent.com/15758789/226348345-68c7a2a1-75f2-4b81-abf3-4099d3d0a35d.png)

    ```tsx
    // test/index.tsx

    import type { PropsWithChildren } from 'react'

    import user from '@testing-library/user-event'
    import { render as rtlRender, RenderOptions } from '@testing-library/react'

    import { NextRouter } from 'next/router'
    import { RouterContext } from 'next/dist/shared/lib/router-context'

    import { createRouterMock } from './mocks/createRouterMock'
    import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

    type TestWrapperProps = {
        router?: Partial<NextRouter>
    }
    type CustomRenderProps = {
        router: Partial<NextRouter>
        options?: Omit<RenderOptions, 'wrapper'>
    }

    const AllProviders = ({
        children,
        router = {}
    }: PropsWithChildren<TestWrapperProps>) => (
        <RouterContext.Provider value={createRouterMock(router)}>
            <QueryClientProvider client={new QueryClient()}>
                {children}
            </QueryClientProvider>
        </RouterContext.Provider>
    )

    const customRender = (ui: JSX.Element, props?: CustomRenderProps) =>
        rtlRender(ui, {
            wrapper: ({ children }: PropsWithChildren) => (
                <AllProviders router={props?.router}>{children}</AllProviders>
            ),
            ...props?.options
        })

    export * from '@testing-library/react'
    export { user, customRender }
    ```

    ```ts
    // test/mocks/createRouterMock.ts

    import { vi } from 'vitest'
    import { NextRouter } from 'next/router'

    export function createRouterMock(router: Partial<NextRouter>): NextRouter {
        return {
            route: '/',
            asPath: '/',
            basePath: '',
            pathname: '/',
            defaultLocale: 'en',
            query: {},
            domainLocales: [],
            back: vi.fn(),
            push: vi
                .fn()
                .mockImplementation((path: string) =>
                    window?.history?.pushState({}, 'Test', path)
                ),
            reload: vi.fn(),
            replace: vi.fn(),
            forward: vi.fn(),
            prefetch: vi.fn(),
            beforePopState: vi.fn(),
            events: {
                on: vi.fn(),
                off: vi.fn(),
                emit: vi.fn()
            },
            isReady: true,
            isPreview: false,
            isFallback: false,
            isLocaleDomain: false,
            ...router
        }
    }
    ```

    - Fique atento ao detalhe: eu troquei o `jest.fn()` pelo `vi.fn()` do Vitest.

  - Agora vou trocar o render do RTL no meu teste inicial pelo `customRender` e tudo funciona como deveria.

    ![Captura de Tela 2023-03-20 às 08 20 22](https://user-images.githubusercontent.com/15758789/226348555-d5c36b61-c2dc-4197-ba0f-723ec4d9f618.png)
  
  - Começando a implementar os testes eu senti falta de alguns matchers que tinhamos no jest (através da `@testing-library/jest-dom`) e que faziam muito sentido, como  o `.toBeInTheDocument()` ou o `.toHaveValue()`, e para isso vou instalar essa lib e fazer a configuração para poder usar esses e outros matchers do `@testing-library/jest-dom`
    - Instalar o pacote

        ```shell
        npm i -D @testing-library/jest-dom
        ````

    - Criar um arquivo chamado `setupTests.ts` dentro da pasta `/test` e importar o pacote dentro dele

        ```ts
        // test/setupTests.ts

        import '@testing-library/jest-dom'
        ```

    - Registrar o arquivo `setupTests.ts` no arquivo de configuração do vitest, dentro do objeto `test`:

        ```ts
        setupFiles: './test/setupTests.ts'
        ```

      - O arquivo deve ficar assim:

        ```ts
        import { defineConfig } from 'vitest/config'

        import path from 'path'
        import react from '@vitejs/plugin-react'

        export default defineConfig({
            plugins: [react()],
            test: {
                globals: true,
                environment: 'jsdom',
                setupFiles: './test/setupTests.ts',
                alias: {
                    '@': path.resolve(__dirname, './src')
                },
            }
        })
        ```

  - Pronto, todos os nossos testes estão funcionando corretamente, inclusive, vou usar os mesmo testes que implementei no setup do jest.

    ![Captura de Tela 2023-03-20 às 10 13 27](https://user-images.githubusercontent.com/15758789/226349502-c9eba14f-2dca-45b3-9819-826fb9efe7e8.png)

## Desenvolvimento dos testes

> O que muda?O que notou? Como escrever testes com Vitest?

- Uma das primeiras coisas que notei, foi que o Vitest não possui o matcher `.toBeInTheDocument()` que o `@testing-library/jest-dom` fornece e normalmente configuramos no Jest. Apesar de ser um método bem intuitivo, como o nome sugere, podemos viver sem ele, e trocá-lo pelo `toBeDefined()` que tem efeito similar.
- Outro detalhe que vale citar, é que o Vitest não expõe os métodos `describe`, `test`/`it`, `expect` globalmente como o jest, ao invés disso precisamos importar nos arquivos de teste. Mas tem como fazer a configuração para que esses métodos fiquem disponíveis sem a necessidade de importa-los, e para isso só precisamos adicionar a chave/valor `globals: true` no arquivo de configuração do vitest e adicionar os tipos `vitest/globals` no `types` do `tsconfig.json` (como foi feito na configuração acima).
- Os mocks funcionaram normalmente apenas trocando o objeto root (de `jest` para `vi`, ex: `jest.fn()` virou `vi.fn()`)  
- Todos os testes que funcionavam no Jest, funcionaram normalmente no Vitest

## Considerações finais

- Como eu configurei o jest primeiro e o vitest depois, vou deixar registrado aqui minhas percepções.
- Instalar o jest foi bem trabalhoso, e posso destacar os seguintes pontos ruins:
  - A doc do Jest não é precisa, ela só serve para projetos Vanilla (JS puro)
  - Tem muitos guias na doc oficial o que faz com que você encha seu projeto de configurações na esperança de que tudo funcione
  - Na internet tem milhares de guias, tutoriais, etc, mostrando como configurar, mas poucos deles funcionam, devido as variações com versões entre jest, babel, ts-node, etc
  - O jest precisa de muitos pacotes extras para funcionar, o que faz com que a instalação seja pautada por diversos passos e configurações
  - Arquivos de imagens, componentes do Next e outras coisas não são interpretados pelo jest o que faz com que você precise implementar mocks e stubs para que as coisas funcionem

- O setup do vitest foi bem simples, ele funcionar _out-of-box_ com TS fez com tudo ficasse bem mais simples, e não foi necessário implementar aquele monte de mocks e setups para o Next, ele rodou tranquilo.
- A únicas configurações adicionais para o Vitest, foi o resolve de `aliases` para que entenda `@/path` e a adição dos matchers do `@testing-library/jest-dom`
