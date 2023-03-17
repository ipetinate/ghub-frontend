import axios from 'axios'

import { customRender, screen, waitFor, user } from '../../test'

import { RepoCard } from '@/components/RepoCard'

import repo from '../../test/mocks/data/repositoryMock.json'
import githubUser from '../../test/mocks/data/githubUserMock.json'

jest.mock('axios')

describe('RepoCard', () => {
    const renderComponent = () =>
        customRender(
            <RepoCard
                repo={{
                    ...repo,
                    created_at: new Date(repo.created_at),
                    updated_at: new Date(repo.updated_at),
                    pushed_at: new Date(repo.pushed_at)
                }}
            />
        )

    test('Should render properly - mount card with data passed via props and request user data', async () => {
        // Mock axios response

        axios.get = jest.fn().mockResolvedValue({ data: githubUser })

        // Render component
        renderComponent()

        // Query data passed via props
        expect(await screen.findByTestId('repo-card-icon')).toBeInTheDocument()
        expect(await screen.findByText('04/09/2011')).toBeInTheDocument()

        // Query data returned from useQuery request
        waitFor(async () => {
            expect(axios.get).toHaveBeenCalled()

            expect(await screen.findByText(githubUser.name)).toBeInTheDocument()

            if (githubUser?.bio) {
                expect(
                    await screen.findByText(githubUser?.bio)
                ).toBeInTheDocument()
            }

            expect(
                await screen.findByText(githubUser.company)
            ).toBeInTheDocument()
        })
    })

    test('Should open user info', async () => {
        // Mock axios response
        axios.get = jest.fn().mockResolvedValue({ data: githubUser })

        // Render component
        renderComponent()

        expect(
            screen.queryByRole('button', { name: 'Show user info' })
        ).not.toBeInTheDocument()

        expect(screen.queryByText(githubUser.name)).not.toBeInTheDocument()
        expect(screen.queryByText(githubUser.company)).not.toBeInTheDocument()
        expect(screen.queryByText(githubUser.login)).not.toBeInTheDocument()

        if (githubUser?.email) {
            expect(
                screen.queryByText(githubUser?.email)
            ).not.toBeInTheDocument()
        }

        if (githubUser?.bio) {
            expect(screen.queryByText(githubUser?.bio)).not.toBeInTheDocument()
        }

        waitFor(async () => {
            const infoButton = await screen.findByRole('button', {
                name: 'Show user info'
            })

            expect(infoButton).toBeInTheDocument()

            await user.click(infoButton)

            expect(await screen.findByText(githubUser.name)).toBeInTheDocument()
            expect(
                await screen.findByText(githubUser.company)
            ).toBeInTheDocument()
            expect(
                await screen.findByText(githubUser.login)
            ).toBeInTheDocument()

            if (githubUser?.bio) {
                expect(
                    await screen.findByText(githubUser?.bio)
                ).toBeInTheDocument()
            }
            if (githubUser?.email) {
                expect(
                    await screen.findByText(githubUser?.email)
                ).toBeInTheDocument()
            }
        })
    })

    test('Should open a new tab when click on icon to access repository', async () => {
        const jsdomOpen = window.open

        window.open = jest.fn()

        renderComponent()

        const openPageSpy = jest.spyOn(window, 'open')

        const openRepoGHPage = await screen.findByRole('button', {
            name: /Open repository page on GitHub in a new page/i
        })

        await user.click(openRepoGHPage)

        expect(openPageSpy).toHaveBeenCalledWith(repo.html_url, '_blank')

        window.open = jsdomOpen
    })
})
