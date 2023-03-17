import { customRender, screen } from '../../test'

import { UserCard } from '@/components/UserCard'

import githubUser from '../../test/mocks/data/githubUserMock.json'

describe('UserCard', () => {
    const renderComponent = () =>
        customRender(
            <UserCard
                user={{
                    ...githubUser,
                    created_at: new Date(githubUser.created_at),
                    updated_at: new Date(githubUser.updated_at)
                }}
            />
        )

    test('Should render properly', async () => {
        renderComponent()

        const name = await screen.findByText(githubUser.name)
        const avatar = await screen.findByAltText(/User image avatar/i)
        const company = await screen.findByText(githubUser.company)

        expect(name).toBeInTheDocument()
        expect(avatar).toBeInTheDocument()
        expect(company).toBeInTheDocument()
    })
})
