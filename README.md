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

# Instalação [CYPRESS]

> Como faz para configurar e rodar os testes e2e com Cy?

1. Instalar pacote do cypress

    ```shell
    # npm
    npm i -D cypress

    # yarn
    yarn add -D cypress
    ```

2. Adicionar o script para rodar o cypress no seu `package.json`

    ```json
    "cypress": "cypress open"
    ```

3. Configurar o ambiente
   1. Rode `npm run cypress`
   2. Uma janela do navegador será aberta e irá apresentar duas opções
      1. ![Cypress setup window](https://user-images.githubusercontent.com/15758789/226404868-5fcc8a65-8161-48ef-a46b-22aa52b8345e.png)
   3. Selecione a opção `E2E Testing`
   4. Veja todos os itens que ele configurou e continue
      1. ![Cypress todo list](https://user-images.githubusercontent.com/15758789/226405896-faab2c7d-cb03-4a70-a529-424ca91e1648.png)
   5. Serão criados alguns arquivos no seu projeto
      1. ![Captura de Tela 2023-03-20 às 13 45 02](https://user-images.githubusercontent.com/15758789/226409854-cac5ecfd-985a-4a03-a0da-a0a06f6f84b3.png)
   6. E será perguntado qual browser você quer usar para rodar os testes, se escolher Electron ele irá utilizar uma soluçãso própria para execução dos testes.
      1. ![Cypress choose browser](https://user-images.githubusercontent.com/15758789/226408239-6f876e2d-c849-4cc4-8345-8542bc7e2d61.png)
   7. Após a escolha de browser, ele irá abrir outra janela com uma interface onde você tem acesso aos testes que irão ser e executados e/ou criar novos testes por lá, alé, de consultar a documentação, debug de testes, configurações etc.
      1. ![Cypress UI after choose browser](https://user-images.githubusercontent.com/15758789/226409387-2cb864fc-37cf-4cc6-b93f-e2a44bd2352d.png)
4. Escrever os testes
   1. Vou utilizar a opção da direita: `Create new spec` para criar um arquivo de teste
      1. ![Cypress choose a option on welcome screen](https://user-images.githubusercontent.com/15758789/226410185-836e27e5-8939-42c4-a85a-0ac16ba72df9.png)
   2. Ele vai perguntar o nome do arquivo
      1. ![Enter path o new file](https://user-images.githubusercontent.com/15758789/226410695-163a626d-6188-4702-bd89-1007494fa34b.png)
      2. Vou seguir um padrão semelhante ao da aplicação, criando uma pasta chamada `pages/` dentro da pasta `e2e` do pattern do cypress
      3. ![Fill path](https://user-images.githubusercontent.com/15758789/226411317-3ccd4cea-fe6b-41e2-9cc6-d12e6a973e25.png)
   3. Ao finalizar ele vai criar o arquivo e perguntar se quero rodar ou criar outro arquivo de spec, vou escolher rodar esse spec criado pela UI
      1. ![Choose an option](https://user-images.githubusercontent.com/15758789/226411634-e4720b5f-ed79-4ddb-9817-1549e6c955e8.png)
      2. Ao rodar ele abriu um endereço de exemplo do cypress
      3. ![Example spec](https://user-images.githubusercontent.com/15758789/226412002-6c71a5c5-c40a-463f-8378-55446744b83d.png)
   4. Vou editar o arquivo de spec e implementar meus testes dentro dele, no teste, deve ser acessada a home do projeto e visualizada as opções
      1. ![Access home page on test](https://user-images.githubusercontent.com/15758789/226413553-fb8b796d-cf2a-441b-a164-e8907842c388.png)
5. Após escrever os testes, podemos vê-los nessa interface do Cypress
   1. ![Cypress spec list](https://user-images.githubusercontent.com/15758789/226453706-bc39e266-921b-4d40-bc07-3a952c72f07f.png)
   2. Para rodar os testes, clique no arquivo, que poderá rodá-lo e ver o resultado da execução

      <https://user-images.githubusercontent.com/15758789/226454433-f29ccc35-4252-4f70-8e2c-50754db8a8c9.mov>

## Erros e problemas

1. O primeiro problema encontrado foi relacionado aos modulos isolados do TS, como o teste não importa nada até o momento, fica dando esse erro (pode ser resolvido usando a gambiarra de exportar um objeto do arquivo `export {}`, mas não recomendo, o warning do eslint não faz os testes quebrarem nem nada do tipo)
   1. ![Captura de Tela 2023-03-20 às 13 56 12](https://user-images.githubusercontent.com/15758789/226412703-5661b41e-926e-4b58-888b-8a2303685685.png)
