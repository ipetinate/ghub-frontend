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
