import { render, screen } from '@testing-library/react'

import { Navbar } from '@/components/Navbar'
import { useRouter } from 'next/router'

describe('Navbar', () => {
    const renderComponent = () => render(<Navbar />)

    test('Should render properly', async () => {
        renderComponent()

        const link = await screen.findByRole('link', { name: /GHub/i })
        const logo = await screen.findByRole('img', { name: /GHub logo/i })
        const searchInput = await screen.findByPlaceholderText('Pesquisar')

        expect(link).toBeInTheDocument()
        expect(searchInput).toBeInTheDocument()
    })
})
