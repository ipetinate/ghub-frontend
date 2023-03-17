import { customRender, renderHook, screen, waitFor, user } from '../../test'

import { useSearchStore } from '@/store/useSearchStore'

import { Navbar } from '@/components/Navbar'

describe('Navbar', () => {
    const renderComponent = () => customRender(<Navbar />)

    test('Should render properly', async () => {
        renderComponent()

        const link = await screen.findByRole('link', { name: /GHub/i })
        const logo = await screen.findByRole('img', { name: /GHub logo/i })
        const searchInput = await screen.findByPlaceholderText('Pesquisar')

        expect(link).toBeInTheDocument()
        expect(logo).toBeInTheDocument()
        expect(searchInput).toBeInTheDocument()
    })

    test('Should render fill search input', async () => {
        renderComponent()

        const searchInput = await screen.findByPlaceholderText('Pesquisar')

        expect(searchInput).toBeInTheDocument()
        expect(searchInput).toHaveValue('')

        await user.type(searchInput, 'linux')

        expect(searchInput).toHaveValue('linux')
    })

    test('Should render fill search input and store', async () => {
        renderComponent()

        const {
            result: { current }
        } = renderHook(() => useSearchStore())

        const setTermSpy = await jest.spyOn(current, 'setTerm')
        const searchInput = await screen.findByPlaceholderText('Pesquisar')

        await user.type(searchInput, 'linux')

        waitFor(() => expect(setTermSpy).toHaveBeenCalled())

        expect(searchInput).toHaveValue('linux')
        waitFor(() => expect(current.term).toHaveValue('linux'))
    })

    test('Should go to home when click on logo link', async () => {
        const push = jest.fn()

        customRender(<Navbar />, { router: { push } })

        const link = await screen.findByRole('link', { name: /GHub/i })

        await user.click(link)

        expect(push).toHaveBeenCalled()
    })
})
